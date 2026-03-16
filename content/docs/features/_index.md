---
title: Features
---

Reference index of features, with links to
detailed documentation. Use this page to find where each capability is
documented.

## Authentication and account

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Sign in / Sign out | Log in via OIDC (Auth0) or SAML; log out from the user menu | Dashboard login |
| Accept terms of service | View and accept terms during login or on the standalone terms page | [Terms of service](/docs/about-stellarbridge/terms-of-service/) |
| Complete organization invitation | After accepting an Auth0 org invite, complete setup in the app | [Managing your organization](/docs/guides/managing-your-organization/#complete-org-invite) |
| Account profile | View and update profile; notification preferences; delete account | Dashboard profile/settings |
| MFA | Enroll in MFA (Auth0); app enforces grace period and hard lock | [Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/) |

## Dashboard and operations

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Overview | Metrics, today timeline, priority queue (transfer preview) | Dashboard Overview |
| Transfer Studio | Usage; list transfer requests; create transfer request (upload link for recipient) | [Transfer a file](/docs/guides/transfer/), [Public links](/docs/guides/public-links/) |
| Transfers | History and requests; protect/unprotect; delete; lock-to-org; custody report | [Transfer a file](/docs/guides/transfer/) |
| Drive | Browse projects and folders/files; create folder/file; rename or move; delete; upload/download; share link; policy attachments; policy evaluate; custody report | [Using the Drive](/docs/guides/drive/) |

## Policies and control

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Policies | List, create, view, update, delete; versions; activate; export/import; policy evaluate | [Managing policies](/docs/guides/managing-policies/), [Writing policies](/docs/guides/writing-policies/) |
| Groups | List, create, view, update, delete groups; manage group members (identities) | Dashboard Policies / Groups |
| Partners | List, create, delete partners | Dashboard Partners |
| Projects | List (org or by partner); create; update project partners; delete | Dashboard Projects |
| Identities | List, create, update, delete identities; rotate API key; policy attachments on identity | Dashboard Identities |

## Organization and settings

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Organization | Create org; org panel; manage users (add, remove, disable, enable); invites; org transfers, events, invites; transfer org lock; password reset; MFA compliance; data custodians | [Managing your organization](/docs/guides/managing-your-organization/) |
| Organization settings | SAML SSO, TOTP requirement, domain invite-only, lock-to-org by default, password rules | [Managing your organization](/docs/guides/managing-your-organization/#organization-settings) |
| RBAC | List org roles; get, add, or remove user roles by email | [RBAC](/docs/security/rbac/), [Managing your organization](/docs/guides/managing-your-organization/#permissions-rbac) |
| API keys | List; create; revoke; rotate one or all; delete | Dashboard Settings / API keys |
| Networking | List, create, update, delete network rules for the org | Dashboard Settings / Networking |

## Support and gate

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Gate approval | Approve a gate request using a one-time token (admin-in-the-loop) | [Gate approval](/docs/guides/gate-approval/) |
| Notify policy denial | When access is denied by policy, send denial context to org admin by email | [Gate approval](/docs/guides/gate-approval/#policy-denial-notification) |

## Public (unauthenticated)

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Public download | Open link by transfer UUID; view download info; get presigned URL and download | [Public links](/docs/guides/public-links/#public-download) |
| Public drive share | Open share link by token; view share info; get presigned URL and download | [Public links](/docs/guides/public-links/#public-drive-share) |
| Public upload | Open upload link by request UID; view request info; upload files to fulfill request | [Public links](/docs/guides/public-links/#public-upload) |

## Audit

| Feature | Description | Documentation |
| --------| ----------- | -------------- |
| Audit | View organization events and transfers (admin/audit view) | [Audit logging](/docs/about-stellarbridge/audit-logging/), [Export logs to SIEM](/docs/guides/security/) |

---

## User flows

High-level flows that combine the features above:

- **Sign in** — Login page (optional return URL or org) → sign in →
  redirect to Auth0/SAML → callback → terms modal if needed →
  dashboard.
- **Accept terms** — Terms modal or page → read → accept → backend
  records acceptance → continue (e.g. dashboard).
- **Complete org invite** — Accept invite in Auth0 → land in app with
  invitation=accepted → “Complete your invitation” → Complete setup →
  backend completes org link → dashboard.
- **View and use Drive** — Open Drive → select project → browse
  folders/files; create folder/file, upload, download, rename, move,
  delete; attach policies, run simulate, custody report; share file
  (email).
- **Create transfer request** — Transfer Studio → create request →
  backend returns upload link → share link with recipient → recipient
  uses [public upload](/docs/guides/public-links/#public-upload) to
  upload.
- **Manage transfers** — Transfers → history and requests →
  protect/unprotect, delete transfer, lock-to-org, delete request,
  custody report.
- **Manage policies** — Policies → filter by partner → create policy,
  edit versions, activate version, export/import, run evaluate.
- **Manage organization** — Organization → users and invites; org
  settings (SAML, password rules, etc.); RBAC; data custodians;
  network rules.
- **Public download** — Recipient opens download link (UUID) → file
  info → download → presigned URL.
- **Public drive share** — Recipient opens share link (token) → file
  info → download → presigned URL.
- **Approve gate** — Admin receives email with gate-approve link → open
  link (one-time token) → gate-approve API → request approved.
