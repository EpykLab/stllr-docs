<script lang="ts">
  import DocsShell from '$lib/components/DocsShell.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<DocsShell
  title={data.title}
  description={data.description}
  nav={data.nav}
  currentPath={data.currentPath}
  headings={data.headings}
  updatedAt={data.updatedAt}
  sourcePath={data.sourcePath}
>
  {@html data.html}
</DocsShell>
