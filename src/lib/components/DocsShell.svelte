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
  let miniSearch: MiniSearch<SearchDoc> | null = null;
  let searchInput: HTMLInputElement | null = null;
  let tocOpen = $state(true);

  const toc = $derived(headings.filter((item) => item.level <= 3));

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
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const trigger = isMac ? event.metaKey : event.ctrlKey;

      if (!trigger || event.key.toLowerCase() !== 'k') {
        return;
      }

      event.preventDefault();
      searchInput?.focus();
      searchInput?.select();
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
  <header class="topbar panel">
    <div class="brand-wrap">
      <button class="menu-btn" onclick={() => (mobileNavOpen = !mobileNavOpen)} aria-label="Toggle navigation">
        Menu
      </button>
      <a class="brand" href="/docs/">Stellarbridge Docs</a>
    </div>

    <div class="search-wrap">
      <input
        bind:this={searchInput}
        bind:value={query}
        placeholder="Search docs (Ctrl/Cmd+K)"
        aria-label="Search docs"
      />
      {#if searchResults.length > 0}
        <ul class="search-results panel">
          {#each searchResults as result}
            <li>
              <a href={result.href} onclick={handleSearchSelection}>
                <strong>{result.title}</strong>
                {#if result.summary}
                  <span>{result.summary}</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
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
        <a href="https://github.com/stellarbridge/stllr/blob/main/{sourcePath}" rel="noreferrer" target="_blank">
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

  .topbar {
    position: sticky;
    top: 0.8rem;
    z-index: 50;
    margin: 0 auto 0.9rem;
    max-width: 1500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem;
    padding: 0.65rem;
  }

  .brand-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .brand {
    text-decoration: none;
    font-weight: 700;
    color: #12372a;
  }

  .menu-btn,
  .close-btn {
    border: 1px solid #bed9cc;
    border-radius: 8px;
    background: #eff8f3;
    padding: 0.4rem 0.62rem;
    font-weight: 600;
    color: #1c4c3b;
    cursor: pointer;
  }

  .search-wrap {
    position: relative;
    width: min(620px, 100%);
  }

  .search-wrap input {
    width: 100%;
    border: 1px solid #bdd6cb;
    border-radius: 11px;
    background: #fff;
    padding: 0.6rem 0.72rem;
  }

  .search-results {
    position: absolute;
    top: calc(100% + 0.35rem);
    left: 0;
    right: 0;
    z-index: 65;
    margin: 0;
    padding: 0.4rem;
    list-style: none;
    max-height: 380px;
    overflow-y: auto;
  }

  .search-results a {
    display: grid;
    gap: 0.1rem;
    padding: 0.55rem;
    border-radius: 10px;
    color: #1b3a2f;
    text-decoration: none;
  }

  .search-results a:hover {
    background: #e8f6ef;
  }

  .search-results span {
    color: #4f6c5f;
    font-size: 0.88rem;
  }

  .layout-grid {
    max-width: 1500px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 285px minmax(0, 1fr) 260px;
    gap: 0.85rem;
    align-items: start;
  }

  .layout-grid > * {
    min-width: 0;
  }

  .left-nav,
  .toc,
  .content {
    padding: 0.95rem;
  }

  .left-nav,
  .toc {
    position: sticky;
    top: 5.5rem;
    max-height: calc(100dvh - 6.5rem);
    overflow: auto;
  }

  .nav-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.65rem;
  }

  .close-btn {
    display: none;
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.74rem;
    color: #5b7769;
    font-weight: 700;
  }

  h1 {
    margin-bottom: 0.6rem;
  }

  .intro {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .doc-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #d4e4dc;
    display: flex;
    gap: 0.85rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .toc h3 {
    margin-bottom: 0;
  }

  .toc-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.6rem;
  }

  .toc-toggle {
    display: none;
    border: 1px solid #bed9cc;
    border-radius: 8px;
    background: #eff8f3;
    padding: 0.25rem 0.55rem;
    color: #1c4c3b;
    font-size: 0.83rem;
    font-weight: 600;
    cursor: pointer;
  }

  .toc ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.25rem;
  }

  .toc li a {
    color: #2a4c3e;
    text-decoration: none;
    font-size: 0.9rem;
  }

  .toc li.level-3 {
    margin-left: 0.7rem;
  }

  .backdrop {
    border: 0;
    position: fixed;
    inset: 0;
    background: rgba(19, 34, 28, 0.4);
    z-index: 45;
  }

  @media (max-width: 1150px) {
    .layout-grid {
      grid-template-columns: 1fr 270px;
    }

    .left-nav {
      position: fixed;
      top: 1rem;
      left: 1rem;
      bottom: 1rem;
      width: min(85vw, 360px);
      max-height: unset;
      transform: translateX(-110%);
      transition: transform 0.2s ease;
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
    .docs-app {
      padding: 0.6rem;
    }

    .left-nav,
    .toc,
    .content {
      padding: 0.75rem;
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
      flex-direction: column;
      align-items: stretch;
      top: 0.4rem;
      padding: 0.55rem;
      width: 100%;
    }

    .search-wrap {
      width: 100%;
    }

    .search-results {
      max-height: min(55vh, 320px);
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
      font-size: 0.95rem;
    }

    .search-wrap input {
      font-size: 0.95rem;
    }
  }
</style>
