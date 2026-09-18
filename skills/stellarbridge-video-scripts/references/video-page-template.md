# Video page template

Use the sections that support the guide; omit empty or irrelevant sections.
Keep draft production notes concise enough that a presenter and editor can work
from the page without a separate briefing.

## Draft script

```markdown
---
title: <Outcome-focused title>
description: <One sentence describing what the viewer will accomplish.>
video_status: script
---

# <Outcome-focused title>

<First-line summary of the viewer outcome.>

## Production brief

- **Audience:** <Primary viewer>
- **Outcome:** <Observable end state>
- **Target runtime:** <Minutes>
- **Prerequisites:** <Role, permissions, setup>
- **Demo starting state:** <Required sample objects and configuration>
- **Related guide:** [<Guide title>](/docs/.../)

## Script

### 0:00–0:15 — <Beat name>

**Narration**

<Words the presenter says.>

**On screen**

<Exact screen, action, UI label, and visible result.>

**Production notes**

<Optional callout, crop, pause, redaction, or edit.>

## Resources

- [<Related documentation>](</docs/.../>) — <Why it helps>

## Review notes

- <Only unresolved claims or recording dependencies. Remove when resolved.>
```

Do not force every beat into 15 seconds. Use timestamps that reflect the actual
narration and interaction time. Omit **Production notes** when there is nothing
the editor needs to know.

## Published companion page

```markdown
---
title: <Outcome-focused title>
description: <One sentence describing what the viewer will accomplish.>
video_status: published
youtube_url: <Verified canonical YouTube URL>
---

# <Outcome-focused title>

<First-line summary of the viewer outcome.>

[Watch the video on YouTube](<Verified canonical YouTube URL>)

## Before you begin

- <Relevant role, permission, or setup>

## Transcript

<Readable transcript with descriptive headings. Remove timestamps unless they
materially help viewers navigate the video.>

## Resources

- [<Related documentation>](</docs/.../>) — <Why it helps>
```

On the related documentation page, add a short **Video walkthrough** section or
an equivalent contextual link. Link to the local `/videos/<slug>/` companion
page so viewers get the transcript and resources as well as the YouTube link.
