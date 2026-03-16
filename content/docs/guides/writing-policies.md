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
for object operations. **Policy evaluation runs only after route-level
RBAC:** the user must already have permission to call the API route
(e.g. the drive/object route); then, for that request, the policy
engine evaluates all policies attached to the object and its ancestors.
When a user, API client, or agent attempts an action (e.g. list
children, download, delete), the policy engine evaluates those
policies. DENY overrides ALLOW; if no statement matches, the action is
denied. See [RBAC](/docs/security/rbac/) for how roles and route-level
access work.

**Policy lifecycle:**
1. Create a policy under a partner in the dashboard
2. Add versions (each version is a policy document)
3. Activate a version
4. Attach the policy to objects (folders or files)

## Document Structure

Every policy document has:

| Field | Required | Description |
|-------|----------|-------------|
| `scope` | Yes | Must be `OBJECT` for drive policies |
| `statements` | Yes | Array of one or more statements |

Each statement has:

| Field | Required | Description |
|-------|----------|-------------|
| `sid` | Yes | Unique identifier (e.g. `allow-download`, `deny-delete`) |
| `effect` | Yes | `ALLOW`, `DENY`, or `GATE` |
| `subjects` | Yes | Who the statement applies to |
| `actions` | Yes | Array of action strings the statement applies to |

## Subjects

Subjects define *who* the statement matches. At least one of `identity_types`, `identities`, `groups`, `group_names`, or `identity_emails` must be non-empty. Matching is OR: if the identity matches any subject criterion, the statement applies.

| Subject field | Type | Description |
|---------------|------|-------------|
| `identity_types` | `["UPN", "API", "AGENT"]` | Match by identity type. UPN = user, API = API key, AGENT = automated agent |
| `identity_emails` | `["alice@example.com"]` | Match by email (case-insensitive) |
| `group_names` | `["risk-approvers"]` | Match by group name (resolved at evaluation) |
| `groups` | `[5, 7]` | Match by group ID |
| `identities` | `[100, 101]` | Match by identity ID |

**To match everyone:** use `identity_types: [UPN, API, AGENT]`.

## Actions

Valid actions for OBJECT scope:

| Action | Description |
|--------|-------------|
| `SEND` | Send/upload into folder |
| `RECEIVE` | Receive into folder |
| `DELETE` | Delete object |
| `DOWNLOAD` | Download file |
| `STREAM` | Stream file |
| `LOCK` | Lock object |
| `FREEZE` | Freeze object |
| `CHANGE_ACCESS` | Change policy attachments, view attachments |
| `RENAME` | Rename object |
| `MOVE` | Move object |
| `COPY` | Copy object |
| `SHARE_LINK_CREATE` | Create share link |
| `SHARE_LINK_REVOKE` | Revoke share link |
| `LIST_CHILDREN` | List folder contents, create children |

## Effects

- **ALLOW** – Permit the action
- **DENY** – Block the action (takes precedence over ALLOW)
- **GATE** – Require admin approval before action proceeds

## Examples

### 1. Allow all for everyone

Permit all actions for all identity types.

```yaml
scope: OBJECT
statements:
  - sid: allow-all
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
        - AGENT
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - STREAM
      - LOCK
      - FREEZE
      - CHANGE_ACCESS
      - RENAME
      - MOVE
      - COPY
      - SHARE_LINK_CREATE
      - SHARE_LINK_REVOKE
      - LIST_CHILDREN
```

### 2. Allow downloads only for specific email

Only the listed email can download.

```yaml
scope: OBJECT
statements:
  - sid: allow-download-owner
    effect: ALLOW
    subjects:
      identity_emails:
        - owner@example.com
    actions:
      - DOWNLOAD
```

### 3. Allow list and download for a group

Members of `readers` can list children and download.

```yaml
scope: OBJECT
statements:
  - sid: allow-readers
    effect: ALLOW
    subjects:
      group_names:
        - readers
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
```

### 4. Deny delete for everyone

Block delete for all identities.

```yaml
scope: OBJECT
statements:
  - sid: deny-delete
    effect: DENY
    subjects:
      identity_types:
        - UPN
        - API
        - AGENT
    actions:
      - DELETE
```

### 5. Allow uploads for API only

Only API clients can send/upload; users cannot.

```yaml
scope: OBJECT
statements:
  - sid: allow-api-upload
    effect: ALLOW
    subjects:
      identity_types:
        - API
    actions:
      - SEND
      - LIST_CHILDREN
```

### 6. Allow users but deny API for sensitive folder

Users can read; API keys cannot.

```yaml
scope: OBJECT
statements:
  - sid: allow-users
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
  - sid: deny-api
    effect: DENY
    subjects:
      identity_types:
        - API
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
```

### 7. Multiple emails with full access

Several users get full access.

```yaml
scope: OBJECT
statements:
  - sid: allow-team
    effect: ALLOW
    subjects:
      identity_emails:
        - alice@example.com
        - bob@example.com
        - carol@example.com
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - LIST_CHILDREN
      - RENAME
      - MOVE
      - COPY
      - CHANGE_ACCESS
```

### 8. View-only for external partners

Group `external-partners` can only list and download.

```yaml
scope: OBJECT
statements:
  - sid: allow-partners-read
    effect: ALLOW
    subjects:
      group_names:
        - external-partners
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
      - STREAM
```

### 9. Editors can modify, others read-only

`editors` get write access; `viewers` get read-only.

```yaml
scope: OBJECT
statements:
  - sid: allow-editors
    effect: ALLOW
    subjects:
      group_names:
        - editors
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - LIST_CHILDREN
      - RENAME
      - MOVE
      - COPY
      - CHANGE_ACCESS
  - sid: allow-viewers
    effect: ALLOW
    subjects:
      group_names:
        - viewers
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
      - STREAM
```

### 10. Block share links for confidential data

Allow read/write but forbid share link creation.

```yaml
scope: OBJECT
statements:
  - sid: allow-ops
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - LIST_CHILDREN
      - RENAME
      - MOVE
      - COPY
      - CHANGE_ACCESS
  - sid: deny-share-links
    effect: DENY
    subjects:
      identity_types:
        - UPN
        - API
        - AGENT
    actions:
      - SHARE_LINK_CREATE
      - SHARE_LINK_REVOKE
```

### 11. Risk approvers download only

Only `risk-approvers` can download (e.g. for compliance review).

```yaml
scope: OBJECT
statements:
  - sid: allow-risk-approvers-download
    effect: ALLOW
    subjects:
      group_names:
        - risk-approvers
    actions:
      - DOWNLOAD
      - STREAM
      - LIST_CHILDREN
```

### 12. Admin-only policy management

Only `admins` can change policy attachments.

```yaml
scope: OBJECT
statements:
  - sid: allow-all-read-write
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - LIST_CHILDREN
      - RENAME
      - MOVE
      - COPY
  - sid: allow-admins-access-control
    effect: ALLOW
    subjects:
      group_names:
        - admins
    actions:
      - CHANGE_ACCESS
```

### 13. Lock and freeze restricted to custodians

Only `data-custodians` can lock or freeze objects.

```yaml
scope: OBJECT
statements:
  - sid: allow-custodians-lock-freeze
    effect: ALLOW
    subjects:
      group_names:
        - data-custodians
    actions:
      - LOCK
      - FREEZE
  - sid: allow-others-normal
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - LIST_CHILDREN
      - RENAME
      - MOVE
      - COPY
      - CHANGE_ACCESS
```

### 14. Deny move and rename for shared folder

Allow read/write but block structural changes.

```yaml
scope: OBJECT
statements:
  - sid: allow-ops
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - LIST_CHILDREN
      - COPY
      - CHANGE_ACCESS
  - sid: deny-structure
    effect: DENY
    subjects:
      identity_types:
        - UPN
        - API
        - AGENT
    actions:
      - RENAME
      - MOVE
```

### 15. Allow copy but not delete

Users can copy files out but cannot delete originals.

```yaml
scope: OBJECT
statements:
  - sid: allow-copy-download
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
    actions:
      - DOWNLOAD
      - STREAM
      - COPY
      - LIST_CHILDREN
  - sid: deny-delete
    effect: DENY
    subjects:
      identity_types:
        - UPN
        - API
        - AGENT
    actions:
      - DELETE
```

### 16. Agents can only receive

Automated agents can only receive (upload) into the folder; they cannot download or delete.

```yaml
scope: OBJECT
statements:
  - sid: allow-agents-receive
    effect: ALLOW
    subjects:
      identity_types:
        - AGENT
    actions:
      - RECEIVE
      - LIST_CHILDREN
```

### 17. Audit-readers view-only with stream

Audit group gets list, download, and stream for compliance review.

```yaml
scope: OBJECT
statements:
  - sid: allow-audit-read
    effect: ALLOW
    subjects:
      group_names:
        - audit-readers
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
      - STREAM
```

### 18. Contractors limited upload and list

Contractors can upload and list but not download, delete, or change access.

```yaml
scope: OBJECT
statements:
  - sid: allow-contractors-upload
    effect: ALLOW
    subjects:
      group_names:
        - contractors
    actions:
      - SEND
      - LIST_CHILDREN
```

### 19. Finance team full access, others denied

Only `finance-team` gets any access; everyone else is implicitly denied.

```yaml
scope: OBJECT
statements:
  - sid: allow-finance
    effect: ALLOW
    subjects:
      group_names:
        - finance-team
    actions:
      - SEND
      - RECEIVE
      - DELETE
      - DOWNLOAD
      - STREAM
      - LOCK
      - FREEZE
      - CHANGE_ACCESS
      - RENAME
      - MOVE
      - COPY
      - SHARE_LINK_CREATE
      - SHARE_LINK_REVOKE
      - LIST_CHILDREN
```

### 20. Read-only audit trail folder

Strict read-only: only list, download, stream. No writes or structural changes.

```yaml
scope: OBJECT
statements:
  - sid: allow-audit-read-only
    effect: ALLOW
    subjects:
      group_names:
        - auditors
        - compliance-officers
    actions:
      - LIST_CHILDREN
      - DOWNLOAD
      - STREAM
```

### 21. Mixed identity types and groups

Allow both human users and a specific group.

```yaml
scope: OBJECT
statements:
  - sid: allow-users-and-sync-group
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
      group_names:
        - sync-service
    actions:
      - SEND
      - RECEIVE
      - DOWNLOAD
      - LIST_CHILDREN
```

### 22. Revoke share links only for admins

Everyone can create share links; only admins can revoke them.

```yaml
scope: OBJECT
statements:
  - sid: allow-all-create-link
    effect: ALLOW
    subjects:
      identity_types:
        - UPN
        - API
    actions:
      - SHARE_LINK_CREATE
      - LIST_CHILDREN
      - DOWNLOAD
  - sid: allow-admins-revoke
    effect: ALLOW
    subjects:
      group_names:
        - admins
    actions:
      - SHARE_LINK_REVOKE
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
        "identity_emails": ["reviewer@example.com"]
      },
      "actions": ["DOWNLOAD", "STREAM", "LIST_CHILDREN"]
    }
  ]
}
```

## Best Practices

1. **Use descriptive `sid` values** – Helps with audit and debugging (e.g. `allow-risk-approvers-download`).
2. **Principle of least privilege** – Grant only the actions needed; avoid allow-all unless necessary.
3. **Prefer `group_names` over `identity_emails`** – Groups are easier to maintain as team membership changes.
4. **Order matters for DENY** – DENY always wins; place broad allow statements first, then targeted denies.
5. **Test before activating** – Create a new version, verify it in the portal, then activate.
6. **Confirm policy attachment** – Policies only apply when attached to the object or an ancestor folder.

## Troubleshooting

- **403 on all actions** – Check that the policy is attached to the object (or parent). Use the policy dump script to verify storage.
- **Email in policy but still denied** – Ensure the logged-in email matches exactly (case-insensitive); check for typos (e.g. `user@example.com` vs `userb@example.com`).
- **Group not matching** – Ensure the group exists in the organization/partner context and the user is a member.
- **Empty subjects** – If `subjects` is `{}` or all lists are empty, the statement never matches anyone.
