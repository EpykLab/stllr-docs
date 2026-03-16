import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildNavTree, getDocByPath } from '$lib/server/docs';

export const load: PageServerLoad = async ({ url }) => {
  const nav = await buildNavTree();
  const doc = await getDocByPath('/docs/');

  if (!doc) {
    throw error(404, 'Documentation home not found');
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
