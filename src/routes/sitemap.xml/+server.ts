import { getAllDocs } from '$lib/server/docs';
import { env } from '$env/dynamic/public';

type SitemapEntry = {
  path: string;
  lastmod: string | null;
};

function resolveBaseUrl(requestOrigin: string): string {
  const configured = env.PUBLIC_SITE_URL?.trim();
  const base = configured && configured.length > 0 ? configured : requestOrigin;
  return base.replace(/\/+$/, '');
}

function toIsoDate(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderUrl(baseUrl: string, entry: SitemapEntry): string {
  const loc = escapeXml(`${baseUrl}${entry.path}`);
  const lastmod = toIsoDate(entry.lastmod);

  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    '  </url>'
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}

export async function GET({ url }) {
  const baseUrl = resolveBaseUrl(url.origin);
  const docs = await getAllDocs();

  const seen = new Set<string>();
  const entries: SitemapEntry[] = [];

  for (const doc of docs) {
    if (seen.has(doc.canonicalPath)) {
      continue;
    }

    seen.add(doc.canonicalPath);
    entries.push({ path: doc.canonicalPath, lastmod: doc.lastmod });
  }

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map((entry) => renderUrl(baseUrl, entry)),
    '</urlset>'
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  });
}
