import { json } from '@sveltejs/kit';
import { getAllDocs } from '$lib/server/docs';

export async function GET() {
  const docs = await getAllDocs();
  return json({
    docs: docs.map((doc) => ({
      id: doc.relativePath,
      title: doc.title,
      href: doc.canonicalPath,
      summary: doc.summary,
      content: doc.plainText,
      tags: doc.tags
    }))
  });
}
