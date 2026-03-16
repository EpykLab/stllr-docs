---
title: Role-based access control (RBAC)
---

This page explains how roles work in stellarbridge and what each role
can do. Exact API routes per role are defined in the codebase at
`internal/rbac/unified_permissions.go` and may change with releases.

## Authorization model: RBAC first, then policy

**RBAC is the primary authorization gate.** Every protected API request
is checked against route-level RBAC (path and HTTP method) before any
handler runs. If the user's role does not have permission for that
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

## All roles (complete list)

The following 20 roles have route permissions and can be assigned (or
assigned automatically) in stellarbridge. Each is described in the
sections below.

**End-user roles:** OrgUser, TransferUser, UploadUser, StreamUser,
DriveUser, PartnerUser.

**Admin roles:** GlobalAdmin, OrgUserAdmin, RoleAdmin, PolicyAdmin,
SurfaceAdmin, SecurityAnalyst, TransferAdmin, NetworkAdmin,
ServiceAccountAdmin, AgentIdentityAdmin.

**Read-only and special roles:** GlobalReader, DataCustodian,
AuditLogStreamer, FileRequestedUser.

---

## Roles at a glance

Use this table to see which role fits which job. Admins assign one or
more roles to users in the organization.

### End-user roles (daily use)

| Role | Best for | What they can do |
|------|----------|------------------|
| **OrgUser** | Standard org members | Upload and download files; use the Drive (list projects, partners; list/get policies and versions; notify on policy denial; list identities; objects list, create, get, update, delete, upload, download); view transfer history and org panel; accept org invites; security update. No policy/partner/identity/project create or delete, no protect/unprotect. |
| **TransferUser** | Users who need uploads, downloads, and streaming | Uploads, downloads, transfer requests, add transfer to Drive, streams (config, session, signal); transfer history; all bridge operations, reports, and analytics. No usage route, no Drive/policy/partner management. |
| **UploadUser** | Users who only upload (no streaming) | Upload files; manage their own uploads and transfers (protect, unprotect, delete); transfer requests and add transfers to Drive; transfer history. No usage route, no streaming, no Drive/policy/partner management. |
| **StreamUser** | Users who only stream | Stream only: get stream config and session, update stream config (signal). No uploads, no Drive, no transfer requests. |
| **DriveUser** | Internal users who use Drive only | Org panel and user info; transfer history; add transfer to Drive; full Drive object access (list, create folder, get, rename/move, delete, upload, download, create share); list partners and projects (read-only). No policy management on objects. |
| **PartnerUser** | Partner external identities | Create folder, delete folder, upload file, download file (objects list, create, get, upload-url, upload-complete, download-url, delete). No rename/move (PATCH), no policy attachment or policy routes on objects. |

### Admin roles

| Role | Best for | What they can do |
|------|----------|------------------|
| **GlobalAdmin** | Full platform control | Access to all API routes. Use sparingly. |
| **OrgUserAdmin** | User lifecycle in the org | Invite users to the organization; create and cancel organization invitations; list, add, and remove org users; delete user accounts. Cannot delete projects. |
| **RoleAdmin** | Assigning roles | List org roles; get, add, or remove roles for a user (by email). Cannot change org settings or manage content. |
| **PolicyAdmin** | Policy management | Full CRUD for policies: list, create, get, update, delete, versions, activate, export, import, evaluate, notify policy denial. |
| **SurfaceAdmin** | Partners and projects | Full CRUD for partners and projects: list, create, delete partners; list, create, update, revoke partner identities; list, create, update partners on projects, delete projects. |
| **SecurityAnalyst** | Read-only security view | View organization events and organization transfers. No write access. |
| **TransferAdmin** | Transfer governance | Set organization transfer lock status (POST/DELETE); toggle lock-to-org for transfers. |
| **NetworkAdmin** | Network restrictions | List, create, update, and delete network rules for the organization. |
| **ServiceAccountAdmin** | API keys / service accounts | List, get, add, revoke, rotate (one or all), and delete service accounts (API keys). |
| **AgentIdentityAdmin** | Agent identities | List, create, update, and delete agent identities; rotate agent API keys; list, add, and remove policy attachments on identities. |

### Read-only and special roles

| Role | Best for | What they can do |
|------|----------|------------------|
| **GlobalReader** | Read-only across the platform | GET-only: dashboard transfer history, org panel, user info, partners, policies (list/get/versions), identities, projects, objects, bridge upload info, transfer requests, networking list, org events/transfers, custody report, key-auth list/get, user event logs. No write access. |
| **DataCustodian** | Compliance / custody | Generate chain-of-custody reports for transfers. No other access. (Object-level lock/freeze may be added when endpoints exist.) |
| **AuditLogStreamer** | Viewing audit logs | View user event logs and organization audit logs. No other admin or content access. |
| **FileRequestedUser** | Anonymous recipients | Assigned automatically when someone uses a transfer-request upload link. Allows only the multipart-upload and URL-info routes needed to fulfill the request. Not assigned in the dashboard. |

---

## Role reference (summary)

Every role and its Casbin subject. Descriptions match the tables above.

| Role | Casbin subject | Description |
|------|----------------|-------------|
| **End-user roles** | | |
| OrgUser | user:org | Basic user access plus Drive (granular: list/get policies, notify denial, list identities/projects, object CRUD); no policy/partner/identity/project write. |
| TransferUser | user:bridge | Upload, download, and manage transfers; streams; bridge operations, reports, analytics. |
| UploadUser | user:upload | Upload and manage their uploads; transfer requests; no streaming. |
| StreamUser | user:stream | Stream and manage their streams only. |
| DriveUser | user:drive | Drive: browse, create folders, upload, download, rename/move, delete, add transfers to Drive; list partners and projects (read-only). |
| PartnerUser | user:partner | Partner-scoped Drive: create/delete folder, upload/download file; no rename/move or policy routes. |
| **Admin roles** | | |
| GlobalAdmin | admin | Access to everything. |
| OrgUserAdmin | admin:org-user | Delete user accounts; invite and manage org users; create and cancel organization invitations. |
| RoleAdmin | admin:role | Manage roles assigned to users in the organization. |
| PolicyAdmin | admin:policy | Full CRUD for policies. |
| SurfaceAdmin | admin:surface | Full CRUD for partners and projects. |
| SecurityAnalyst | admin:security | View security reports (org events, transfers). |
| TransferAdmin | admin:transfer | Manage transfer org lock and lock-to-org. |
| NetworkAdmin | admin:network | Manage network rules. |
| ServiceAccountAdmin | admin:service-account | Create and manage service accounts (API keys). |
| AgentIdentityAdmin | admin:agent-identity | Create, update, delete, and rotate API keys for agent identities. |
| **Read-only and special** | | |
| GlobalReader | reader:global | Read-only access across routes. |
| DataCustodian | data:custodian | Generate chain-of-custody reports. |
| AuditLogStreamer | audit:streamer | View user and organization audit logs. |
| FileRequestedUser | anonymous:transfer:file-requested | Anonymous upload for transfer requests (assigned automatically). |

---

## See also

- [Managing your organization](/docs/guides/managing-your-organization/)
  — How to assign roles to users
- [Writing policies](/docs/guides/writing-policies/) — Object-level
  policies (evaluated after RBAC)
- Source of truth for routes: `internal/rbac/unified_permissions.go`
  in the stellarbridge-app repository
