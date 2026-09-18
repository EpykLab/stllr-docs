---
name: stellarbridge-video-scripts
description: Create or revise Stellarbridge product-guide video scripts and companion pages under site_docs/videos, including narration, on-screen direction, transcripts, resources, and post-publication links.
---

# Stellarbridge video scripts

Create a recording-ready script and a useful companion page for one clear
Stellarbridge task. Treat the documentation and current product behavior as the
source of truth; do not invent UI labels, permissions, security behavior, or
YouTube URLs.

## Establish the guide

Before drafting, identify:

- the single outcome viewers will achieve;
- the audience and required role or permissions;
- the related documentation page and product area;
- the demo starting state, sample data, and expected end state;
- whether the page is a draft script or a published video companion.

Use the related guide and, when product behavior is not fully documented, the
Stellarbridge application source to verify the flow. If a material behavior
cannot be verified, flag it for review instead of presenting it as fact.

Choose one voice for the script:

- **Engineer Peer** for procedural and technical walkthroughs. Explain the
  mechanism and relevant constraints without sales framing.
- **Executive Guide** for architectural or decision-oriented videos. Lead with
  outcomes, boundaries, and failure modes.

## Write for narration and demonstration

- Make the first spoken sentence state what the viewer will accomplish.
- Keep one primary outcome per video. Split unrelated workflows into separate
  pages rather than creating a long tour.
- Write natural spoken language: short sentences, active verbs, and concrete
  nouns. Target roughly 130–150 spoken words per minute.
- Pair every narration beat with an observable on-screen action or purposeful
  visual. Use the exact interface labels viewers will see.
- Explain why a consequential choice matters, especially for access, policy,
  sharing, and audit behavior. Pair security claims with the mechanism that
  supports them and name material limitations.
- Use only synthetic demo data. Never place credentials, tokens, customer data,
  personal data, or production identifiers in a script or recording plan.
- Do not use marketing superlatives, fear-based framing, rhetorical questions,
  emojis, or vague claims such as “secure” without a mechanism.
- Prefer Stellarbridge vocabulary such as explicit, enforced, observable, and
  policy-backed. Describe Stellarbridge as governing data flows, not merely
  storing or moving files.
- Ensure the narration remains understandable without relying only on visual
  cues such as color or pointer position.

## Build the page

Read [references/video-page-template.md](references/video-page-template.md) and
adapt it to the guide. Create the page at `site_docs/videos/<slug>.md`; the
resulting route is `/videos/<slug>/`.

For a draft:

- include the production brief, timed narration, on-screen direction, and
  production notes;
- use `video_status: script` in frontmatter;
- do not add a placeholder or fabricated YouTube URL.

For a published video:

- use `video_status: published` and add the verified YouTube URL;
- lead with a viewer-focused introduction and video link;
- convert the narration into a clean transcript, removing production-only
  direction from the public reading flow;
- keep prerequisites, related documentation, downloads, and other resources
  that help viewers complete the task;
- add a concise video link to the related documentation page.

Add every new route to `tests/expected_video_urls.txt`. Preserve an existing
slug when moving a page from script to published status.

## Review and verify

Before finishing:

1. Read the narration aloud for cadence and calculate a plausible runtime from
   its word count.
2. Confirm each UI label, permission, action, and result against current
   documentation or product behavior.
3. Remove repetition, filler, unsupported security claims, and recording-only
   details that do not help production.
4. Check that the outcome, prerequisites, demo state, and next step are explicit.
5. Run `mkdocs build --strict` and `python scripts/check_urls.py` from the
   repository root.

Human review is required before recording and again before publication.
