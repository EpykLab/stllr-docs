---
title: Managing policies
---

**Goal:** Create, version, activate, and test policies in the
dashboard.

Policies define who can do what on drive objects (files and folders).
This guide covers the dashboard lifecycle. For the policy document
structure (YAML/JSON, statements, subjects, actions), see [Writing
policies](/docs/guides/writing-policies/).

## Prerequisites

- Access to the dashboard with permission to manage policies (e.g. under
  a partner or org). Typically an admin or role with policy management.

## List policies

1. Open **Policies** in the dashboard.
2. Optionally filter by **organization** or **partner** to see only
   policies in scope.
3. Use the list to open a policy, create a new one, or manage
   versions.

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
  (user, API key, or agent), and **action** (e.g. DOWNLOAD, SEND).
3. Run the evaluation. The result shows whether the request would be
  allowed or denied and which statements matched.

Use this to verify policy behavior before activating a new version or
attaching a policy to an object.

---

## See also

- [Writing policies](/docs/guides/writing-policies/) — Policy document
  structure, subjects, actions, effects, and examples
- [Using the Drive](/docs/guides/drive/) — Attach policies to objects,
  run evaluate from the object
- [RBAC](/docs/security/rbac/) — Route-level access (policies apply
  after RBAC)
