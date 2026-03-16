// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildNavTree, getDocByPath } from '$lib/server/docs';

function toDocPath(slug: string | undefined): string {
  if (!slug) {
    return '/docs/';
  }

  const cleaned = slug.replace(/^\/+/, '').replace(/\/+$/, '');
  return `/docs/${cleaned}/`;
}

export const load = async ({ params, url }: Parameters<PageServerLoad>[0]) => {
  const nav = await buildNavTree();
  const requestedPath = toDocPath(params.slug);
  const doc = await getDocByPath(requestedPath);

  if (!doc) {
    throw error(404, 'Documentation page not found');
  }

  if (doc.canonicalPath !== requestedPath) {
    throw redirect(308, doc.canonicalPath);
  }

  return {
    nav,
    currentPath: doc.canonicalPath,
    title: doc.title,
    description: doc.description,
    html: doc.html,
    headings: doc.headings,
    tags: doc.tags,
    updatedAt: doc.lastmod,
    sourcePath: `public-docs/content/docs/${doc.relativePath}`,
    canonicalUrl: new URL(doc.canonicalPath, url.origin).toString()
  };
};
