---
title: File Uploads
---

### Layer 1 — Fundamentals (What and Why)

- What is a file upload?
  - An upload sends a file from your device to a destination managed by your organization (a person, team, project folder, or an intake "inbox"). It's simple and familiar: pick a file and send it.
- Why use uploads?
  - Simplicity: best for small to medium files and one-off deliveries.
  - Compatibility: works from any modern browser with no extra setup.
  - Governance: optionally routes files through organization policies (approvals, retention, virus scanning, labeling).
  - Security: encrypted in transit; access controlled by roles and permissions.
- When to use uploads vs. streaming
  - Use uploads for quick, occasional transfers or governed intake into a central destination.
  - Use streaming for large files, unstable networks, or site-to-site transfers that must automatically resume. See File streaming.
- Key terms (plain language)
  - Upload: the action of sending a file from your device into stellarbridge.
  - Uploader: the person who initiates the upload.
  - Destination/Inbox: where the file lands (person, team, project folder, or intake mailbox).
  - Policy: rules your org sets for who can upload, what is allowed, and whether approvals are needed.
  - Retention: how long the file is kept before automatic clean-up.

**Note:** For very large files or unreliable networks, consider [file
streaming](/docs/moving-files/streaming-files/) instead.

---

### Layer 2 — How it works in practice (User view)

This section explains the typical upload flow you'll see in the portal.

1. Prerequisites

- You have permission to upload to the chosen destination. If not, contact an admin.
- The destination (person, team, project, or inbox) is visible to you in the portal.
- Check any size or type limits defined by your organization.

2. Start an upload

- Choose Upload a file in the portal.
- Select the destination (person/team/project/inbox).
- Pick your file(s) or folder. For many files, consider zipping before upload if preferred by your org.
- Optional: add notes, labels, or retention settings if your organization uses them.
- Start. If approvals are required, your upload will wait until approved.

3. During upload

- Progress: you'll see progress and estimated time remaining.
- Integrity checks: the portal verifies that the received file matches what you sent.
- Bandwidth awareness: uploads adapt to available bandwidth; admins may set limits.
- Security: data is encrypted in transit.

4. Completion and receipt

- You and the destination can view status and a receipt (time, size, who sent/received).
- If retention or clean-up is configured, the portal enforces it after completion.

Limitations to keep in mind

- Huge files and unstable networks are better handled by streaming.
- Browser timeouts or sleep can pause uploads; refresh only if the portal instructs you.
- Organizational policies may require approvals or restrict file types and destinations.

---

### Layer 3 — Administration and advanced options (Admin view)

Access and governance

- Roles and permissions: decide who can upload and to which destinations.
- Policies: enforce approvals, allowed file types, labeling, and destination restrictions.
- Retention and clean-up: set how long items are kept and whether they are auto-deleted or archived.

Admin requirements by deployment

| Admin action                                             | Self-hosted | Cloud-hosted         | Notes                                            |
| -------------------------------------------------------- | ----------- | -------------------- | ------------------------------------------------ |
| Configure roles and permissions for uploads              | Yes         | Yes                  | Govern who can upload and to which destinations. |
| Define upload policies (approvals, file types, labeling) | Yes         | Yes                  | Implement org-specific governance.               |
| Set retention and clean-up for destinations              | Yes         | Yes                  | Automatic deletion/archiving per policy.         |
| Enforce HTTPS/TLS at the edge                            | Yes         | Managed              | In cloud, TLS is managed at the ingress.         |
| Configure maximum upload size                            | Yes         | Yes                  | Per user/group or destination.                   |
| Configure bandwidth caps/schedules                       | Yes         | Yes                  | Avoid link saturation during business hours.     |
| Monitor storage capacity/quotas on target stores         | Yes         | Yes                  | Ensure adequate space for intake locations.      |
| Optional antivirus/DLP integrations                      | Optional    | Available on request | Depends on organization tooling and plan.        |

Security and compliance

- Transport security: uploads use encrypted connections.
- Audit trail: track who uploaded what, when, and where; export logs as needed.
- Optional controls: antivirus scanning or data loss prevention rules where applicable.

Operations and limits

- Size limits: configure maximum upload size per user/group or destination.
- Bandwidth limits: set caps to avoid saturating links during business hours.
- Storage monitoring: watch available space and quota usage on target stores.

Troubleshooting

- If an upload doesn't start, check permissions, size/type limits, or pending approvals.
- If performance is poor, review bandwidth caps and local network conditions.
- If uploads pause frequently, review device sleep settings and connectivity.

Disaster recovery considerations

- Brief service interruptions will not corrupt files; partial uploads can be retried.
- For unreliable links or very large payloads, guide users to File streaming.

---

### Use cases

- Intake of vendor or customer documents into a shared inbox with approvals.
- HR or Finance receiving sensitive documents with retention and audit trail.
- Project teams dropping assets into a central workspace from the browser.
- One-off handovers to a specific person or team without setting up a stream.

---

### Related resources

- [File streaming](/docs/moving-files/streaming-files/) — when uploads
  aren’t ideal (large files or unreliable networks)
- [RBAC](/docs/security/rbac/) — roles and permissions (who can upload
  and where)
- Need help? Contact support: Contact support
