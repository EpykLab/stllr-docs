import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const ENDPOINT = env.GRADIENT_AGENT_ENDPOINT;
const ACCESS_KEY = env.GRADIENT_AGENT_ACCESS_KEY;

export async function POST({ request }) {
  if (!ENDPOINT?.trim() || !ACCESS_KEY?.trim()) {
    return json({ error: 'Chat not configured' }, { status: 503 });
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'messages array required' }, { status: 400 });
  }

  const url = `${ENDPOINT.replace(/\/$/, '')}/api/v1/chat/completions`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_KEY}`
    },
    body: JSON.stringify({
      messages,
      stream: false,
      include_retrieval_info: true
    })
  });

  if (!response.ok) {
    const text = await response.text();
    return json(
      { error: 'Agent request failed', details: text },
      { status: response.status >= 500 ? 502 : response.status }
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { role?: string; content?: string } }>;
  };
  const content =
    data?.choices?.[0]?.message?.content ?? '';

  return json({ content });
}
