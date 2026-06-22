---
title: Reference
description: Auto-generated and lookup tables for RBAC roles and audit log codes.
weight: 90
tags: [reference]
---

These pages are generated from the stellarbridge application source
code. Regenerate them with `task docs:sync` in the stllr repository
after adding or changing roles, audit actions, or result codes.

## Pages

- [Roles reference](/docs/reference/roles-reference/) — every role,
  Casbin subject, and allowed API route
- [Audit action codes](/docs/reference/audit-action-codes/) — what
  happened (action code lookup)
- [Audit result codes](/docs/reference/audit-result-codes/) — outcome
  of an action (result code lookup)
- [Audit targets and actors](/docs/reference/audit-targets-and-actors/)
  — log field constants for targets and actors

## Related guides

- [Role-based access control (RBAC)](/docs/security/rbac/) — narrative
  overview of roles and authorization
- [Audit logging](/docs/about-stellarbridge/audit-logging/) — how audit
  logging works in practice
- [Security (SIEM export)](/docs/guides/security/) — programmatic
  audit log export
