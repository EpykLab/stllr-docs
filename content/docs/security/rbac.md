---
title: Role-based access control (RBAC)
---

This page explains how roles work in stellarbridge and what each role
can do. Exact API routes per role are defined in the codebase at
`internal/rbac/unified_permissions.go` and may change with releases.

## Authorization model: RBAC first, then policy

**RBAC is the primary authorization gate.** Every protected API request
is checked against route-level RBAC (path and HTTP method) before any
handler runs. If the user’s role does not have permission for that
route, the request is denied and the handler is never invoked.
**Resource-level policies** (for example, access policies on drive
objects or identities) are evaluated **only after** the request has
already passed route-level RBAC. So: you must have the right role to
call the route; then, for routes that perform resource-level checks
(such as download or delete on an object), the policy engine runs
inside the handler to allow or deny the specific action on that
resource. Policy cannot bypass RBAC; RBAC cannot be overridden by
policy.

stellarbridge uses [Casbin](https://casbin.org/) to enforce RBAC. Each
role has a **Casbin subject** (internal identifier) and a set of
allowed API routes.

---

## Roles at a glance

Use this table to see which role fits which job. Admins assign one or
more roles to users in the organization.

### End-user roles (daily use)

| Role | Best for | What they can do |
|------|----------|------------------|
| **OrgUser** | Standard org members | Upload and download files; use the Drive (projects, folders, files, policies, partners, identities); view transfer history and org panel; accept org invites; create and manage policies, partners, projects; notify on policy denial. Broadest “normal user” role. |
| **BridgeUser** | Users who need uploads, downloads, and streaming | Everything upload- and stream-related: uploads, downloads, transfer requests, add transfer to Drive, streams (config, session, signal); usage and transfer history; all bridge operations, reports, and analytics. No Drive/policy/partner management. |
| **UploadUser** | Users who only upload (no streaming) | Upload files; manage their own uploads and transfers (protect, unprotect, delete); create transfer requests and add transfers to Drive; view usage and transfer history. No streaming, no Drive/policy/partner management. |
| **StreamUser** | Users who only stream | Stream only: get stream config and session, update stream config (signal). No uploads, no Drive, no transfer requests. |

### Admin roles

| Role | Best for | What they can do |
|------|----------|------------------|
| **GlobalAdmin** | Full platform control | Access to all API routes. Use sparingly. |
| **OrgUserAdmin** | User lifecycle in the org | Invite users to the organization; create and cancel Auth0 invitations; list, add, and remove org users; delete user accounts; delete projects (org-scoped). |
| **RoleAdmin** | Assigning roles | List org roles; get, add, or remove roles for a user (by email). Cannot change org settings or manage content. |
| **SecurityAnalyst** | Read-only security view | View organization events and organization transfers. No write access. |
| **TransferAdmin** | Transfer governance | Set organization transfer lock status; toggle lock-to-org for transfers. |
| **NetworkAdmin** | Network restrictions | List, create, update, and delete network rules for the organization. |
| **ServiceAccountAdmin** | API keys / service accounts | List, get, add, revoke, rotate (one or all), and delete service accounts (API keys). |
| **AgentIdentityAdmin** | Agent identities | List, create, update, and delete agent identities; rotate agent API keys; list, add, and remove policy attachments on identities. |

### Special roles

| Role | Best for | What they can do |
|------|----------|------------------|
| **DataCustodian** | Compliance / custody | Generate chain-of-custody reports for transfers. No other access. |
| **AuditLogStreamer** | Viewing audit logs | View user event logs and organization audit logs. No other admin or content access. |
| **FileRequestedUser** | Anonymous recipients | Assigned automatically when someone uses a transfer-request upload link. Allows only the multipart-upload and URL-info routes needed to fulfill the request. Not assigned in the dashboard. |

---

## Role reference (summary)

| Role | Casbin subject | Description |
|------|-----------------|-------------|
| GlobalAdmin | admin | Access to everything. |
| BridgeUser | user:bridge | Upload, download, and manage transfers; streams; bridge operations, reports, analytics. |
| StreamUser | user:stream | Stream and manage their streams only. |
| UploadUser | user:upload | Upload and manage their uploads; transfer requests; no streaming. |
| OrgUser | user:org | Basic user access plus Drive, policies, partners, projects, identities. |
| OrgUserAdmin | admin:org-user | Delete user accounts; invite and manage org users. |
| RoleAdmin | admin:role | Manage roles assigned to users in the organization. |
| SecurityAnalyst | admin:security | View security reports (org events, transfers). |
| NetworkAdmin | admin:network | Manage network rules. |
| DataCustodian | data:custodian | Generate chain-of-custody reports. |
| TransferAdmin | admin:transfer | Manage transfer org lock and lock-to-org. |
| FileRequestedUser | anonymous:transfer:file-requested | Anonymous upload for transfer requests. |
| ServiceAccountAdmin | admin:service-account | Create and manage service accounts (API keys). |
| AgentIdentityAdmin | admin:agent-identity | Create, update, delete, and rotate API keys for agent identities. |
| AuditLogStreamer | audit:streamer | View user and organization audit logs. |

---

## See also

- [Managing your organization](/docs/guides/managing-your-organization/)
  — How to assign roles to users
- [Writing policies](/docs/guides/writing-policies/) — Object-level
  policies (evaluated after RBAC)
- Source of truth for routes: `internal/rbac/unified_permissions.go`
  in the stellarbridge-app repository
