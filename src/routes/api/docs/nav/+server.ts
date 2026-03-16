import { json } from '@sveltejs/kit';
import { buildNavTree } from '$lib/server/docs';

export async function GET() {
  const nav = await buildNavTree();
  return json({ nav });
}
