<script lang="ts">
  import { tick } from 'svelte';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { marked } from 'marked';

  type Message = { role: 'user' | 'assistant'; content: string };

  const LOADING_MESSAGES = [
    'Checking the Stellarbridges…',
    'Checking example sets…',
    'Scanning the docs…',
    'Looking it up…',
    'Almost there…'
  ];

  function renderMarkdown(text: string): string {
    if (!text.trim()) return '';
    const raw = marked.parse(text, { async: false }) as string;
    if (!raw) return '';
    const withExternalLinks = raw.replace(/<a /gi, '<a target="_blank" rel="noopener noreferrer" ');
    return withExternalLinks
      .replace(/<table\b/gi, '<div class="msg-table-wrap"><table')
      .replace(/<\/table>/gi, '</table></div>');
  }

  let open = $state(false);
  let messages = $state<Message[]>([]);
  let input = $state('');
  let loading = $state(false);
  let loadingTick = $state(0);
  let error = $state<string | null>(null);
  let textareaEl = $state<HTMLTextAreaElement | null>(null);
  let chatMessagesEl = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!loading) {
      loadingTick = 0;
      return;
    }
    const interval = setInterval(() => {
      loadingTick++;
    }, 2200);
    return () => clearInterval(interval);
  });

  async function send(): Promise<void> {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    messages = [...messages, userMessage];
    input = '';
    error = null;
    loading = true;
    await tick();
    const msgs = chatMessagesEl?.querySelectorAll('.msg');
    const lastMsg = msgs?.[msgs.length - 1] as HTMLElement | undefined;
    lastMsg?.scrollIntoView({ block: 'start', behavior: 'smooth' });

    const chatMessages = [...messages].map((m) => ({
      role: m.role,
      content: m.content
    }));

    try {
      const res = await fetch('/api/docs/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        error = data?.error ?? `Request failed (${res.status})`;
        if (res.status === 503) {
          error = 'Chat is not configured. Set GRADIENT_AGENT_ENDPOINT and GRADIENT_AGENT_ACCESS_KEY on the server.';
        }
        loading = false;
        return;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: typeof data.content === 'string' ? data.content : ''
      };
      messages = [...messages, assistantMessage];
      loading = false;
      await tick();
      const msgsAfter = chatMessagesEl?.querySelectorAll('.msg');
      const lastMsgAfter = msgsAfter?.[msgsAfter.length - 1] as HTMLElement | undefined;
      lastMsgAfter?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } catch (e) {
      error = e instanceof Error ? e.message : 'Network error';
    } finally {
      loading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  let copiedId = $state<number | null>(null);

  async function copyMessage(content: string, index: number): Promise<void> {
    try {
      await navigator.clipboard.writeText(content);
      copiedId = index;
      setTimeout(() => (copiedId = null), 1800);
    } catch {
      copiedId = null;
    }
  }

  function downloadChat(): void {
    if (messages.length === 0) return;
    const lines = messages.map((m) => {
      const label = m.role === 'user' ? 'You' : 'Jake';
      return `## ${label}\n\n${m.content}\n\n`;
    });
    const text = `# Stellarbridge Docs chat\n\n${lines.join('---\n\n')}`;
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stellarbridge-docs-chat-${new Date().toISOString().slice(0, 19).replace('T', '-').replace(/:/g, '')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  onMount(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const trigger = isMac ? e.metaKey : e.ctrlKey;
      if (!trigger || e.key.toLowerCase() !== 'i') return;
      e.preventDefault();
      open = !open;
      if (open) {
        tick().then(() => textareaEl?.focus());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });
</script>

{#if browser}
  <div class="docs-chat">
    <button
      type="button"
      class="chat-toggle"
      class:chat-toggle-open={open}
      onclick={() => (open = !open)}
      aria-label={open ? 'Close chat' : 'Open chat'}
      aria-expanded={open}
    >
      {#if open}
        <svg class="chat-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        <span class="chat-toggle-label">Close</span>
      {:else}
        <svg class="chat-toggle-icon chat-toggle-icon-sparkle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        <span class="chat-toggle-label">Ask Jake</span>
      {/if}
    </button>

    {#if open}
      <div class="chat-panel">
        <div class="chat-header">
          <div class="chat-header-left">
            <span class="chat-avatar" aria-hidden="true">J</span>
            <div>
              <h2 class="chat-title">Jake</h2>
              <p class="chat-subtitle">Docs assistant</p>
            </div>
          </div>
          <div class="chat-header-actions">
            {#if messages.length > 0}
              <button
                type="button"
                class="chat-action"
                onclick={downloadChat}
                aria-label="Download chat"
                title="Download chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </button>
            {/if}
            <button
              type="button"
              class="chat-action"
              onclick={() => (open = false)}
              aria-label="Close chat"
              title="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        <div class="chat-messages" bind:this={chatMessagesEl}>
          {#if messages.length === 0 && !loading && !error}
            <div class="chat-placeholder-wrap">
              <p class="chat-placeholder">
                Ask a question about Stellarbridge docs. I use the documentation
                knowledge base to answer.
              </p>
              <p class="chat-placeholder-hint">Toggle with Ctrl+I (Cmd+I on Mac)</p>
            </div>
          {:else}
            {#each messages as msg, i}
              <div class="msg" data-role={msg.role}>
                <div class="msg-head">
                  <span class="msg-role">{msg.role === 'user' ? 'You' : 'Jake'}</span>
                </div>
                {#if msg.role === 'assistant'}
                  <div class="msg-bubble">
                    <div class="msg-content msg-prose">
                      {@html renderMarkdown(msg.content)}
                    </div>
                    {#if msg.content}
                      <button
                        type="button"
                        class="msg-copy"
                        onclick={() => copyMessage(msg.content, i)}
                        aria-label="Copy message"
                        title="Copy message"
                      >
                        {#if copiedId === i}
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {:else}
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        {/if}
                      </button>
                    {/if}
                  </div>
                {:else}
                  <div class="msg-content">
                    {msg.content}
                  </div>
                {/if}
              </div>
            {/each}
            {#if loading}
              <div class="msg" data-role="assistant">
                <div class="msg-head">
                  <span class="msg-role">Jake</span>
                </div>
                <div class="msg-loading-wrap">
                  <div class="msg-content msg-loading">
                    <span class="msg-loading-dots">
                      <span></span><span></span><span></span>
                    </span>
                  </div>
                  <p class="msg-loading-status">{LOADING_MESSAGES[loadingTick % LOADING_MESSAGES.length]}</p>
                </div>
              </div>
            {/if}
          {/if}
          {#if error}
            <p class="chat-error">{error}</p>
          {/if}
        </div>

        <form
          class="chat-form"
          onsubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <textarea
            bind:this={textareaEl}
            bind:value={input}
            onkeydown={handleKeydown}
            placeholder="Ask a question…"
            rows="2"
            disabled={loading}
            aria-label="Message"
          ></textarea>
          <button type="submit" class="chat-send" disabled={loading || !input.trim()} title="Send" aria-label="Send">
            <svg class="chat-send-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    {/if}
  </div>
{/if}

<style>
  .docs-chat {
    position: fixed;
    left: 50%;
    bottom: 1.25rem;
    transform: translateX(-50%);
    z-index: 100;
    font-family: inherit;
  }

  .chat-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1.25rem;
    min-height: 2.75rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.45);
    color: var(--accent);
    cursor: pointer;
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    box-shadow:
      0 8px 32px rgba(12, 35, 28, 0.2),
      0 2px 10px rgba(12, 35, 28, 0.14),
      0 0 0 1px rgba(201, 227, 218, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    transition: transform var(--duration) var(--ease-out), box-shadow var(--duration) var(--ease-out),
      background var(--duration-fast), color var(--duration-fast), border-color var(--duration-fast),
      backdrop-filter var(--duration-fast);
  }

  .chat-toggle:hover {
    background: rgba(255, 255, 255, 0.6);
    color: var(--accent);
    border-color: rgba(255, 255, 255, 0.65);
    box-shadow:
      0 14px 44px rgba(12, 35, 28, 0.24),
      0 4px 14px rgba(12, 35, 28, 0.16),
      0 0 0 1px rgba(201, 227, 218, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transform: scale(1.02);
  }

  .chat-toggle:active {
    transform: scale(0.98);
    box-shadow:
      0 4px 20px rgba(12, 35, 28, 0.16),
      0 0 0 1px rgba(201, 227, 218, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  .chat-toggle:focus-visible {
    outline: none;
    box-shadow:
      0 8px 32px rgba(12, 35, 28, 0.2),
      0 2px 10px rgba(12, 35, 28, 0.14),
      0 0 0 2px var(--surface-strong),
      0 0 0 4px var(--accent),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  .chat-toggle-open {
    background: rgba(10, 107, 84, 0.92);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow:
      0 12px 40px rgba(12, 35, 28, 0.35),
      0 4px 16px rgba(10, 107, 84, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .chat-toggle-open:hover {
    background: rgba(10, 107, 84, 0.96);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow:
      0 16px 48px rgba(12, 35, 28, 0.4),
      0 6px 20px rgba(10, 107, 84, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  .chat-toggle-icon {
    display: block;
    flex-shrink: 0;
    transition: transform var(--duration) var(--ease-out);
  }

  .chat-toggle-label {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .chat-toggle:hover .chat-toggle-icon-sparkle {
    transform: rotate(72deg);
  }

  .chat-panel {
    position: absolute;
    bottom: calc(100% + 0.75rem);
    left: 50%;
    transform: translateX(-50%);
    width: min(520px, calc(100vw - 2rem));
    height: min(80vh, 640px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius);
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: var(--shadow), 0 0 0 1px rgba(201, 227, 218, 0.4);
    animation: chat-panel-in 0.25s var(--ease-out) both;
  }

  @keyframes chat-panel-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.9rem;
    border-bottom: 1px solid var(--line);
    flex-shrink: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent 85%);
  }

  .chat-header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .chat-avatar {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: var(--radius-sm);
    background: linear-gradient(135deg, var(--accent), var(--accent-hover));
    color: #fff;
    font-family: 'Fraunces', serif;
    font-size: 0.875rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(10, 107, 84, 0.25);
  }

  .chat-title {
    margin: 0;
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.25;
  }

  .chat-subtitle {
    margin: 0.125rem 0 0;
    font-size: 0.75rem;
    color: var(--muted);
    line-height: 1.2;
  }

  .chat-header-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .chat-action {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .chat-action:hover {
    color: var(--ink);
    background: var(--accent-subtle);
  }

  .chat-action:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--accent);
  }

  .chat-action svg {
    display: block;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.125rem;
    min-height: 0;
  }

  .chat-placeholder-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 1.25rem 0 1.5rem;
    gap: 1rem;
  }

  .chat-placeholder {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--muted);
    text-align: center;
  }

  .chat-placeholder-hint {
    margin: 0.75rem 0 0;
    font-size: 0.75rem;
    line-height: 1.3;
    color: var(--muted-soft);
    text-align: center;
  }

  .msg {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
    max-width: 100%;
  }

  .msg[data-role='user'] {
    align-items: flex-end;
  }

  .msg[data-role='user'] .msg-content {
    background: var(--accent);
    border: none;
    color: #fff;
    box-shadow: 0 2px 8px rgba(10, 107, 84, 0.2);
  }

  .msg-head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  }

  .msg[data-role='user'] .msg-head {
    flex-direction: row-reverse;
  }

  .msg-role {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
  }

  .msg-bubble {
    position: relative;
    width: 100%;
    max-width: 100%;
  }

  .msg-bubble .msg-content {
    padding-bottom: 1.75rem;
  }

  .msg-bubble .msg-copy {
    position: absolute;
    bottom: 0.35rem;
    left: 0.5rem;
    padding: 0.25rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.15s ease, color 0.15s ease, background 0.15s ease;
  }

  .msg-bubble .msg-copy:hover {
    opacity: 1;
    color: var(--accent);
    background: rgba(201, 240, 223, 0.8);
  }

  .msg-bubble .msg-copy svg {
    display: block;
  }

  .msg-content {
    padding: 0.75rem 1rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--line);
    background: var(--surface-strong);
    font-size: 0.9rem;
    line-height: 1.55;
    word-break: break-word;
    max-width: 100%;
    color: var(--ink);
    transition: box-shadow var(--duration-fast);
  }

  .msg-content:not(.msg-prose) {
    white-space: pre-wrap;
  }

  .msg-content.msg-prose :global(p) {
    margin: 0 0 0.5em;
  }
  .msg-content.msg-prose :global(p:last-child) {
    margin-bottom: 0;
  }
  .msg-content.msg-prose :global(strong) {
    font-weight: 700;
  }
  .msg-content.msg-prose :global(ul),
  .msg-content.msg-prose :global(ol) {
    margin: 0.4em 0;
    padding-left: 1.25em;
  }
  .msg-content.msg-prose :global(li) {
    margin: 0.2em 0;
  }
  .msg-content.msg-prose :global(h1),
  .msg-content.msg-prose :global(h2),
  .msg-content.msg-prose :global(h3),
  .msg-content.msg-prose :global(h4) {
    font-size: inherit;
    font-weight: 700;
    margin: 0.6em 0 0.3em;
  }
  .msg-content.msg-prose :global(h1:first-child),
  .msg-content.msg-prose :global(h2:first-child),
  .msg-content.msg-prose :global(h3:first-child),
  .msg-content.msg-prose :global(h4:first-child) {
    margin-top: 0;
  }
  .msg-content.msg-prose :global(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
  }
  .msg-content.msg-prose :global(a:hover) {
    color: var(--accent-hover);
  }
  .msg-content.msg-prose :global(code) {
    background: var(--accent-soft);
    padding: 0.15em 0.4em;
    border-radius: 6px;
    font-size: 0.875em;
  }
  .msg-content.msg-prose :global(pre) {
    margin: 0.6em 0;
    padding: 0.75rem;
    overflow-x: auto;
    border-radius: 10px;
    background: rgba(88, 112, 98, 0.15);
    border: 1px solid var(--line);
  }
  .msg-content.msg-prose :global(pre code) {
    background: none;
    padding: 0;
  }
  .msg-content.msg-prose :global(.msg-table-wrap) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0.6em 0;
    border-radius: var(--radius-sm);
    border: 1px solid var(--line);
  }
  .msg-content.msg-prose :global(.msg-table-wrap table) {
    width: max-content;
    min-width: 100%;
    border-collapse: collapse;
  }
  .msg-content.msg-prose :global(.msg-table-wrap th),
  .msg-content.msg-prose :global(.msg-table-wrap td) {
    white-space: nowrap;
    padding: 0.4em 0.75em;
    border: 1px solid var(--line);
    text-align: left;
  }
  .msg-content.msg-prose :global(.msg-table-wrap th) {
    background: rgba(88, 112, 98, 0.12);
    font-weight: 600;
  }

  .msg-loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .msg-loading {
    display: flex;
    align-items: center;
    min-height: 2rem;
    color: var(--muted);
  }

  .msg-loading-status {
    margin: 0;
    padding-left: 0.125rem;
    font-size: 0.8125rem;
    font-style: italic;
    color: var(--muted-soft);
    line-height: 1.3;
  }

  .msg-loading-dots {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .msg-loading-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--muted);
    animation: chat-loading-bounce 1.4s var(--ease-in-out) infinite both;
  }

  .msg-loading-dots span:nth-child(1) { animation-delay: 0s; }
  .msg-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .msg-loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes chat-loading-bounce {
    0%, 80%, 100% { transform: scale(0.85); opacity: 0.5; }
    40% { transform: scale(1.1); opacity: 1; }
  }

  .chat-error {
    margin: 0;
    padding: 0.625rem 0.75rem;
    font-size: 0.8125rem;
    color: var(--danger);
    background: rgba(191, 63, 70, 0.08);
    border-radius: 10px;
    border: 1px solid rgba(191, 63, 70, 0.2);
  }

  .chat-form {
    padding: 0.875rem 1rem;
    border-top: 1px solid var(--line);
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
    flex-shrink: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.5), transparent);
  }

  .chat-form textarea {
    flex: 1;
    min-height: 2.75rem;
    max-height: 7rem;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--surface-strong);
    color: var(--ink);
    resize: none;
    font-size: 0.9rem;
    line-height: 1.4;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .chat-form textarea::placeholder {
    color: var(--muted);
  }

  .chat-form textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(10, 107, 84, 0.12);
  }

  .chat-form textarea:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .chat-send {
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border-radius: var(--radius-sm);
    border: none;
    background: var(--accent);
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(10, 107, 84, 0.25);
    transition: filter var(--duration-fast), transform var(--duration-fast), box-shadow var(--duration-fast);
  }

  .chat-send:hover:not(:disabled) {
    filter: brightness(1.06);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(10, 107, 84, 0.3);
  }

  .chat-send:active:not(:disabled) {
    transform: translateY(0);
  }

  .chat-send:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--surface-strong), 0 0 0 4px var(--accent);
  }

  .chat-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .chat-send-icon {
    display: block;
  }
</style>
