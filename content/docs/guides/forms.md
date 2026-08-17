---
title: Forms
---

**Goal:** Create form definitions, publish shareable links, and review
submissions.

Forms are organization-scoped intake templates. You define fields in the
**Forms** catalog, publish a link for each collection campaign, and
review responses in the dashboard. Public respondents submit without a
Stellarbridge account.

## Prerequisites

- The **Forms** tenant feature must be enabled. An org admin enables it
  under **Settings → Beta** (`platform_forms`).
- Any org member with **OrgUser** (or a role that includes form routes)
  may create personal forms when the feature is active.
- **FormAdmin** or **OrgUserAdmin** may manage any form in the
  organization, create org-owned forms, and un-archive retired forms.
- **FormsViewResponses** grants org-wide read access to submissions
  without catalog or publication changes.

## Enable Forms for your organization

1. Open **Settings**.
2. Select the **Beta** tab.
3. Enable **Forms**.

When the feature is disabled, existing forms and responses remain
visible in read-only mode; new submissions and catalog changes are
blocked.

## Open the form catalog

1. Open **Forms** in the dashboard navigation (shown when the feature is
   enabled).
2. Review forms you own, collaborate on, or may use (org-owned
   templates).
3. Use search to filter by name, ownership, or status.

Form names are unique within the organization (case-insensitive). Each
form has an immutable id; renaming updates the display name on the same
id.

## Create a form

1. In **Forms**, click **Create form**.
2. Enter a name and choose **Personal** or **Org-owned**.
   - **Personal:** you become the owner and manage collaborators.
   - **Org-owned:** available only to **FormAdmin** or **OrgUserAdmin**;
     the organization stewards the template with no single user owner.
3. Save. The form opens in the builder with default fields you can edit.

Any org member may create a personal form. Org-owned forms require
**FormAdmin** or **OrgUserAdmin**.

## Build fields

On the form detail page, use the **Fields** tab to configure the schema.

Supported field types:

- Short text, long text, email
- Select one, select many
- Checkbox, date

For each field, set a label, whether it is required, and optional help
text. Select fields require at least one option (up to 50 options per
field). Drag fields to reorder them. Save changes to bump the form
version; existing publications keep the schema pinned at publish time.

Limits: up to 30 fields per form and 100 forms per organization.

## Publish a shareable link

1. Open the form and select the **Sharing** tab.
2. Click **Publish** and optionally set a label, expiry, or maximum
   response count.
3. Copy the publication link and share it with respondents.

Each publication has its own token and share URL (`/public/forms/…`).
You may run multiple publications for the same form (for example, Q1
and Q2 vendor surveys). Revoke a publication to stop new submissions on
that link without archiving the form definition.

## Review responses

1. Open the form and select the **Responses** tab.
2. Browse submissions for publications you created or forms you
   co-manage.
3. Open a response to view the full answer snapshot.

**FormAdmin**, **OrgUserAdmin**, and **FormsViewResponses** may read
responses org-wide. Collaborators see responses for forms they
co-manage. Responses are immutable after submit.

## Collaborators and org-owned forms

On personal forms, the owner (or **FormAdmin** / **OrgUserAdmin**) may
add org members as collaborators. Collaborators may edit the schema,
publish and revoke links, and view responses on that form. They may not
archive or delete the form.

On org-owned forms, **FormAdmin** or **OrgUserAdmin** manages the
collaborator list.

## Promote or archive

- **Promote to org-owned** (personal forms only): **FormAdmin** or
  **OrgUserAdmin** converts a personal form to an org-owned template.
  This is one-way; the former owner may be kept as a collaborator.
- **Archive:** retires the form definition. No new publications may be
  created; all active publications stop accepting submissions. Stored
  responses remain readable. The name stays reserved while archived.
- **Un-archive:** **FormAdmin** or **OrgUserAdmin** restores an
  archived form on the same id.

## Public respondent flow

Recipients open the publication link without logging in, complete the
fields, and submit. Identity is self-reported through form answers only;
the platform does not verify email ownership in the current release.
Submissions are rate-limited and protected by the platform WAF.

For the recipient perspective, see [Public links](/docs/guides/public-links/#public-form-submit).

## Audit and retention

Each submission records a **FORM_SUBMITTED** audit event with form id,
version, publication id, response id, and field keys answered. Answer
values are stored on the response record only; they are not duplicated
into audit or SIEM payloads by default.

Submitted responses are retained until explicitly purged by a later
feature. Disabling the Forms feature blocks new submissions but does
not delete existing responses.

## See also

- [Public links](/docs/guides/public-links/) — Public form submission
  (recipient flow)
- [RBAC](/docs/security/rbac/) — FormAdmin and FormsViewResponses roles
- [Features](/docs/features/) — Where Forms appears in the product index
- [Audit logging](/docs/about-stellarbridge/audit-logging/) — Organization
  event logs
