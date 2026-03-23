---
title: Managing policies
---

**Goal:** Create, version, activate, and test policies in the
dashboard.

Policies define who can do what on drive objects (files and folders).
Some policies also govern **bridge** behavior (for example, sharing a
transfer by email). This guide covers the dashboard lifecycle. For the
policy document structure (YAML/JSON, statements, subjects, actions), see
[Writing policies](/docs/guides/writing-policies/).

For how bridge policy differs from Drive object policy, see [Bridge
transfers and Drive access control](/docs/security/bridge-vs-drive-access/).

## Prerequisites

- Access to the dashboard with permission to manage policies (e.g. under
  a partner or org). Typically an admin or role with policy management.

## List policies

1. Open **Policies** in the dashboard.
2. Optionally filter by **organization** or **partner** to see only
   policies in scope.
3. Use the list to open a policy, create a new one, or manage
   versions.

### Bridge default (system-managed)

The **bridge default** is a single **AccessPolicy** (per partner) that holds
the rules for **bridge** actions such as **`TRANSFER_SHARE`**. In the
Policies list it appears as **Stellarbridge bridge (default)** (or similar)
and may show a **Bridge default** badge. The row is marked **system-managed**:
you **cannot delete** it from the API or UI.

**How it relates to organizations**

- The policy document lives under a **partner** (same policy can be shared
  by many organizations that use that partner).
- Each organization gets an **organization-scoped (ORG) attachment** to
  that policy so bridge checks apply to **every identity in the org**,
  without a separate Settings toggle.
- If an organization has **no partner** yet, seeding waits until a partner
  exists; the platform runs the same **ensure** step when you create an
  org, when a partner is linked, or when a bridge flow needs the policy.

**What the first version contains**

- The seeded **version 1** is a permissive default: **`TRANSFER_SHARE`**
  is **ALLOW** for **UPN**, **API**, and **AGENT** identities (see
  [Bridge actions](/docs/guides/writing-policies/#bridge-actions)).
- The document uses **`scope: IDENTITY`** on the **AccessPolicy** row, which
  matches how bridge evaluation merges **ORG** and **identity** attachments.

**How evaluation combines rules**

- For bridge actions, the engine evaluates policies in order: **all ORG
  attachments for the organization first** (including this default), **then**
  policies attached **directly to the identity**. **DENY** still wins over
  **ALLOW**; if nothing matches, the action is denied.

**How you change behavior**

- **You cannot delete** the policy. Tighten or relax rules by **new
  versions** (fork → edit → activate), like any other policy.
- Add **identity-scoped** attachments for **per-user** overrides (see
  [Writing policies](/docs/guides/writing-policies/)).

## Create a policy

1. In **Policies**, choose **Create policy** (or equivalent).
2. Name the policy and associate it with the correct partner/org as
   required.
3. Add a **version**: paste or upload a policy document (YAML or JSON)
   that follows the [OBJECT scope
   structure](/docs/guides/writing-policies/#document-structure).
4. Save. The new version is not active until you activate it.

## Versions and activate

- Each policy can have multiple **versions**. Only one version is
  **active** at a time; the active version is what the policy engine
  uses.
- To add a new version: open the policy, add a version, and provide the
  new document.
- To **activate** a version: open the policy, select the version you
  want, and choose **Activate**. The previous active version is
  replaced.
- Test changes in a non-active version first; use **Policy evaluate**
  (below) to simulate scenarios before activating.

## Export and import

- **Export:** From the policy or version view, choose Export to
  download the policy document (e.g. for backup or review).
- **Import:** Use Import to create or replace a version from a file
  (YAML or JSON). Validate the document structure; then activate if
  appropriate.

## Policy evaluate (test scenario)

Policy evaluate lets you simulate “Can this identity perform this
action on this object?” without performing the action.

1. Open **Policies** and choose **Policy evaluate** (or open it from a
  policy/object context).
2. Select or enter the **object** (e.g. folder or file), **identity**
  (user, API key, or agent), and **action** (e.g. `DRIVE_DOWNLOAD`,
  `DRIVE_SEND`, or bridge `TRANSFER_SHARE`).
3. Run the evaluation. The result shows whether the request would be
  allowed or denied and which statements matched.

Use this to verify policy behavior before activating a new version or
attaching a policy to an object.

---

## See also

- [Writing policies](/docs/guides/writing-policies/) — Policy document
  structure, subjects, actions, effects, and examples
- [Bridge transfers and Drive access control](/docs/security/bridge-vs-drive-access/)
  — Bridge policy vs Drive object policy
- [Using the Drive](/docs/guides/drive/) — Attach policies to objects,
  run evaluate from the object
- [RBAC](/docs/security/rbac/) — Route-level access (policies apply
  after RBAC)
