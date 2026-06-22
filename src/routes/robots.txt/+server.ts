import { env } from '$env/dynamic/public';

function resolveBaseUrl(requestOrigin: string): string {
  const configured = env.PUBLIC_SITE_URL?.trim();
  const base = configured && configured.length > 0 ? configured : requestOrigin;
  return base.replace(/\/+$/, '');
}

export async function GET({ url }) {
  const baseUrl = resolveBaseUrl(url.origin);

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${baseUrl}/sitemap.xml`, ''].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  });
}
