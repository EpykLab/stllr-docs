---
title: Using the Drive
---

**Goal:** Use the Drive to browse, upload, download, share, and govern
files (including policy attachments and custody reports).

The Drive is where you browse projects and folders, upload and download
files, attach policies, and generate custody reports. This guide covers
the main tasks.

## Prerequisites

- Access to the stellarbridge dashboard with a role that includes
  Drive (e.g. DriveUser or role with drive/object permissions).
- At least one project visible to you.
- To manage the tag catalog, you need the TagAdmin role (or
  OrgUserAdmin, if your org allows it).

## Browse projects and folders

1. Open **Drive** in the dashboard.
2. Select a **project** to see its root folders and files.
3. Open folders to browse. You can create new folders or file objects
   from the Drive UI.
4. Use **Rename** or **Move** from the object menu to change names or
   locations; use **Delete** to remove objects (subject to policy).

## Upload a file

1. In Drive, open the folder where the file should land.
2. Use the upload action (e.g. **Upload** or **Add file**).
3. The app provides an upload URL or flow; complete the upload as
   prompted.
4. The file appears in the folder once the upload finishes. Uploads
   are subject to policy (e.g. SEND on the folder).

## Download a file

1. In Drive, locate the file and open its menu.
2. Choose **Download** (or equivalent). The app returns a download URL
   (e.g. presigned) for the file.
3. Use that URL to download the file. Downloads are subject to policy
   (e.g. DOWNLOAD on the object).

## Share a file (send link by email)

1. In Drive, open the file’s menu.
2. Choose **Share** or **Create share**.
3. Enter the recipient email and send. The recipient receives a
   share link (token). They can open it without logging in and
   download the file. See [Public drive share](/docs/guides/public-links/#public-drive-share).

## Policy attachments and evaluate

- **List or change policy attachments:** Open the object’s menu and
  use the option to list, add, or remove policy attachments. Policies
  on the object or an ancestor folder apply to access decisions.
- **Policy evaluate (simulate):** Use the policy evaluate feature in
  the dashboard to run a test scenario (e.g. “Can identity X perform
  DOWNLOAD on this object?”) without performing the action. See
  [Writing policies](/docs/guides/writing-policies/) for policy
  structure and [Managing policies](/docs/guides/managing-policies/) for
  creating and activating policies.

## Tags

Tags are organization-scoped labels. The tag catalog lives in
**Settings → Tags**; Drive uses that catalog to assign labels to files
and folders.

1. Open **Drive** and select a project.
2. Open an object’s menu or inspector and choose **Add tag**.
3. Pick one or more tags from the catalog. Assigned tags appear as
   chips on the row.
4. To remove a tag, open the object menu or inspector and choose the
   tag to remove.
5. Use the **Tags** filter bar to narrow the project tree. Multiple
   selected tags match **all** selected tags.

Notes:

- Assigning or removing tags requires write access on the object.
- Partner viewers can read host tags on shared projects, but they
  cannot manage the catalog.
- When the feature is disabled for your tenant, existing tags remain
  visible but catalog and assignment changes are blocked.

## Custody report

To generate a chain-of-custody report for an object (e.g. for
compliance or audit):

1. In Drive, open the folder or file’s menu.
2. Choose **Custody report** (or **Generate custody report**).
3. The app generates a report you can view or download.

---

## See also

- [Writing policies](/docs/guides/writing-policies/) — How to write
  access policies (YAML/JSON)
- [Managing policies](/docs/guides/managing-policies/) — Create,
  version, and activate policies in the dashboard
- [Public links](/docs/guides/public-links/) — Public download and
  share flows
- [Tags](/docs/guides/tags/) — Tag catalog and Drive labeling
- [RBAC](/docs/security/rbac/) — Roles and route access
