---
title: Security at stellarbridge
---

This page summarizes how stellarbridge secures access to the portal and
APIs today. It is written for users and administrators and describes
what we currently do in the product and managed deployments.

***

### How we secure access

* Authentication
  * Email and password sign‑in. Passwords are stored as secure hashes; we never store plaintext passwords.
  * Optional multi‑factor authentication (MFA) using time‑based one‑time passwords (TOTP).
  * New accounts use an email verification flow before full access is granted.
* Sessions and tokens
  * Signed JSON Web Token (JWT) is issued on login and kept in a cookie named "stellarbridge".
  * The JWT cookie is HttpOnly and set with SameSite=Lax. Typical lifetime is up to 24 hours.
  * We encrypt other application cookies at the framework level; the JWT cookie itself remains readable by the server but is not accessible to scripts in the browser.
  * Short‑lived server sessions are used for login/MFA challenges. When configured, we use Redis for session storage; otherwise the app falls back to in‑memory storage.
* Authorization
  * **RBAC is the primary gate:** role‑based access control (RBAC) is enforced across API routes before any handler runs. We seed sensible default roles, and administrators assign roles to users to govern which routes they can call. Resource‑level policies (e.g. on drive objects) are evaluated only after the request has passed route‑level RBAC; see [RBAC](/docs/security/rbac/) and [Writing
policies](/docs/guides/writing-policies/).

***

### Protecting data in transit

* Portal and APIs are served over HTTPS in our managed environments (TLS termination at the ingress).
* For self‑hosted deployments, we recommend enabling TLS at your ingress or load balancer.
* File actions initiated from the portal (uploads and streams) use encrypted connections. See the related topics for what to expect during transfers.

Related topics: [File uploads](/docs/moving-files/uploading-files/), [File
streaming](/docs/moving-files/streaming-files/)

***

### Abuse protection

* Rate limiting is enabled for API endpoints by default to reduce abuse and credential‑stuffing attempts. The current policy allows approximately 30 requests per 15 seconds per client for API routes (static assets are not limited).

***

### Logging and audit signals

* Security‑relevant events such as successful and failed sign‑ins are recorded with timestamps and basic context (e.g., IP address). Logs are written asynchronously for reliability.
* Application errors are handled centrally and recorded with structured fields to aid investigation without exposing sensitive data in responses.

If you need access to logs for your organization, contact support.

***

### Responsibilities and good practice

* Administrators
  * Use roles to restrict who can invite users, configure destinations, upload, or initiate streams.
  * Require MFA for accounts with elevated permissions.
  * If you self‑host, ensure HTTPS is enforced at the edge and keep Redis (if used) restricted to trusted networks.

Admin requirements by deployment

| Admin action                         | Self-hosted | Cloud-hosted | Notes                                        |
| ------------------------------------ | ----------- | ------------ | -------------------------------------------- |
| Enforce HTTPS/TLS at the edge        | Yes         | Managed      | TLS termination at ingress/load balancer.    |
| Configure roles and permissions      | Yes         | Yes          | Govern access for invites, uploads, streams. |
| Require MFA for privileged accounts  | Yes         | Yes          | Recommended security baseline.               |
| Manage Redis session store (if used) | Yes         | Managed      | Keep self-hosted Redis on trusted networks.  |
| Review audit logs on request         | Yes         | Yes          | Access available via support as needed.      |

* Users
  * Keep your password unique and enable MFA when offered.
  * Sign out on shared devices.

***

### Third‑party services and compliance

* Third‑party processors we rely on are listed here: 3rd‑party data processors.
* Our current SOC 2 posture and plans are tracked here: SOC 2.

***

### Related resources

- [RBAC](/docs/security/rbac/)
- [Transfer a file](/docs/guides/transfer/) (upload and stream steps)
- [File uploads](/docs/moving-files/uploading-files/), [File
  streaming](/docs/moving-files/streaming-files/)
- [Third-party processors](/docs/privacy/3rd-party-processors/)
- Need help? Contact support
