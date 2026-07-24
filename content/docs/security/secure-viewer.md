---
title: Secure Viewer
---

Secure Viewer is a **beta** capability in stellarbridge that lets users open
supported Drive files in the dashboard without delivering the underlying file
bytes to the browser for local rendering. Availability depends on your tenant:
**Settings → Beta → Secure Viewer**. If the toggle is unavailable (grayed out),
contact your account manager to have the capability enabled for the
organization. After it is allowed at the tenant level, an administrator can turn
on the beta flag for your stellarbridge organization.

## Why browser-side rendering is a concern

Many products let you preview PDFs and similar files by sending content to the
browser and rendering it there. That pattern is often acceptable for everyday
collaboration. It becomes awkward for regulated or highly sensitive data because
anything that **stores, transmits, or processes** that data usually falls in
scope for your compliance program (for example CUI, HIPAA, or internal data
classes). In practice, the browser and the endpoint running it join that scope.

Preview-in-browser also complicates **controlled disclosure**. You may need to
let someone **view** a document while reducing the chance they **persist** it
through ordinary save paths, context menus, or recovery of cached artifacts.
Cached or temporarily stored files can be another path for data to leave your
controlled environment without going through your Drive service directly.

## What Secure Viewer does

Secure Viewer changes the trust boundary: instead of shipping the document to
the client for decoding and layout, stellarbridge **renders the document in an
ephemeral server-side environment** and sends a **pixel-oriented stream** to
the browser. The dashboard displays what you see on screen; the original file
is not handed to the browser as a downloadable object in the usual preview
flow.

In short:

- **File bytes and extractable document fragments** are not delivered to the
  client for typical in-browser preview and caching behavior described above.
- **What the user sees** is a rendered view streamed as pixels, analogous to
  watching a remote desktop session focused on a single document.

That reduces several browser-centric exfiltration paths tied to local file
handles and document caches. It does not turn every endpoint into a zero-trust
kiosk; see [limitations](#what-secure-viewer-does-not-solve) below.

## External secure-view shares

An authorized Drive user can send an external recipient a Secure Viewer
share instead of a download share. The recipient does not need a
Stellarbridge account, but must prove control of the designated mailbox
with a one-time email code before starting a viewer.

An optional share password adds a separate verification factor. When a
password is configured, Stellarbridge verifies it before sending an email
code. Successful email verification creates a short-lived, isolated browser
session. It does not create a dashboard login or grant access to any other
file.

External secure-view sharing uses `DRIVE_SHARE_SECURE_VIEW`. This is
separate from:

- `DRIVE_SECURE_VIEW`, which permits a signed-in user to open the viewer.
- `DRIVE_SHARE`, which permits creation of a downloadable Drive share.
- `DRIVE_DOWNLOAD`, which permits the signed-in user to download a file.

Allowing any one of these actions does not grant the others. Policies
attached to ancestor folders apply to their descendant files.

A secure-view share is checked again when the recipient starts a viewer and
while the stream is active. Revocation, file freeze, deletion, expiry, or a
policy change that removes access blocks activation and terminates affected
active sessions.

## What Secure Viewer does not solve

Secure Viewer removes or narrows a class of technical risk; it does **not**
eliminate all disclosure risk.

**Screen capture and optical leakage.** A user can photograph or record the
screen, use OS-level screenshots, or capture the monitor with a phone camera.
Those actions happen outside stellarbridge's control.

**Watermarking and attribution.** When content is streamed, stellarbridge can
**overlay a watermark** with the viewer's email and a timestamp. That does not
stop capture, but it supports **accountability**: a leaked image often carries
an explicit signal of **who** viewed the document and **when**.

Residual risk should be handled with your usual controls: least privilege,
training, acceptable-use expectations, and contractual obligations for external
recipients.

## Prerequisites

1. **Tenant allowlisting.** While Secure Viewer is in beta, it must be enabled
   for your tenant (see introduction above).
2. **RBAC and policy.** Authorization follows the usual model: **RBAC first,
   then policy** on the resource where applicable (see [RBAC](/docs/security/rbac/)
   and [Bridge transfers and Drive access control](/docs/security/bridge-vs-drive-access/)).
   The viewer identity needs whatever **route-level role permissions** the product
   requires to open Secure Viewer in the dashboard, and an effective **Drive
   policy** that allows **`DRIVE_SECURE_VIEW`** for that principal on the object
   (listed with other Drive actions in [Writing policies](/docs/guides/writing-policies/#actions)).
   Creating an external viewer share instead requires
   **`DRIVE_SHARE_SECURE_VIEW`** for the sender.

## Related documentation

- [RBAC](/docs/security/rbac/) — How roles and routes relate to policy
- [Writing policies](/docs/guides/writing-policies/) — Including
  **`DRIVE_SECURE_VIEW`**
- [Bridge transfers and Drive access control](/docs/security/bridge-vs-drive-access/)
