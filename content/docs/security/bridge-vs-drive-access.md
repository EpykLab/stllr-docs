---
title: Bridge transfers and Drive access control
description: How RBAC, organization tenancy, and resource policies apply to bridge uploads versus Drive objects, and when each layer runs.
---

This page explains how **access control fits together** for two different
product paths: **bridge transfers** (upload and share before anything lives
in Drive) and **Drive** (folders, files, and policies attached to objects).
Understanding the split avoids confusion when debugging denials or designing
governance.

For route-level roles, see [RBAC](/docs/security/rbac/). For policy syntax,
see [Writing policies](/docs/guides/writing-policies/).

---

## The core idea: transfer is not a Drive object until you add it

A **transfer** created through the bridge (multipart upload, etc.) is a
**blob plus metadata** tied to your organization. It is **not** a row in the
Drive **object** tree until someone performs an explicit **add to Drive**
(or equivalent) that **creates a file** under a project and folder.

Until that happens:

- There is **no Drive folder or file** to attach policies to.
- **Folder- and file-scoped ABAC** (policies on objects, inheritance from
  ancestors) does **not** apply to the transfer as if it were already a
  file in a project.

After add to Drive:

- The content exists as a **FILE** (or other object type) with a stable
  **object id** in a **project**.
- Actions such as **RECEIVE** (drop a file into a folder), **DOWNLOAD**,
  **SHARE_LINK_CREATE** on that file, and other VFS operations are evaluated
  against **policies effective for that object** (and identity), in
  addition to RBAC and tenancy.

---

## Layers of security (order matters)

Requests are checked in roughly this order. Not every layer runs on every
endpoint.

1. **Authentication** — Who is calling (session, API key, agent identity).
2. **RBAC** — Whether the caller’s **role** may invoke this **route** (HTTP
   method and path). If this fails, the handler does not run.
3. **Organization / tenancy** — Whether the resource belongs to the caller’s
   org (or allowed scope). Applies to org-scoped data such as transfers.
4. **Transfer ownership (bridge)** — For some bridge actions, only the
   **sender** recorded on the transfer may act (e.g. share a transfer link by
   email when a sender is stored).
5. **Resource policy (Drive / VFS)** — For operations on **Drive objects**,
   the policy engine evaluates **actions** (e.g. RECEIVE, DOWNLOAD,
   SHARE_LINK_CREATE) against **effective policies** for the **object id**
   and **identity**, after RBAC.

**Policy does not replace RBAC.** You need a role that can call the route;
then, for Drive operations, policy can allow or deny the specific action on
the object.

---

## What applies where

### Bridge: upload and transfer lifecycle

Typical bridge flows (start multipart upload, finalize, list transfers)
enforce **authentication**, **RBAC** (e.g. transfer-related roles), and
**org/tenancy**. They do **not** evaluate **folder/file policy** on a Drive
object id, because **no Drive object exists yet** for that upload.

**Sharing a transfer by email** (sending the public download flow to a
recipient) is still a **bridge-level** action: it is gated by the same
layers as other bridge transfer APIs (including **sender match** when a
sender is recorded), **not** by `SHARE_LINK_CREATE` on a Drive file. Drive
**file share** (tokenized link to a file in a project) is a **separate**
flow and **does** use object-scoped policy on the **file**.

### Drive: objects, folders, and policies

Once a file exists in Drive:

- **Add transfer to Drive** may evaluate **RECEIVE** (or equivalent) on the
  **destination folder** so governance applies **when the file is placed**
  in the tree.
- **Download, delete, rename, share link to file**, etc. evaluate policy on
  the relevant **object id** and action.

Policy attachments and inheritance follow the product model described in
[Managing policies](/docs/guides/managing-policies/) and [Writing
policies](/docs/guides/writing-policies/).

---

## Comparison table

| Topic | Bridge transfer (before / without Drive object) | Drive object |
|------|---------------------------------------------------|--------------|
| Has `objects` row / folder path? | No | Yes |
| Folder/file ABAC on object id? | No | Yes, when the handler uses that object |
| Typical extra checks | Org match, sender for some actions | Policy + project/tenancy resolution |
| “Share” meaning | Email about **transfer** download | **File** share link / policy on FILE |

---

## Why this matters for admins and auditors

- **Denials on “share”** depend on **which API** you use: transfer share vs
  Drive file share use **different** enforcement models.
- **Global admin** (or other admin roles) still passes **RBAC**, but
  **Drive policy** is evaluated on **identity and object** for VFS
  operations; **admin does not automatically bypass** object policy unless
  your policy documents say so.
- **Compliance** narratives should separate **transfer pipeline** controls
  from **Drive retention and access** controls once data is materialized in
  projects.

---

## Related reading

- [RBAC](/docs/security/rbac/) — Roles and API route access
- [Writing policies](/docs/guides/writing-policies/) — Policy documents and
  actions
- [Using the Drive](/docs/guides/drive/) — Drive behavior for end users
- [Transfer](/docs/guides/transfer/) — End-user transfer flows in the
  dashboard
