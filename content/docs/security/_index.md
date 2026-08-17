---
title: Security
---

Role-based access control (RBAC) defines which API routes each role can
call. This section documents roles and route access; for exporting
audit logs, see the SIEM guide.

- [RBAC](/docs/security/rbac/) — Roles, route permissions, and how
  authorization works (reference)
- [Bridge transfers and Drive access control](/docs/security/bridge-vs-drive-access/) —
  How RBAC, tenancy, and resource policies apply to **bridge uploads** vs
  **Drive objects** (when folder/file policy runs)
- [Secure Viewer](/docs/security/secure-viewer/) — Beta Drive previews via
  server-side rendering and pixel streaming; scope, limits, and **`DRIVE_SECURE_VIEW`**

To export audit logs to a SIEM or consume them via API, see [Export
logs to SIEM](/docs/guides/security/). For a platform security
overview, see [Security at
stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/).
