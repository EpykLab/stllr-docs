---
title: Audit logging
---

This page explains how stellarbridge records security‑relevant activity and how administrators can access and manage audit information.

***

### Layer 1 — Fundamentals (What and Why)

* What is audit logging in stellarbridge?
  * Audit logging is the recording of security‑relevant events in a structured, tamper‑resistant way. Today this includes authentication outcomes (sign‑in success/failure) and transfer receipts (who sent/received a file, when, size, status).
* Why it matters
  * Compliance: demonstrate who did what, when, and from where.
  * Investigations: reconstruct timelines quickly using consistent timestamps.
  * Operations: monitor access patterns and transfer activity.
* Where logs live
  * Application audit events are written asynchronously to the application database for durability.
  * HTTP access logs (request method/path/status/latency) are emitted to stdout/stderr in JSON format for your log collector.
* Security and privacy
  * Timestamps are recorded in UTC.
  * We do not log plaintext passwords or MFA secrets; sensitive error details are not returned to clients.
  * File contents are never stored in audit logs; only metadata such as who, what, when, size, and status.

**Note:** For step-by-step transfer instructions, see [Transfer a
file](/docs/guides/transfer/). For concepts, see [File
uploads](/docs/moving-files/uploading-files/) and [File
streaming](/docs/moving-files/streaming-files/).

***

### Layer 2 — How it works in practice (User/Admin view)

* For users
  * You can see receipts for your uploads and streams in the portal: when an action is started/completed, size, and destination, subject to your organization’s policies.
* For administrators
  * Cloud‑hosted: organization audit data is retained by stellarbridge and available on request. See Contact support.
  * Self‑hosted: audit entries are stored in your application database, and HTTP access logs are sent to stdout; use your tooling (backup, export, or ship to a log system) to retain and analyze them.
* Exports
  * Cloud‑hosted: request a CSV/JSON export from support.
  * Self‑hosted: export from your database or forward stdout logs to your SIEM/log platform.
* Retention
  * Cloud‑hosted: retention is managed by stellarbridge according to our operational policy; contact support for current retention windows.
  * Self‑hosted: you control retention and backups at the database/log platform level.

Cloud API for organization events (cloud-hosted)

* Endpoint: GET /api/v1/dashboard/organization/get-events-in-org
* Authentication: requires a valid browser session with the JWT cookie named "stellarbridge". Use an authenticated session, or programmatically authenticate first via the login endpoint to obtain the cookie.
* Response: JSON payload in the form { "data": \[ event, ... ] } where each event follows our LogWrapper structure (time, level, msg, and message{ timestamp, actor, action, target, result{ title, description, code }, remote{ ip, port }, sender{ file, email }, extra, org }).
* Example (curl):
  * Using an existing session cookie curl -s -H 'Cookie: stellarbridge=YOUR\_JWT\_COOKIE'\
    https://your-tenant.stellarbridge.app/api/v1/dashboard/organization/get-events-in-org | jq
* Notes: API rate limits apply by default (\~30 requests per 15 seconds per client). Results can be large; paginate client-side by fetching periodically and storing checkpoints on your side.

***

### Layer 3 — Administration and advanced options (Admin view)

What gets captured today

* Authentication events: login success and failed login attempts, including timestamp and client IP.
* Transfer receipts: completed upload and streaming actions with who initiated, target/destination, size, status, and timestamps.
* Error signals: application errors are logged with structured fields (without leaking secrets) to aid investigation.

Access and governance

* Use roles and permissions to limit who can view transfer receipts and
  admin areas. See [RBAC](/docs/security/rbac/).
* For cloud‑hosted orgs, restrict who in your team is authorized to request exports from support.
* For self‑hosted, restrict database access to trusted administrators; treat audit tables as sensitive data.

Recommended practices (self‑hosted)

* Time synchronization: ensure your cluster nodes use NTP and log in UTC for consistent correlation.
* Backups: include audit tables in your routine database backups.
* Log shipping: forward stdout JSON logs from your Kubernetes pods or process manager to your SIEM (e.g., via Fluent Bit, Vector, or similar).
* Least privilege: only grant audit database access to designated security/ops personnel.

Admin requirements by deployment

| Admin action                           | Self-hosted | Cloud-hosted | Notes                                                                                                                              |
| -------------------------------------- | ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Enforce HTTPS/TLS at the edge          | Yes         | Managed      | Protects audit endpoints and portal access.                                                                                        |
| Decide audit log retention and backups | Yes         | Managed      | DB retention and backups under your control if self‑hosted.                                                                        |
| Control who can view receipts/exports  | Yes         | Yes          | Govern via roles and internal process.                                                                                             |
| Export or request audit logs           | Yes         | Yes          | Self‑hosted: export from DB/ship stdout; Cloud: use API (/api/v1/dashboard/organization/get-events-in-org) or request via support. |
| Time sync (NTP, UTC) across nodes      | Yes         | Managed      | Ensures consistent timestamps for correlation.                                                                                     |
| Monitor storage usage for audit data   | Yes         | Managed      | Prevents DB growth from impacting operations.                                                                                      |

Troubleshooting

* Missing login entries: confirm you are searching by UTC timestamps and the correct user email; check that the app can reach its database.
* No stdout access logs: ensure your deployment collects container stdout/stderr and that rate limiting is not suppressing logs.
* Gaps in transfer receipts: verify the transfer completed; drafts or aborted actions may not generate a completion record.

***

### Related resources

- [Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/)
- [Security architecture](/docs/about-stellarbridge/security-architecture-at-stellarbridge/)
- [RBAC](/docs/security/rbac/)
- [File uploads](/docs/moving-files/uploading-files/), [File
  streaming](/docs/moving-files/streaming-files/)
- Need help? Contact support


