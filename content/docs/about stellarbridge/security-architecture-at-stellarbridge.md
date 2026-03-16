---
title: Security architecture at stellarbridge
---


This page provides a practical overview of how stellarbridge is built and how it protects your data in production. It is written for administrators and compliance/security teams. It focuses on what we do today, so you can map our controls into your own documentation and reviews.

***

### Technology stack (what we build with)

* Backend: Go (Golang) exclusively for the server and APIs.
* Frontend: Svelte for the web client.
* HTTP framework and middleware: Fiber (Go), with:
  * JWT-based authentication (cookie name: "stellarbridge").
  * Rate limiting on API routes (default \~30 requests per 15 seconds per client).
  * Cookie encryption for app cookies (the JWT cookie itself is HttpOnly and not encrypted, so the server can read it).
  * Redis-backed sessions for login/MFA challenges (in-memory fallback when Redis is not available).
* Structured logging with asynchronous writers to avoid blocking the request path.

Why it matters: A single, strongly typed backend (Go) and a lean frontend reduce runtime complexity and the attack surface.



_Golang code API sbom_

{% file src="../.gitbook/assets/stllr-app-sbom.json" %}

***

### Build and containerization model (attack surface reduction)

* Single self-contained executable
  * The application is compiled into one static binary that contains the HTTP server and required components.
  * Benefit: no language runtimes or package managers inside the image/container.
* Minimal base images
  * We target the minimal container image  Chainguard "static" image for production builds.
  * These images contain the app binary and the few files it needs to run—nothing else.
* No shell in containers
  * There is no interactive shell inside stellarbridge runtime containers. This removes an entire class of post-exploitation techniques that rely on spawning a shell.
* Read-only file systems
  * Runtime containers are configured to use a read-only root filesystem where supported in deployment (Kubernetes recommended). This prevents write-based persistence and significantly limits what an attacker can do even after a compromise.
* Non-root user
  * Containers are intended to run as a non-root user. Combine with Kubernetes PodSecurity or SecurityContext constraints.

Result: By shipping a single static binary in a minimal, read-only container without a shell, we eliminate many common container escape and lateral movement paths and simplify vulnerability management.

***

### Runtime: Kubernetes (how we run it securely)

stellarbridge is designed to run on Kubernetes (can run in other runtimes). Our controls include controls:

* TLS at the edge
  * Managed deployments terminate TLS at the ingress.&#x20;
* Namespaces and RBAC
  * We run stellarbridge in a dedicated namespace. We use Kubernetes RBAC to limit who can deploy, scale, or read secrets.
* Network policies
  * We apply NetworkPolicy to restrict pod ingress/egress to only what the app requires (e.g., database, Redis if used, ingress controller).
* Pod security and runtime restrictions
  * ReadOnlyRootFilesystem: true
  * runAsNonRoot: true
  * Drop unnecessary Linux capabilities; do not mount the Docker socket.
* Health probes and autoscaling
  * Liveness/readiness probes to ensure safe rollouts and restarts; use resource requests/limits and HPA as appropriate.
* Secrets management
  * Provide configuration and secrets via Kubernetes Secrets and environment variables. Scope secrets to the app namespace.

These controls complement the app’s own safeguards (JWT cookies, rate limits, encrypted cookies, centralized error handling, and async logging).

***

### Identity, sessions, and authorization (what the app enforces)

* Authentication
  * Email + password sign-in. Passwords are stored as secure hashes (bcrypt); plaintext passwords are never stored.
  * Optional MFA using TOTP.
  * New accounts complete email verification before full access is granted.
* Sessions and tokens
  * On successful login, the server issues a signed JWT stored in an HttpOnly cookie named "stellarbridge" with SameSite=Lax. Typical lifetime is up to 24 hours.
  * Short-lived server sessions are used for login/MFA challenges. When configured, Redis is used as the session store; otherwise, an in-memory store is used.
* Authorization
  * **RBAC is the primary gate:** role-based access control (RBAC) is enforced for API routes in middleware before any handler runs. If the user's role does not allow the route (path and method), the request is denied and no handler or policy logic runs.
  * **Resource-level policy runs after RBAC:** for routes that perform actions on specific resources (e.g. drive objects), the policy engine is evaluated only inside the handler, after route-level RBAC has already passed. So policies (object or identity-attached) never replace or run before RBAC; they add a second layer for resource-level allow/deny.

For more details, see [Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/) and [RBAC](/docs/security/rbac/).

***

### Data flow: uploads and streaming (how files move)

stellarbridge supports two primary ways to move files: uploads and streaming. Both are designed to minimize the handling of your content by stellarbridge services.

* Uploads (browser to destination)
  * Designed for simple, governed intake. Data travels over encrypted connections.
  * During the upload process, your files are not proxied through stellarbridge application servers. The app coordinates the transfer, access control, and receipts, but it does not terminate and re-upload your file payload through an app proxy.
* Streaming (endpoint to endpoint)
  * Optimized for large files and unreliable networks. The system attempts a direct peer-to-peer path first; if that is not possible, it can use a relay (using a TURN server).
  * Transfers are encrypted in transit. Integrity checks verify the destination receives an exact copy.
  * If a relay is required due to strict firewalls/NAT, the relay’s role is to forward encrypted chunks; it does not persist payload data.

Clear expectations:

* Your files are never proxied through stellarbridge’s application services during upload.
* For streaming, direct connections are preferred. If a relay is used, data remains encrypted in transit and the relay does not store payloads. This process is transperrant and the UI will inform users when a TURN server is being used to stream a file due to network or configuration limitations.

For user/admin workflows and controls, see: File uploads and File streaming.

***

### Logging, audit, and abuse protection

* Security-relevant events (e.g., login success/failure) are logged with timestamps and context (such as IP). Logs are written asynchronously by the app to improve reliability.
* Central error handling prevents sensitive details from being returned to clients while still capturing structured diagnostics in logs.
* Abuse protection: API routes are rate limited by default (approximately 30 requests per 15 seconds per client). Static assets are not rate limited.

Access to audit logs is provided at all subscription levels.

***

### Operational responsibilities (shared model)

* Administrators
  * Enforce HTTPS at the edge (ingress/load balancer) _**in self-hosted environments**_.
  * Assign least-privilege roles to users; require MFA for elevated accounts. Note that when a user is added to an organization, they are automatically given the [OrgUser](https://epyklab.gitbook.io/stellarbridge/documentation/security/rbac#orguser) role (see RBAC definition for this role). &#x20;
  * Keep Redis (if used) on trusted networks only _**in self-hosted environments**_.
  * Apply Kubernetes hardening: read-only root FS, runAsNonRoot, restricted capabilities, and NetworkPolicy if _**in self-hosted environments**_.

Admin requirements by deployment

| Admin action                                                           | Self-hosted | Cloud-hosted | Notes                                                     |
| ---------------------------------------------------------------------- | ----------- | ------------ | --------------------------------------------------------- |
| Enforce HTTPS/TLS at the edge                                          | Yes         | Managed      | TLS termination at ingress/load balancer.                 |
| Configure RBAC (roles/permissions)                                     | Yes         | Yes          | Least-privilege for uploads, streams, admin.              |
| Require MFA for privileged accounts                                    | Yes         | Yes          | Recommended security baseline.                            |
| Operate Redis for sessions (if enabled)                                | Yes         | Managed      | Keep Redis on trusted networks; optional feature.         |
| Apply Kubernetes hardening (ro root FS, non-root, caps, NetworkPolicy) | Yes         | Managed      | Cloud deployment includes these controls by default.      |
| Configure/monitor rate limits                                          | Yes         | Managed      | API limiter is enabled by default; adjust if self-hosted. |

* Users
  * Use unique passwords and enable MFA when available.
  * Sign out on shared devices.

***

### Third-party services and compliance

* Our current list of third-party processors: 3rd-party data processors
* SOC 2 posture: SOC 2

***

### Related resources

* Access controls: Permissions and RBAC
* Operations: [Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/)
* Transfers: File uploads, File streaming
* Need help? Contact support
