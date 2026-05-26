---
title: Tags
---

**Goal:** Manage the organization tag catalog and use tags in Drive.

Tags are organization-scoped labels. The catalog lives in
**Settings → Tags**, and Drive uses that catalog to label files and
folders.

## Prerequisites

- To manage the catalog, you need **TagAdmin** or **OrgUserAdmin**.
- To assign or remove tags on an object, you need write access on that
  object.
- The tags feature must be enabled for your tenant.

## Open the tag catalog

1. Open **Settings**.
2. Select **Tags**.
3. Review the catalog or create a new tag.

Catalog entries have an immutable tag ID and a mutable display name.
Display names must be unique within the organization.

## Create, rename, or delete a tag

1. In **Settings → Tags**, open the catalog actions.
2. Create a tag by entering a display name and optional color.
3. Rename a tag by updating the display name.
4. Delete a tag only when it has no assignments.

If a tag is still assigned to any object, deletion is blocked.
Unused tags are soft-deleted.

## Assign tags in Drive

1. Open **Drive** and select a project.
2. Open an object’s menu or inspector.
3. Choose **Add tag**.
4. Select one or more tags from the catalog.

Assigned tags appear as chips on the object row.
Removing a tag updates the row immediately.

## Filter Drive by tags

1. Open a project in **Drive**.
2. Use the **Tags** filter.
3. Select one or more tags.

Drive returns objects that match **all** selected tags.

## Partner access and feature gating

- On shared projects, partner viewers can see host tags read-only.
- Partners cannot manage the catalog or change assignments.
- When the feature is disabled for a tenant, existing tags remain
  visible but catalog and assignment changes are blocked.

## See also

- [Using the Drive](/docs/guides/drive/) — Assign and filter tags on
  Drive objects
- [RBAC](/docs/security/rbac/) — Roles and route access
- [Features](/docs/features/) — Where tags appear in the product index
