<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import MiniSearch from 'minisearch';
  import NavTree from '$lib/components/NavTree.svelte';
  import type { DocHeading, NavNode, SearchDoc } from '$lib/types';

  let {
    title,
    description,
    nav,
    currentPath,
    headings,
    updatedAt,
    sourcePath,
    children
  }: {
    title: string;
    description: string;
    nav: NavNode[];
    currentPath: string;
    headings: DocHeading[];
    updatedAt: string | null;
    sourcePath: string;
    children: import('svelte').Snippet;
  } = $props();

  let mobileNavOpen = $state(false);
  let query = $state('');
  let searchResults = $state<SearchDoc[]>([]);
  let searchHasFocus = $state(false);
  let miniSearch: MiniSearch<SearchDoc> | null = null;
  let searchInput: HTMLInputElement | null = null;
  let tocOpen = $state(true);

  const toc = $derived(headings.filter((item) => item.level <= 3));
  const searchActive = $derived(searchHasFocus || searchResults.length > 0);

  const SNIPPET_MAX_LENGTH = 140;
  const SNIPPET_CONTEXT_CHARS = 55;

  function getSnippet(content: string, searchQuery: string): string {
    if (!content || !searchQuery.trim()) return '';
    const normalized = content.replace(/\s+/g, ' ').trim();
    const q = searchQuery.trim();
    const lower = normalized.toLowerCase();
    const qLower = q.toLowerCase();
    const idx = lower.indexOf(qLower);
    if (idx >= 0) {
      const start = Math.max(0, idx - SNIPPET_CONTEXT_CHARS);
      const end = Math.min(normalized.length, idx + q.length + SNIPPET_CONTEXT_CHARS);
      let snippet = normalized.slice(start, end).trim();
      if (start > 0) snippet = '\u2026 ' + snippet;
      if (end < normalized.length) snippet = snippet + ' \u2026';
      if (snippet.length > SNIPPET_MAX_LENGTH) {
        const qPosInSnippet = snippet.toLowerCase().indexOf(qLower);
        const from =
          qPosInSnippet >= 0
            ? Math.max(0, qPosInSnippet - 35)
            : 0;
        snippet = (from > 0 ? '\u2026 ' : '') + snippet.slice(from, from + SNIPPET_MAX_LENGTH) + ' \u2026';
      }
      return snippet;
    }
    const firstWord = q.split(/\s+/)[0];
    if (firstWord && firstWord.length >= 2) {
      const wordIdx = lower.indexOf(firstWord.toLowerCase());
      if (wordIdx >= 0) {
        const start = Math.max(0, wordIdx - SNIPPET_CONTEXT_CHARS);
        const end = Math.min(normalized.length, wordIdx + firstWord.length + SNIPPET_CONTEXT_CHARS);
        let snippet = normalized.slice(start, end).trim();
        if (start > 0) snippet = '\u2026 ' + snippet;
        if (end < normalized.length) snippet = snippet + ' \u2026';
        return snippet.length > SNIPPET_MAX_LENGTH ? snippet.slice(0, SNIPPET_MAX_LENGTH) + ' \u2026' : snippet;
      }
    }
    return normalized.length <= SNIPPET_MAX_LENGTH
      ? normalized
      : normalized.slice(0, SNIPPET_MAX_LENGTH).trim() + ' \u2026';
  }

  async function initSearch(): Promise<void> {
    const response = await fetch('/api/docs/search-index');
    const payload = (await response.json()) as { docs: SearchDoc[] };

    miniSearch = new MiniSearch<SearchDoc>({
      fields: ['title', 'summary', 'content', 'tags'],
      storeFields: ['id', 'title', 'href', 'summary', 'content', 'tags'],
      searchOptions: {
        boost: { title: 4, summary: 2 },
        fuzzy: 0.2,
        prefix: true
      }
    });

    miniSearch.addAll(payload.docs);
  }

  onMount(() => {
    void initSearch();

    const mediaQuery = window.matchMedia('(max-width: 900px)');
    const syncTocState = (isMobile: boolean): void => {
      tocOpen = !isMobile;
    };

    syncTocState(mediaQuery.matches);

    const onViewportChange = (event: MediaQueryListEvent): void => {
      syncTocState(event.matches);
    };

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && searchActive) {
        event.preventDefault();
        clearSearchUi();
        return;
      }

      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const trigger = isMac ? event.metaKey : event.ctrlKey;
      if (!trigger || event.key.toLowerCase() !== 'k') {
        return;
      }

      event.preventDefault();
      if (searchActive) {
        clearSearchUi();
      } else {
        searchInput?.focus();
        searchInput?.select();
      }
    };

    const onClick = async (event: MouseEvent): Promise<void> => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const button = target.closest('[data-copy-code]');
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }

      const codeId = button.dataset.copyCode;
      if (!codeId) {
        return;
      }

      const codeEl = document.getElementById(codeId);
      if (!codeEl) {
        return;
      }

      try {
        await navigator.clipboard.writeText(codeEl.textContent ?? '');
        const original = button.textContent ?? 'Copy';
        button.textContent = 'Copied';
        window.setTimeout(() => {
          button.textContent = original;
        }, 1400);
      } catch {
        button.textContent = 'Failed';
        window.setTimeout(() => {
          button.textContent = 'Copy';
        }, 1400);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    mediaQuery.addEventListener('change', onViewportChange);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
      mediaQuery.removeEventListener('change', onViewportChange);
    };
  });

  $effect(() => {
    const trimmed = query.trim();
    if (!miniSearch || trimmed.length < 2) {
      searchResults = [];
      return;
    }

    const normalizedResults = miniSearch
      .search(trimmed)
      .slice(0, 8)
      .map((result) => ({
        id: String(result.id),
        title: String(result.title ?? ''),
        href: String(result.href ?? ''),
        summary: String(result.summary ?? ''),
        content: String(result.content ?? ''),
        tags: Array.isArray(result.tags) ? result.tags.map((tag) => String(tag)) : []
      }));

    searchResults = normalizedResults as unknown as SearchDoc[];
  });

  function closeNav(): void {
    mobileNavOpen = false;
  }

  function clearSearchUi(): void {
    query = '';
    searchResults = [];
    searchHasFocus = false;
    searchInput?.blur();
  }

  function handleSearchSelection(): void {
    closeNav();
    clearSearchUi();
  }

  $effect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = previous;
    };
  });

  afterNavigate(() => {
    clearSearchUi();
  });
</script>

<svelte:head>
  <title>{title} | Stellarbridge Docs</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

<div class="docs-app">
  <div class="blur-fade" aria-hidden="true"></div>
  {#if searchActive}
    <button
      type="button"
      class="search-backdrop"
      onclick={clearSearchUi}
      aria-label="Close search"
    ></button>
  {/if}
  <header class="topbar panel">
    <div class="topbar-left">
      <button class="menu-btn" onclick={() => (mobileNavOpen = !mobileNavOpen)} aria-label="Toggle navigation">
        Menu
      </button>
      <a class="brand" href="/docs/">Stellarbridge Docs</a>
    </div>

    <div class="search-wrap">
      <input
        bind:this={searchInput}
        bind:value={query}
        onfocus={() => (searchHasFocus = true)}
        onblur={() => (searchHasFocus = false)}
        placeholder="Search docs (Ctrl/Cmd+K)"
        aria-label="Search docs"
      />
      {#if searchResults.length > 0}
        <ul class="search-results panel">
          {#each searchResults as result}
            <li>
              <a href={result.href} onclick={handleSearchSelection}>
                <strong>{result.title}</strong>
                <span class="search-snippet">{getSnippet(result.content, query.trim()) || result.summary}</span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="topbar-right" aria-hidden="true"></div>
  </header>

  <div class="layout-grid">
    <aside class:open={mobileNavOpen} class="left-nav panel">
      <div class="nav-head">
        <h3>Navigation</h3>
        <button class="close-btn" onclick={closeNav}>Close</button>
      </div>
      <NavTree nodes={nav} {currentPath} onNavigate={closeNav} />
    </aside>

    <main class="content panel">
      <p class="eyebrow">Documentation</p>
      <h1>{title}</h1>
      {#if description}
        <p class="muted intro">{description}</p>
      {/if}

      <article class="prose">
        {@render children()}
      </article>

      <footer class="doc-footer">
        {#if updatedAt}
          <p class="muted">Updated {updatedAt}</p>
        {/if}
        <a href="https://github.com/EpykLab/stllr-docs/blob/main/{sourcePath}" rel="noreferrer" target="_blank">
          Edit this page
        </a>
      </footer>
    </main>

    <aside class="toc panel">
      <div class="toc-head">
        <h3>On this page</h3>
        <button
          class="toc-toggle"
          type="button"
          onclick={() => (tocOpen = !tocOpen)}
          aria-expanded={tocOpen}
          aria-label="Toggle table of contents"
        >
          {tocOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      {#if tocOpen}
        {#if toc.length === 0}
          <p class="muted">No headings found.</p>
        {:else}
          <ul>
            {#each toc as heading}
              <li class="level-{heading.level}">
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            {/each}
          </ul>
        {/if}
      {/if}
    </aside>
  </div>

  {#if mobileNavOpen}
    <button class="backdrop" onclick={closeNav} aria-label="Close mobile navigation"></button>
  {/if}
</div>

<style>
  .docs-app {
    padding: 1rem;
    min-height: 100dvh;
  }

  .blur-fade {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: calc(0.8rem + 3.5rem);
    z-index: 40;
    pointer-events: none;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
  }

  .search-backdrop {
    position: fixed;
    inset: 0;
    z-index: 45;
    border: 0;
    padding: 0;
    margin: 0;
    background: rgba(15, 30, 24, 0.35);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    cursor: default;
    animation: search-backdrop-in 0.2s var(--ease-out);
  }

  @keyframes search-backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .topbar {
    position: sticky;
    top: 0.8rem;
    z-index: 50;
    margin: 0 0 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr minmax(200px, 520px) 1fr;
    align-items: center;
    gap: 1rem;
    padding: 0.7rem 1rem;
    transition: box-shadow var(--duration) var(--ease-out);
  }

  .topbar:focus-within {
    box-shadow: var(--shadow);
  }

  .topbar-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
  }

  .topbar-right {
    min-width: 0;
  }

  .brand {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
    color: var(--ink);
    transition: color var(--duration-fast);
  }

  .brand:hover {
    color: var(--accent);
  }

  .menu-btn,
  .close-btn {
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: var(--accent-subtle);
    padding: 0.45rem 0.7rem;
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--accent);
    cursor: pointer;
    transition: background var(--duration-fast), border-color var(--duration-fast), color var(--duration-fast);
  }

  .menu-btn:hover,
  .close-btn:hover {
    background: var(--accent-soft);
    border-color: var(--line-strong);
  }

  .menu-btn:focus-visible,
  .close-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--surface-strong), 0 0 0 4px var(--accent);
  }

  .search-wrap {
    position: relative;
    width: min(580px, 100%);
  }

  .search-wrap input {
    width: 100%;
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: var(--surface-strong);
    padding: 0.6rem 0.85rem;
    font-size: 0.9rem;
    color: var(--ink);
    transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
  }

  .search-wrap input::placeholder {
    color: var(--muted-soft);
  }

  .search-wrap input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(10, 107, 84, 0.12);
  }

  .search-results {
    position: absolute;
    top: calc(100% + 0.4rem);
    left: 0;
    right: 0;
    z-index: 65;
    margin: 0;
    padding: 0.35rem;
    list-style: none;
    max-height: 380px;
    overflow-y: auto;
    animation: search-drop 0.2s var(--ease-out);
  }

  @keyframes search-drop {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .search-results a {
    display: grid;
    gap: 0.15rem;
    padding: 0.6rem 0.7rem;
    border-radius: var(--radius-sm);
    color: var(--ink-soft);
    transition: background var(--duration-fast);
  }

  .search-results a:hover,
  .search-results a:focus-visible {
    background: var(--accent-subtle);
    outline: none;
  }

  .search-results span,
  .search-results .search-snippet {
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.35;
  }

  .search-results .search-snippet {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .layout-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr) 250px;
    gap: 1rem;
    align-items: start;
  }

  .layout-grid > * {
    min-width: 0;
  }

  .left-nav,
  .toc,
  .content {
    padding: 1rem 1.1rem;
  }

  .left-nav,
  .toc {
    position: sticky;
    top: 5.6rem;
    max-height: calc(100dvh - 6.5rem);
    overflow: auto;
    scrollbar-width: thin;
  }

  .nav-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .nav-head h3 {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
  }

  .close-btn {
    display: none;
  }

  .eyebrow {
    margin: 0 0 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.72rem;
    color: var(--muted);
    font-weight: 700;
  }

  .content h1 {
    margin-bottom: 0.5rem;
    animation: content-reveal 0.4s var(--ease-out) both;
  }

  .intro {
    margin-top: 0;
    margin-bottom: 1.25rem;
    animation: content-reveal 0.4s var(--ease-out) 0.05s both;
  }

  .content .prose {
    animation: content-reveal 0.4s var(--ease-out) 0.1s both;
  }

  @keyframes content-reveal {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .doc-footer {
    margin-top: 2.25rem;
    padding-top: 1.1rem;
    border-top: 1px solid var(--line);
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    animation: content-reveal 0.4s var(--ease-out) 0.15s both;
  }

  .doc-footer a {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .doc-footer a:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .toc h3 {
    margin-bottom: 0;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
  }

  .toc-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.65rem;
  }

  .toc-toggle {
    display: none;
    border: 1px solid var(--line);
    border-radius: var(--radius-sm);
    background: var(--accent-subtle);
    padding: 0.25rem 0.55rem;
    color: var(--accent);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: background var(--duration-fast);
  }

  .toc-toggle:hover {
    background: var(--accent-soft);
  }

  .toc ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.3rem;
  }

  .toc li a {
    display: block;
    padding: 0.35rem 0;
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.35;
    transition: color var(--duration-fast);
    border-radius: 6px;
    padding-left: 0.5rem;
    margin-left: -0.5rem;
  }

  .toc li a:hover {
    color: var(--accent);
  }

  .toc li.level-3 {
    margin-left: 0.75rem;
    border-left: 1px solid var(--line);
    padding-left: 0.6rem;
    margin-left: 0.5rem;
  }

  .backdrop {
    border: 0;
    position: fixed;
    inset: 0;
    background: rgba(15, 30, 24, 0.35);
    z-index: 45;
    animation: backdrop-in 0.2s var(--ease-out);
  }

  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1150px) {
    .layout-grid {
      grid-template-columns: 1fr 260px;
    }

    .left-nav {
      position: fixed;
      top: 1rem;
      left: 1rem;
      bottom: 1rem;
      width: min(88vw, 340px);
      max-height: unset;
      transform: translateX(-100%);
      transition: transform var(--duration) var(--ease-out);
      z-index: 60;
    }

    .left-nav.open {
      transform: translateX(0);
    }

    .close-btn {
      display: inline-flex;
    }
  }

  @media (max-width: 900px) {
    .blur-fade {
      height: calc(0.5rem + 6rem);
    }

    .docs-app {
      padding: 0.7rem;
    }

    .left-nav,
    .toc,
    .content {
      padding: 0.85rem;
    }

    .layout-grid {
      grid-template-columns: 1fr;
      width: 100%;
    }

    .toc {
      position: static;
      max-height: unset;
    }

    .toc-toggle {
      display: inline-flex;
    }

    .topbar {
      grid-template-columns: 1fr;
      top: 0.5rem;
      padding: 0.6rem;
      width: 100%;
    }

    .search-wrap {
      width: 100%;
    }

    .search-results {
      max-height: min(55vh, 320px);
    }

    .content h1,
    .intro,
    .content .prose,
    .doc-footer {
      animation: none;
    }
  }

  @media (max-width: 520px) {
    .left-nav {
      left: 0.5rem;
      right: 0.5rem;
      width: auto;
      top: 0.5rem;
      bottom: 0.5rem;
    }

    .brand {
      font-size: 1rem;
    }

    .search-wrap input {
      font-size: 1rem;
    }
  }
</style>
