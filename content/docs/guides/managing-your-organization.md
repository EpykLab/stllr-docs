---
title: Managing your organization
---

**Goal:** Manage your organization, users, invites, and settings (org
admin tasks).

This guide explains what organizations are in stellarbridge and how to
manage them as an organization admin. It covers domains, configuration,
and day-to-day user and role management.

## Prerequisites

- An active Advanced Plus subscription or higher.
- The **GlobalAdmin** role assigned to your account.

## The organization admin

When you sign up with stellarbridge at the Advanced Plus subscription
level or higher, a user account of your choosing is added as the
organization admin and can create and manage organizations. The
organization admin can invite other users and assign them roles.

Recommendation: use a dedicated email for the organization admin (and
any other GlobalAdmin accounts), separate from your personal or licensed
email.

## Organization domains and name

- **Domain:** When an admin creates an organization, they must specify
  a domain. This uniquely identifies the organization and can restrict
  invites to users whose email matches that domain (e.g. domain
  `stellarbridge.com` allows only `*@stellarbridge.com` to be invited).
- **Name:** The organization name is used to identify the organization
  in the UI.

## Organization settings {#organization-settings}

Admins configure the organization from the Organization page or
Settings. Key options:

| Setting | Description |
| ------- | ----------- |
| **SAML SSO** | Configure SAML-based single sign-on for the organization. |
| **TOTP requirement** | Require users to enroll in MFA (TOTP) before they can use the org. |
| **Domain invite-only** | Only users whose email is in the organization domain can be invited. |
| **Lock-to-org by default** | Transfers are locked to the organization by default (configurable per transfer). |
| **Tag catalog** | Manage the org tag catalog used by Drive. |
| **Beta features** | Enable tenant features such as Tags and Forms (`platform_forms`). |
| **Password rules** | Minimum and maximum length; requirements for digits, lower/upper case, special characters. |

Additional settings may include data custodians (list, add, remove),
network rules (list, create, update, delete for the org), and MFA
compliance visibility.

## Configuration options (summary)

| Option              | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| Domain-only Invites | Only users with an email in the organization domain can be invited.         |
| Required TOTP       | Users must set up a TOTP device before they can join the organization.      |
| Password Max Length | Maximum length of the password.                                             |
| Password Min Length | Minimum length of the password.                                             |

## Organization features

Organizations support: invitations, users, roles, tag catalog
management, forms (when enabled), transfer management, audit logs, and
billing.

---

## How invitations work

stellarbridge organizations are **invite-only**. People cannot create
their own accounts from the public sign-in page; an organization admin
must invite them first.

### For organization admins

1. Go to the [Organization](https://stellarbridge.app/dashboard/organization)
   page.
2. In the **Organization Users** card, enter the invitee’s email address.
3. Click **Invite**.

The invitee receives an email from stellarbridge with a link to get
started. You can see pending invitations on the same page and cancel an
invite from the **...** menu if you sent it by mistake.

If **domain-only invites** are enabled for your organization, you can
only invite addresses that match your organization’s email domain (for
example, only `*@yourcompany.com`).

New members are given basic access (typically the **OrgUser** role). To
grant admin or specialist permissions, assign additional roles after
they join. See [Permissions (RBAC)](#permissions-rbac) below.

### For invitees (accepting an invitation)

1. Open the invitation email and click **Accept Invitation** (or the
   link in the message).
2. Follow the prompts to **set your password** for stellarbridge.
3. Go to the stellarbridge sign-in page for your organization and
   **sign in** with the email address that was invited and the password
   you just created.
4. If your organization requires multi-factor authentication (MFA), you
   will be prompted to enroll before you can use the dashboard.
5. After sign-in, you can use projects, Drive, transfers, and other
   features according to the roles your admin assigned.

If you already had a stellarbridge account with that email, use the link
in the invitation email if prompted, then sign in with your existing
password. Your admin may need to confirm you appear in the organization
user list.

If the link has expired or you did not receive the email, ask your
organization admin to send a new invitation or use **Reset password**
from the sign-in page after they have invited you again.

### What invitees cannot do

- **Self-service sign-up** — There is no public “Create account” path
  for invite-only organizations. You must be invited by an admin.
- **Join without an invitation** — Signing in with an email that was
  never invited will not grant access to the organization.

---

## How to manage users

stellarbridge provides several ways to manage users in your
organization.

### Add a user

Use the steps in [For organization admins](#for-organization-admins)
above.

### Remove a user

1. Go to the [Organization](https://stellarbridge.app/dashboard/organization)
   page.
2. In the **Organization Users** card, open the **...** menu next to the
   user you want to remove.
3. Click **Remove from org**.

### Change a user’s role (RBAC)

If your organization uses **TagAdmin**, assign that role to users who
should manage the tag catalog without broader org admin access.

If your organization uses **FormAdmin** or **FormsViewResponses**,
assign those roles to users who should steward the form catalog or
review submissions org-wide without full org admin access.

1. Go to the [Organization](https://stellarbridge.app/dashboard/organization)
   page.
2. In the **Organization Users** card, open the **...** menu next to the
   user whose role you want to change.
3. Click **Settings**.
4. Select the new role in the popup and click **Save**.

### Other settings

| Feature             | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| Domain-only invite   | When enabled, only users with an email in the org domain can be invited.     |

---

## Permissions (RBAC)

stellarbridge uses role-based access control (RBAC) so administrators
can enforce least privilege. Roles define which API routes and
dashboard areas a user can access.

### Roles overview

| Role            | Summary                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| TransferUser    | Upload, download, and manage transfers.                                  |
| GlobalAdmin     | Access to everything.                                                    |
| OrgUser         | Basic access: uploads, streams, transfer history, organization overview.|
| RoleAdmin       | Manage roles and permissions assigned to users in the organization.     |
| TagAdmin        | Manage the organization tag catalog used in Drive.                      |
| FormAdmin       | Manage any form in the organization (catalog, publications, archive). |
| FormsViewResponses | Read all form submissions org-wide without catalog changes.          |
| SecurityAnalyst | View security reports.                                                  |
| UploadUser      | Upload and manage own uploads.                                         |

As stellarbridge evolves, new roles may be added. For the full list of
roles and their routes, see [RBAC](/docs/security/rbac/).
