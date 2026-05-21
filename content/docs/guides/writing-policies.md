---
title: Writing Policies
---

# Writing Access Policies

**Goal:** Write access policies for stellarbridge objects (files and
folders) using YAML or JSON. You will learn the document structure,
subject types, actions, effects, and see over 20 examples.

Policies control who can perform which actions on objects in your drive.
This guide explains how to author policy documents; for creating,
versioning, and activating policies in the dashboard, see [Managing
policies](/docs/guides/managing-policies/).

## Overview

Access policies are YAML or JSON documents that define allow/deny rules
for object operations and, where configured, for **bridge** operations
(transfer share, etc.). **Policy evaluation runs only after route-level
RBAC:** the user must already have permission to call the API route; then
the policy engine evaluates the relevant **effective** policy set.

For **Drive** paths, the engine uses policies attached to the **object**
and its **ancestor folders**. For **bridge** paths, the engine merges
**organization-scoped** attachments with **identity-scoped** attachments
(organization rules first, then identity). DENY overrides ALLOW; if no
statement matches, the action is denied. See [RBAC](/docs/security/rbac/)
for how roles and route-level access work, and [Bridge transfers and Drive
access control](/docs/security/bridge-vs-drive-access/) for the split
between bridge and Drive.

**Policy lifecycle:**

1. Create a policy in the dashboard under the **organization catalog** or a
   **partner catalog** (see [Managing policies](/docs/guides/managing-policies/))
2. Add versions (each version is a policy document)
3. Activate a version
4. Attach the policy where it applies: **Drive** objects (folders or files)
   for object-scoped policies, or **organization / identity** attachments
   per product rules (see [Managing policies](/docs/guides/managing-policies/))

## Document Structure

Every policy document has:

| Field        | Required | Description                                                                                                                                                                               |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scope`      | Yes      | `OBJECT` for Drive object policies. `IDENTITY` when the **AccessPolicy** record is identity-scoped (including the **bridge default** policy). Must match the policy row in the dashboard. |
| `statements` | Yes      | Array of one or more statements                                                                                                                                                           |

Each statement has:

| Field      | Required | Description                                              |
| ---------- | -------- | -------------------------------------------------------- |
| `sid`      | Yes      | Unique identifier (e.g. `allow-download`, `deny-delete`) |
| `effect`   | Yes      | `ALLOW`, `DENY`, or `GATE`                               |
| `subjects` | Yes      | Who the statement applies to (via `principal_srns`)      |
| `actions`  | Yes      | Array of action strings the statement applies to         |

## Subjects

Subjects define _who_ the statement matches through **principal SRNs**
(Stellar Resource Names). Each statement's `subjects` block must
contain `principal_srns` with at least one entry. Matching is OR: if
the identity matches any principal SRN, the statement applies.

| Subject field    | Type                 | Description                                                                                                 |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `principal_srns` | `["*"]` or SRN array | Array of IAM SRN strings. Use `"*"` to match any identity. Use specific SRNs to match identities or groups. |

### SRN format

Principal SRNs follow the format:

```
stllr:iam:{type}:{hash}:{name}
```

| Component | Description                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `stllr`   | Root prefix (always `stllr`)                                                                         |
| `iam`     | Resource group (always `iam`)                                                                        |
| `{type}`  | Resource type: `upn` (user), `api` (API key), `agent` (agent), `group` (group), `user` (user entity) |
| `{hash}`  | 32-character hex hash (globally unique)                                                              |
| `{name}`  | Human-readable name or email                                                                         |

**Examples:**

- `stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:alice@example.com` — a UPN identity
- `stllr:iam:api:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:service-account` — an API key identity
- `stllr:iam:agent:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:backup-agent` — an agent identity
- `stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:readers` — a group

**To match everyone:** use `principal_srns: ["*"]`.

**Finding SRNs:** Use the dashboard or API to look up the SRN for an
identity or group before authoring a policy. SRNs are stable and
globally unique.

### Deprecated fields

The older subject fields (`identity_types`, `identity_emails`,
`group_names`, `groups`, `identities`) are deprecated. They are
silently ignored by the policy engine and no longer affect matching.
Migrate existing policies to `principal_srns`.

## Actions

Valid actions for OBJECT scope:

| Action                          | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `DRIVE_SEND`                    | Send/upload into folder                     |
| `DRIVE_RECEIVE`                 | Receive into folder                         |
| `DRIVE_DELETE`                  | Delete object                               |
| `DRIVE_DOWNLOAD`                | Download file                               |
| `DRIVE_STREAM`                  | Stream file                                 |
| `DRIVE_LOCK`                    | Lock object                                 |
| `DRIVE_FREEZE`                  | Freeze object                               |
| `DRIVE_CHANGE_ACCESS`           | Change policy attachments, view attachments |
| `DRIVE_RENAME`                  | Rename object                               |
| `DRIVE_MOVE`                    | Move object                                 |
| `DRIVE_COPY`                    | Copy object                                 |
| `DRIVE_SHARE`                   | Share a Drive file (email recipient)        |
| `DRIVE_SHARE_REVOKE`            | Revoke a Drive share                        |
| `DRIVE_LIST_CHILDREN`           | List folder contents, create children       |
| `DRIVE_SECURE_VIEW`<sub>β</sub> | View file using the secure viewer feature   |

### Bridge actions

**IDENTITY-scoped policy documents.** Use these in policies evaluated on
**bridge** flows (not on a Drive `object_id`). The document **`scope`**
must match the **AccessPolicy** row (for the seeded **bridge default**,
that is **`IDENTITY`**). Effective rules combine **organization**
attachments first, then **identity** attachments.

The **Stellarbridge bridge (default)** policy is seeded with **version 1**
equivalent to the example below (ALLOW **`TRANSFER_SEND`**, **`TRANSFER_SHARE`**,
**`TRANSFER_DELETE`**, **`TRANSFER_LOCK`**, **`TRANSFER_READ`**, and
**`TRANSFER_STREAM`** for all identities).

| Action            | Description                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `TRANSFER_SEND`   | Create or send a bridge transfer (e.g. multipart upload, transfer request)                                                        |
| `TRANSFER_SHARE`  | Share a **transfer** with a recipient (e.g. email the transfer download flow). Not the same as **`DRIVE_SHARE`** on a Drive file. |
| `TRANSFER_DELETE` | Delete a bridge transfer or transfer request                                                                                      |
| `TRANSFER_LOCK`   | Lock, protect, or apply org lock on bridge transfers                                                                              |
| `TRANSFER_READ`   | List or view transfer metadata (e.g. API **GET /transfers**, transfer request lookup)                                             |
| `TRANSFER_STREAM` | Stream a bridge transfer (used by streaming flows)                                                                                |

Example (matches the seeded bridge default):

```yaml
scope: IDENTITY
statements:
  - sid: bridge_default_allow
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - TRANSFER_SEND
      - TRANSFER_SHARE
      - TRANSFER_DELETE
      - TRANSFER_LOCK
      - TRANSFER_READ
      - TRANSFER_STREAM
```

### Migrating from legacy action names

Stored policy versions may still list **unprefixed** verbs (`DOWNLOAD`,
`LIST_CHILDREN`, …) or **`SHARE_LINK_*`**. Those names are **deprecated**:
use **`DRIVE_*`** for **OBJECT** scope (Drive / VFS) and **`TRANSFER_*`** for
**IDENTITY** bridge policies. Edit the document, create a **new version**,
validate, then **activate** it (and update attachments if needed).

## Effects

- **ALLOW** – Permit the action
- **DENY** – Block the action (takes precedence over ALLOW)
- **GATE** – Require admin approval before action proceeds. In v1,
  only **`DRIVE_SHARE`** and **`TRANSFER_SHARE`** automatically replay
  after approval; other gated actions require manual retry.

## Examples

### 1. Allow all for everyone

Permit all actions for all identities.

```yaml
scope: OBJECT
statements:
  - sid: allow-all
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
      - DRIVE_LOCK
      - DRIVE_FREEZE
      - DRIVE_CHANGE_ACCESS
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
      - DRIVE_SHARE
      - DRIVE_SHARE_REVOKE
      - DRIVE_LIST_CHILDREN
```

### 2. Allow downloads only for a specific user

Only the listed user can download.

```yaml
scope: OBJECT
statements:
  - sid: allow-download-owner
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:owner@example.com
    actions:
      - DRIVE_DOWNLOAD
```

### 3. Allow list and download for a group

Members of `readers` can list children and download.

```yaml
scope: OBJECT
statements:
  - sid: allow-readers
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:readers
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
```

### 4. Deny delete for everyone

Block delete for all identities.

```yaml
scope: OBJECT
statements:
  - sid: deny-delete
    effect: DENY
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_DELETE
```

### 5. Allow uploads for a specific API key

Only a specific API key can send/upload.

```yaml
scope: OBJECT
statements:
  - sid: allow-api-upload
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:api:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:service-account
    actions:
      - DRIVE_SEND
      - DRIVE_LIST_CHILDREN
```

### 6. Allow a specific user but deny a specific API key

A specific user can read; a specific API key cannot.

```yaml
scope: OBJECT
statements:
  - sid: allow-user
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:alice@example.com
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
  - sid: deny-api
    effect: DENY
    subjects:
      principal_srns:
        - stllr:iam:api:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:service-account
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
```

### 7. Multiple users with full access

Several users get full access.

```yaml
scope: OBJECT
statements:
  - sid: allow-team
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:alice@example.com
        - stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:bob@example.com
        - stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:carol@example.com
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
      - DRIVE_CHANGE_ACCESS
```

### 8. View-only for external partners

Group `external-partners` can only list and download.

```yaml
scope: OBJECT
statements:
  - sid: allow-partners-read
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:external-partners
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
```

### 9. Editors can modify, others read-only

`editors` get write access; `viewers` get read-only.

```yaml
scope: OBJECT
statements:
  - sid: allow-editors
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:editors
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
      - DRIVE_CHANGE_ACCESS
  - sid: allow-viewers
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:viewers
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
```

### 10. Block share links for confidential data

Allow read/write but forbid share link creation.

```yaml
scope: OBJECT
statements:
  - sid: allow-ops
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
      - DRIVE_CHANGE_ACCESS
  - sid: deny-share-links
    effect: DENY
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SHARE
      - DRIVE_SHARE_REVOKE
```

### 11. Risk approvers download only

Only `risk-approvers` can download (e.g. for compliance review).

```yaml
scope: OBJECT
statements:
  - sid: allow-risk-approvers-download
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:risk-approvers
    actions:
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
      - DRIVE_LIST_CHILDREN
```

### 12. Admin-only policy management

Only `admins` can change policy attachments.

```yaml
scope: OBJECT
statements:
  - sid: allow-all-read-write
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
  - sid: allow-admins-access-control
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:admins
    actions:
      - DRIVE_CHANGE_ACCESS
```

### 13. Lock and freeze restricted to custodians

Only `data-custodians` can lock or freeze objects.

```yaml
scope: OBJECT
statements:
  - sid: allow-custodians-lock-freeze
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:data-custodians
    actions:
      - DRIVE_LOCK
      - DRIVE_FREEZE
  - sid: allow-others-normal
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
      - DRIVE_CHANGE_ACCESS
```

### 14. Deny move and rename for shared folder

Allow read/write but block structural changes.

```yaml
scope: OBJECT
statements:
  - sid: allow-ops
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
      - DRIVE_COPY
      - DRIVE_CHANGE_ACCESS
  - sid: deny-structure
    effect: DENY
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_RENAME
      - DRIVE_MOVE
```

### 15. Allow copy but not delete

Users can copy files out but cannot delete originals.

```yaml
scope: OBJECT
statements:
  - sid: allow-copy-download
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
      - DRIVE_COPY
      - DRIVE_LIST_CHILDREN
  - sid: deny-delete
    effect: DENY
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_DELETE
```

### 16. A specific agent can only receive

A specific agent can only receive (upload) into the folder.

```yaml
scope: OBJECT
statements:
  - sid: allow-agents-receive
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:agent:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:upload-agent
    actions:
      - DRIVE_RECEIVE
      - DRIVE_LIST_CHILDREN
```

### 17. Audit-readers view-only with stream

Audit group gets list, download, and stream for compliance review.

```yaml
scope: OBJECT
statements:
  - sid: allow-audit-read
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:audit-readers
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
```

### 18. Contractors limited upload and list

Contractors can upload and list but not download, delete, or change access.

```yaml
scope: OBJECT
statements:
  - sid: allow-contractors-upload
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:contractors
    actions:
      - DRIVE_SEND
      - DRIVE_LIST_CHILDREN
```

### 19. Finance team full access, others denied

Only `finance-team` gets any access; everyone else is implicitly denied.

```yaml
scope: OBJECT
statements:
  - sid: allow-finance
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:finance-team
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DELETE
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
      - DRIVE_LOCK
      - DRIVE_FREEZE
      - DRIVE_CHANGE_ACCESS
      - DRIVE_RENAME
      - DRIVE_MOVE
      - DRIVE_COPY
      - DRIVE_SHARE
      - DRIVE_SHARE_REVOKE
      - DRIVE_LIST_CHILDREN
```

### 20. Read-only audit trail folder

Strict read-only: only list, download, stream. No writes or structural changes.

```yaml
scope: OBJECT
statements:
  - sid: allow-audit-read-only
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:auditors
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:compliance-officers
    actions:
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
      - DRIVE_STREAM
```

### 21. Mixed: specific user and a group

Allow both a specific user and a specific group.

```yaml
scope: OBJECT
statements:
  - sid: allow-users-and-sync-group
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:alice@example.com
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:sync-service
    actions:
      - DRIVE_SEND
      - DRIVE_RECEIVE
      - DRIVE_DOWNLOAD
      - DRIVE_LIST_CHILDREN
```

### 22. Revoke share links only for admins

Everyone can create share links; only admins can revoke them.

```yaml
scope: OBJECT
statements:
  - sid: allow-all-create-link
    effect: ALLOW
    subjects:
      principal_srns:
        - "*"
    actions:
      - DRIVE_SHARE
      - DRIVE_LIST_CHILDREN
      - DRIVE_DOWNLOAD
  - sid: allow-admins-revoke
    effect: ALLOW
    subjects:
      principal_srns:
        - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:admins
    actions:
      - DRIVE_SHARE_REVOKE
```

### 23. JSON format example

Policies can also be written in JSON.

```json
{
  "scope": "OBJECT",
  "statements": [
    {
      "sid": "allow-download",
      "effect": "ALLOW",
      "subjects": {
        "principal_srns": [
          "stllr:iam:upn:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:reviewer@example.com"
        ]
      },
      "actions": ["DRIVE_DOWNLOAD", "DRIVE_STREAM", "DRIVE_LIST_CHILDREN"]
    }
  ]
}
```

## Best Practices

1. **Use descriptive `sid` values** – Helps with audit and debugging
   (e.g. `allow-risk-approvers-download`).
2. **Principle of least privilege** – Grant only the actions needed;
   avoid allow-all unless necessary.
3. **Prefer group SRNs over individual identity SRNs** – Groups are
   easier to maintain as team membership changes.
4. **Order matters for DENY** – DENY always wins; place broad allow
   statements first, then targeted denies.
5. **Test before activating** – Create a new version, verify it in the
   portal, then activate.
6. **Confirm policy attachment** – Policies only apply when attached to
   the object or an ancestor folder.

## Troubleshooting

- **403 on all actions** – Check that the policy is attached to the
  object (or parent). Use the policy dump script to verify storage.
- **Policy not matching expected identity** – Verify the principal SRN
  exactly matches the identity or group SRN. Look up SRNs in the
  dashboard or API before authoring.
- **Group not matching** – Ensure the group SRN is correct and the
  identity is a member of that group.
- **Empty subjects** – `principal_srns` is required and must contain
  at least one entry (use `"*"` for everyone).
