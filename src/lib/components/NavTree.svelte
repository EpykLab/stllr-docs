<script lang="ts">
  import NavTree from '$lib/components/NavTree.svelte';
  import type { NavNode } from '$lib/types';

  let {
    nodes,
    currentPath,
    onNavigate,
    depth = 0
  }: {
    nodes: NavNode[];
    currentPath: string;
    onNavigate?: () => void;
    depth?: number;
  } = $props();

  function isActive(node: NavNode): boolean {
    if (node.href === currentPath) {
      return true;
    }

    return node.children.some((child: NavNode) => isActive(child));
  }
</script>

{#if nodes.length > 0}
  <ul class="nav-list depth-{depth}">
    {#each nodes as node}
      <li>
        <a class:active={isActive(node)} href={node.href} onclick={onNavigate}>{node.title}</a>
        <NavTree nodes={node.children} {currentPath} {onNavigate} depth={depth + 1} />
      </li>
    {/each}
  </ul>
{/if}

<style>
  .nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.15rem;
  }

  .depth-0 {
    gap: 0.35rem;
  }

  li {
    margin: 0;
  }

  a {
    display: block;
    border-radius: 10px;
    padding: 0.42rem 0.52rem;
    color: #2d4a3c;
    text-decoration: none;
    font-size: 0.94rem;
  }

  a:hover {
    background: #e7f4ed;
  }

  .active {
    background: #d8efe4;
    color: #0b614c;
    font-weight: 700;
  }

  .depth-1,
  .depth-2,
  .depth-3 {
    margin-left: 0.6rem;
    margin-top: 0.2rem;
    border-left: 1px dashed #c3dbcf;
    padding-left: 0.38rem;
  }
</style>
