# stllr-docs

SvelteKit-based docs experience for Stellarbridge.

## Content Source

- Source markdown is now local in `content/docs/**` (migrated from `public-docs/content/docs/**`).
- Static assets/images are local in `static/**` (migrated from `public-docs/static/**`).
- The app reads local docs content at runtime/build time and renders it with:
  - frontmatter (`title`, `description`, `weight`, `tags`, `aliases`, `draft`)
  - heading extraction for TOC
  - generated search index endpoint

## Development

```bash
pnpm install
pnpm dev
```

## Validation

```bash
pnpm check
pnpm build
```

## Deploy to Fly (same app as public-docs)

This app includes `app/stllr-docs/fly.toml` with `app = "stllr-public-docs"` and a SvelteKit Node Dockerfile.

Deploy from repo root:

```bash
fly deploy -c app/stllr-docs/fly.toml app/stllr-docs
```

Or from inside `app/stllr-docs`:

```bash
fly deploy
```

## API Endpoints

- `/api/docs/nav` returns the generated docs navigation tree.
- `/api/docs/search-index` returns index data used by client-side search.

## Notes

- Current search is in-app MiniSearch to provide immediate quality search while keeping the stack static and self-hosted.
- A Pagefind build step can be added in a follow-up if you want search indexing to run strictly post-build.
