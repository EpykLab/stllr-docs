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

Organizations support: invitations, users, roles, transfer management,
audit logs, and billing.

---

## How to manage users

stellarbridge provides several ways to manage users in your
organization.

### Add a user

1. Go to the [Organization](https://stellarbridge.app/dashboard/organization)
   page.
2. In the **Organization Users** card, enter the invitee’s email in the
   invite box.
3. Click **Invite**.

If domain-only invites are enabled, only addresses in the
organization’s domain can be invited.

### Complete org invite {#complete-org-invite}

If you were invited to an organization and accepted the invite in Auth0
(or your IdP), you land in the app with an invitation pending. Complete
the link to the organization:

1. When you see **Complete your invitation** (or similar), click
   **Complete setup**.
2. The backend links your account to the organization. You are then
   taken to the dashboard and can use the org’s projects and features
   according to your assigned roles.

New users receive a default permission set (typically the **OrgUser**
role). To grant more permissions, an admin must assign additional
roles. See [RBAC](/docs/security/rbac/) for roles, including
[OrgUser](/docs/security/rbac/#orguser).

### Remove a user

1. Go to the [Organization](https://stellarbridge.app/dashboard/organization)
   page.
2. In the **Organization Users** card, open the **...** menu next to the
   user you want to remove.
3. Click **Remove from org**.

### Change a user’s role (RBAC)

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
| BridgeUser      | Upload, download, and manage transfers.                                  |
| GlobalAdmin     | Access to everything.                                                    |
| OrgUser         | Basic access: uploads, streams, transfer history, organization overview.|
| RoleAdmin       | Manage roles and permissions assigned to users in the organization.     |
| SecurityAnalyst | View security reports.                                                  |
| UploadUser      | Upload and manage own uploads.                                         |

As stellarbridge evolves, new roles may be added. For the full list of
roles and their routes, see [RBAC](/docs/security/rbac/).
