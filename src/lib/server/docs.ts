import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import go from 'highlight.js/lib/languages/go';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import { marked } from 'marked';
import type { DocHeading, NavNode } from '$lib/types';

type Frontmatter = {
  title?: string;
  description?: string;
  summary?: string;
  weight?: number;
  tags?: string[];
  aliases?: string[];
  draft?: boolean;
  date?: string;
  lastmod?: string;
};

export type DocRecord = {
  title: string;
  description: string;
  summary: string;
  canonicalPath: string;
  relativePath: string;
  sections: string[];
  slug: string;
  weight: number;
  tags: string[];
  aliases: string[];
  lastmod: string | null;
  markdown: string;
  html: string;
  plainText: string;
  headings: DocHeading[];
};

const DOCS_CONTENT_DIR =
  process.env.DOCS_CONTENT_DIR ??
  path.resolve(process.cwd(), 'content/docs');

let cachedDocs: DocRecord[] | null = null;

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('go', go);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('py', python);
hljs.registerLanguage('python', python);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);

function slugifySegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toArrayOfStrings(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}

function normalizeAlias(alias: string): string {
  if (!alias) {
    return '/docs/';
  }

  const cleaned = alias.trim();
  if (cleaned.startsWith('/docs/')) {
    return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  }

  if (cleaned.startsWith('/')) {
    return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  }

  return `/docs/${cleaned.replace(/^docs\//, '').replace(/^\/+/, '')}/`;
}

function buildCanonicalPath(relativePath: string): { sections: string[]; slug: string; canonicalPath: string } {
  const parsed = path.parse(relativePath);
  const dirSegments = parsed.dir
    .split(path.sep)
    .filter((segment: string) => segment.length > 0)
    .map((segment: string) => slugifySegment(segment));

  const base = parsed.name;
  const isSectionIndex = base === '_index';
  const isLeafIndex = base === 'index';

  if (isSectionIndex) {
    return {
      sections: dirSegments,
      slug: dirSegments[dirSegments.length - 1] ?? 'docs',
      canonicalPath: `/docs/${dirSegments.join('/')}${dirSegments.length > 0 ? '/' : ''}`
    };
  }

  if (isLeafIndex) {
    return {
      sections: dirSegments.slice(0, -1),
      slug: dirSegments[dirSegments.length - 1] ?? 'index',
      canonicalPath: `/docs/${dirSegments.join('/')}/`
    };
  }

  const slug = slugifySegment(base);
  const allSegments = [...dirSegments, slug];

  return {
    sections: dirSegments,
    slug,
    canonicalPath: `/docs/${allSegments.join('/')}/`
  };
}

function extractHeadings(markdown: string): DocHeading[] {
  const slugger = new GithubSlugger();
  const headings: DocHeading[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }

    const level = match[1].length;
    const text = match[2].replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/`/g, '').trim();
    const id = slugger.slug(text);
    headings.push({ id, text, level });
  }

  return headings;
}

function injectHeadingIds(html: string, headings: DocHeading[]): string {
  if (headings.length === 0) {
    return html;
  }

  let headingIndex = 0;
  return html.replace(/<h([1-3])>(.*?)<\/h\1>/g, (_whole, level, inner) => {
    const current = headings[headingIndex];
    headingIndex += 1;

    if (!current) {
      return `<h${level}>${inner}</h${level}>`;
    }

    return `<h${level} id="${current.id}">${inner}</h${level}>`;
  });
}

async function walkMarkdownFiles(rootDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const absolute = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolute);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(absolute);
      }
    }
  }

  await walk(rootDir);
  return results;
}

function buildSearchText(title: string, description: string, markdown: string): string {
  return [title, description, markdown]
    .join('\n')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightCode(code: string, languageRaw: string): { html: string; language: string } {
  const language = (languageRaw || '').trim().toLowerCase();
  const isAutoLanguage = language === '' || ['txt', 'text', 'plaintext', 'plain'].includes(language);

  if (isAutoLanguage) {
    const auto = hljs.highlightAuto(code, [
      'python',
      'yaml',
      'typescript',
      'javascript',
      'json',
      'bash',
      'go'
    ]);

    if (auto.language && auto.relevance > 1) {
      return {
        html: auto.value,
        language: auto.language
      };
    }

    return {
      html: escapeHtml(code),
      language: 'text'
    };
  }

  if (hljs.getLanguage(language)) {
    return {
      html: hljs.highlight(code, { language, ignoreIllegals: true }).value,
      language
    };
  }

  return {
    html: escapeHtml(code),
    language: 'text'
  };
}

function renderMarkdown(markdown: string): string {
  let codeIndex = 0;
  const renderer = new marked.Renderer();

  renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
    const id = `doc-code-${codeIndex++}`;
    const highlighted = highlightCode(text, lang ?? '');
    const label = highlighted.language === 'text' ? 'TEXT' : highlighted.language.toUpperCase();

    return [
      `<div class="code-block">`,
      `<div class="code-toolbar">`,
      `<span class="code-lang">${label}</span>`,
      `<button type="button" class="code-copy-btn" data-copy-code="${id}">Copy</button>`,
      `</div>`,
      `<pre><code id="${id}" class="hljs language-${highlighted.language}">${highlighted.html}</code></pre>`,
      `</div>`
    ].join('');
  };

  return marked.parse(markdown, {
    renderer,
    gfm: true
  }) as string;
}

async function buildDocsIndex(): Promise<DocRecord[]> {
  const markdownFiles = await walkMarkdownFiles(DOCS_CONTENT_DIR);
  const docs: DocRecord[] = [];

  for (const absolutePath of markdownFiles) {
    const relativePath = path.relative(DOCS_CONTENT_DIR, absolutePath);
    const raw = await fs.readFile(absolutePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data as Frontmatter;

    if (data.draft === true) {
      continue;
    }

    const pathInfo = buildCanonicalPath(relativePath);
    const title = data.title?.trim() || pathInfo.slug || 'Untitled';
    const description = data.description?.trim() || '';
    const summary = data.summary?.trim() || description;
    const headings = extractHeadings(parsed.content);
    const html = injectHeadingIds(renderMarkdown(parsed.content), headings);
    const plainText = buildSearchText(title, description, parsed.content);

    docs.push({
      title,
      description,
      summary,
      canonicalPath: pathInfo.canonicalPath,
      relativePath,
      sections: pathInfo.sections,
      slug: pathInfo.slug,
      weight: Number.isFinite(data.weight) ? Number(data.weight) : 999,
      tags: toArrayOfStrings(data.tags),
      aliases: toArrayOfStrings(data.aliases).map(normalizeAlias),
      lastmod: data.lastmod || data.date || null,
      markdown: parsed.content,
      html,
      plainText,
      headings
    });
  }

  return docs.sort((a, b) => {
    if (a.weight !== b.weight) {
      return a.weight - b.weight;
    }

    return a.title.localeCompare(b.title);
  });
}

export async function getAllDocs(): Promise<DocRecord[]> {
  if (!cachedDocs) {
    cachedDocs = await buildDocsIndex();
  }

  return cachedDocs;
}

export function invalidateDocsCache(): void {
  cachedDocs = null;
}

export async function getDocByPath(pathname: string): Promise<DocRecord | null> {
  const docs = await getAllDocs();
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;

  return docs.find((doc) => doc.canonicalPath === normalized || doc.aliases.includes(normalized)) ?? null;
}

export async function buildNavTree(): Promise<NavNode[]> {
  const docs = await getAllDocs();

  type MutableNode = {
    key: string;
    title: string;
    href: string;
    children: Map<string, MutableNode>;
    doc?: DocRecord;
  };

  const root: MutableNode = {
    key: 'root',
    title: 'Docs',
    href: '/docs/',
    children: new Map()
  };

  for (const doc of docs) {
    const segments = doc.canonicalPath
      .replace(/^\/docs\//, '')
      .replace(/\/$/, '')
      .split('/')
      .filter(Boolean);

    let cursor = root;
    const branch: string[] = [];

    for (const segment of segments) {
      branch.push(segment);

      if (!cursor.children.has(segment)) {
        cursor.children.set(segment, {
          key: segment,
          title: segment.replace(/-/g, ' '),
          href: `/docs/${branch.join('/')}/`,
          children: new Map()
        });
      }

      cursor = cursor.children.get(segment) as MutableNode;
    }

    cursor.doc = doc;
    cursor.title = doc.title;
    cursor.href = doc.canonicalPath;
  }

  const toNodes = (node: MutableNode): NavNode[] => {
    const nodes = [...node.children.values()].map((child) => ({
      title: child.title,
      href: child.href,
      children: toNodes(child)
    }));

    return nodes.sort((a, b) => a.title.localeCompare(b.title));
  };

  return toNodes(root);
}
