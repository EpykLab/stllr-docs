---
title: File Streaming
---

### Layer 1 — Fundamentals (What and Why)

- What is file streaming?
  - Streaming lets you send files directly from one location to another without first staging or re-uploading the full file to a central server. It's optimized for large files and unreliable networks.
- Why use it?
  - Reliability: transfers resume automatically after interruptions (power, network, laptop sleep).
  - Speed: peer-to-peer where possible; parallel chunks; optional relay fallback.
  - Security: end-to-end encrypted paths; access controlled by your organization's roles and policies.
  - Control: you decide who can send, receive, and approve transfers.
- When to use streaming vs. a simple upload
  - Use streaming for large files, multi-site transfers, edge/remote locations, or when transfers must resume automatically.
  - Use a simple upload for small, one-off files that don’t need
    advanced controls. See [File uploads](/docs/moving-files/uploading-files/).
- Key terms (plain language)
  - Stream: a secure connection used to send files between two endpoints.
  - Sender/Source: where the file originates.
  - Receiver/Destination: where the file is delivered.
  - Relay: a stellarbridge service that helps when peers cannot connect directly (e.g., strict firewalls/NAT).
  - Policy: rules that decide who can start a stream, which data is allowed, and any approvals required.

**Note:** For step-by-step send/receive instructions, see [Transfer a
file](/docs/guides/transfer/).

---

### Layer 2 — How it works in practice (User view)

This section explains the typical flow you'll see in the portal.

1. Prerequisites

- You have permission to create a stream. If not, contact an admin.
- The destination (person, team, or site) is visible to you in the portal.

2. Start a stream

- Choose Stream a file in the portal.
- Select the destination and pick the file/folder.
- Optional: set notes, labels, or retention if your organization uses them.
- Start. The transfer begins immediately or waits for required approvals.

3. During transfer

- Peer-to-peer first: stellarbridge tries to connect endpoints directly for best performance.
- Automatic resume: if your connection drops or the device sleeps, the portal resumes from where it left off.
- Integrity checks: chunks are verified to ensure the destination receives an exact copy.
- Bandwidth awareness: transfers adapt to available bandwidth; admins may set limits.

4. Completion and receipt

- You and the destination can see status and a receipt in the portal (time, size, who sent/received).
- If retention or clean-up settings are applied, the portal will follow those after completion.

Common scenarios you can rely on

- Large media or scientific data sets between sites.
- Overnight transfers on unstable links; the stream will resume in the morning.
- Edge devices sending logs or captures back to HQ without babysitting.

Limitations to keep in mind

- Extremely restrictive firewalls may require a relay. stellarbridge provides the relay as part of the service.
- Your organization's policies may require approvals or restrict destinations.

---

### Layer 3 — Administration and advanced options (Admin view)

Network and connectivity

- NAT traversal: the system attempts direct peer-to-peer using standard techniques. If blocked, it falls back to a relay.

Admin requirements by deployment

| Admin action                                 | Self-hosted | Cloud-hosted | Notes                                                                                  |
| -------------------------------------------- | ----------- | ------------ | -------------------------------------------------------------------------------------- |
| Configure roles/permissions for streaming    | Yes         | Yes          | Control who can initiate/approve streams.                                              |
| Approvals and policy enforcement             | Yes         | Yes          | As required by your org.                                                               |
| Enable/operate streaming relay               | Yes         | Managed      | Cloud provides managed relay when needed.                                              |
| Configure firewall/NAT rules                 | Yes         | Managed      | Self-hosted may need egress/ingress allowances; cloud relays are reachable over HTTPS. |
| Enforce HTTPS/TLS at the edge                | Yes         | Managed      | TLS termination at ingress/load balancer.                                              |
| Set bandwidth caps/schedules                 | Yes         | Yes          | Avoid saturation; may be org-wide or per site.                                         |
| Monitor streaming health/metrics             | Yes         | Yes          | Monitor active streams, failures, retries.                                             |
| Configure retention/clean-up at destinations | Yes         | Yes          | Ensures compliant handling after delivery.                                             |

Security and compliance

- Encryption: data is encrypted in transit.
- Access: manage who can start streams via roles and permissions.
- Audit trail: transfer logs (who, what, when, where) are available for review and export.
- Data handling: configure retention and automatic clean-up at destination if required by policy.

Operations and troubleshooting

- Monitoring: watch active streams, completion rates, failures, and retry counts in the portal.
- Health checks: verify endpoints are online and authenticated; confirm relay availability if used.
- Common fixes:
  - If a stream doesn't start, check permissions and policy blocks.
  - If performance is poor, review firewall/relay usage and bandwidth limits.
  - If transfers pause frequently, inspect local power/sleep settings and network stability.

Disaster recovery considerations

- Streams will resume after service restarts or temporary outages.

---

### Use cases

- Remote site backup to HQ data store without a VPN.
- Media production teams sending dailies between offices overnight.
- Field engineers pushing large logs and telemetry from constrained networks.
- Cross-border transfers with enforced approvals and audit trail.

---

### Related resources

- [Transfer a file](/docs/guides/transfer/) — step-by-step send/receive
- [File uploads](/docs/moving-files/uploading-files/) — when streaming
  isn’t necessary
- [RBAC](/docs/security/rbac/) — roles and permissions for streams
- Need help? Contact support: Contact support
