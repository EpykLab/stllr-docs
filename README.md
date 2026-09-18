# Stellarbridge documentation

The public Stellarbridge documentation site is built with
[MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## Repository layout

- `site_docs/docs/` contains the documentation pages.
- `site_docs/videos/` contains video scripts, transcripts, and companion
  resources. These pages are public by URL but intentionally omitted from the
  main navigation.
- `site_docs/stylesheets/extra.css` contains the Stellarbridge theme.
- `mkdocs.yml` defines navigation, Markdown features, and site metadata.
- `tests/expected_urls.txt` is the public URL contract inherited from the
  previous SvelteKit site.
- `tests/expected_video_urls.txt` is the URL contract for the unlisted video
  section.
- `scripts/check_urls.py` verifies the generated pages and internal links.

The `site_docs/docs/` prefix is intentional. It keeps every existing public
page at its original `/docs/.../` URL.

## Local development

Install the pinned dependency and start the development server:

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.lock
mkdocs serve
```

Open <http://127.0.0.1:8000/docs/>.

## Validation

Build in strict mode and verify the URL contract:

```bash
mkdocs build --strict
python scripts/check_urls.py
```

If a documentation page is intentionally added or removed, update
`tests/expected_urls.txt` in the same change. Existing entries must not be
renamed or removed without a redirect plan. The same check preserves legacy
static assets and GitHub-style heading fragments used by deep links.

When adding a video page, add its route to `tests/expected_video_urls.txt`.

## Deployment

Pushes to `master` are deployed to the existing `stllr-public-docs` Fly.io
application by `.github/workflows/deploy-docs.yaml`. The Docker image builds
the static MkDocs site, then serves it with nginx on port 8080. Nginx preserves
the previous `307 / → /docs/` redirect.
