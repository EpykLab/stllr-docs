---
title: About stellarbridge
---

stellarbridge was built for the reality that regulated organizations
face today: sensitive data moving across organizational boundaries
under the weight of compliance requirements, audit obligations, and
real liability. The platform is purpose-built for that environment —
with policy-first controls, chain-of-custody audit trails, and
deployment flexibility for demanding security programs.

We serve teams in defense, healthcare, government, and critical
infrastructure, where the cost of getting data governance wrong is
measured in fines, lost contracts, and damaged trust. stellarbridge
gives compliance and security teams visibility and control over how
data moves, so they can meet their obligations and prove it.

You may see **stllr** used as internal shorthand for stellarbridge.

## Who it’s for

- **End users** — Send and receive files, use the Drive, and work with
  shared links.
- **AI agents** — Access objects and data for context, or to send and
  receive from other workflows.
- **Admins** — Configure organizations, policies, roles, and access.
- **Compliance and security** — Audit trails, export logs, and
  compliance evidence.

## What is stellarbridge?

stellarbridge is a governance and transfer platform for sensitive data.
It lets users and organizations move files across boundaries — between
teams, partners, and locations — with policy enforcement, audit trails,
and the deployment options (cloud or self-hosted) that regulated
environments require.

We are building toward a control plane for how data moves as more of
that movement is initiated by AI systems and automated workflows.
stellarbridge is focused on giving compliance and security teams the
same visibility and control over machine-driven data flows that they
expect over human-driven ones — the proof layer that governance didn’t
break when the agents showed up.

## Core concepts

**Moving data**

- [File uploads](/docs/moving-files/uploading-files/) — Send files to a
  destination (person, team, folder) for quick or governed transfers.
- [File streaming](/docs/moving-files/streaming-files/) — Send large
  files with resume support; better for unreliable networks.
- [Transfers](/docs/guides/transfer/) — A transfer is an upload or
  stream instance; you can protect it, lock it to the org, or generate
  a custody report.
- [Transfer requests](/docs/guides/transfer/) — Create a request and
  share an upload link; the recipient uploads without logging in.
- [Public links](/docs/guides/public-links/) — Recipients use links to
  download (transfer or drive share) or upload (to fulfill a request);
  no account required.

**Drive and structure**

- **Drive** — Where governed files and folders live. You browse by
  [project](/docs/guides/drive/), upload and download, attach policies,
  and generate custody reports. See [Using the
  Drive](/docs/guides/drive/).
- **Projects** — Top-level containers in the Drive; often aligned to
  partners or internal teams.
- **Partners** — External organizations or parties you share with or
  receive from; policies and projects can be scoped by partner.

**Governance**

- [Policies](/docs/guides/writing-policies/) — Access policies (YAML or
  JSON) define who can do what on drive objects: list, download, send,
  delete, share, and more. Effects are ALLOW, DENY, or GATE (require
  admin approval).
- [Roles (RBAC)](/docs/security/rbac/) — Role-based access control
  decides which API routes and dashboard areas a user can use. Policies
  apply only after the user has passed RBAC.
- **Identities** — Users (UPN), API keys (API), and agents (AGENT) are
  identities; policies match on identity type, email, or group.
- **Groups** — Named sets of identities used in policies (e.g.
  “readers”, “editors”) so you don’t list individuals.

**Organization and access**

- **Organization** — Your tenant: users, invites, org settings (SAML,
  password rules, lock-to-org), and audit scope. See [Managing your
  organization](/docs/guides/managing-your-organization/).
- [Gate](/docs/guides/gate-approval/) — When a policy uses the GATE
  effect, an admin must approve the action (e.g. via a one-time link in
  email) before it proceeds.

**Audit and compliance**

- [Audit logging](/docs/about-stellarbridge/audit-logging/) —
  Security-relevant events (auth, transfers) are recorded; you can view
  them in the dashboard or [export to a
  SIEM](/docs/guides/security/). Chain-of-custody reports are available
  for transfers and Drive objects.

## Next steps

- **New to the product?** Start with [Moving
  files](/docs/moving-files/) to choose between uploads and streaming;
  then use [Guides](/docs/guides/) for step-by-step tasks.
- **Admin?** See [Managing your
  organization](/docs/guides/managing-your-organization/), [Managing
  policies](/docs/guides/managing-policies/), and
  [Security (RBAC)](/docs/security/rbac/).
- **Compliance or security?** See [Compliance](/docs/compliance/),
  [Audit logging](/docs/about-stellarbridge/audit-logging/), and
  [Trust Portal](/docs/trust-portal/).

---

## Platform overview, security, and legal

- [Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/)
  — How access and data are secured
- [Security
  architecture](/docs/about-stellarbridge/security-architecture-at-stellarbridge/)
  — Technology stack and runtime security
- [Compliance at
  stellarbridge](/docs/about-stellarbridge/compliance-at-stellarbridge/)
  — Build, container, and deployment controls
- [Audit logging](/docs/about-stellarbridge/audit-logging/) — What is
  logged and how to access it
- [Terms of service](/docs/about-stellarbridge/terms-of-service/) —
  Legal terms for using the service
