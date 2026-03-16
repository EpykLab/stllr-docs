---
title: Gate approval
---

**Goal:** Approve a GATE request (admin-in-the-loop) or notify the org
admin when access is denied by policy.

Some policy statements use the **GATE** effect: the action is not
allowed until an admin approves it. This guide describes the approval
flow and the policy-denial notification option.

## Approve a gate request

When a user or system triggers an action that has a GATE policy:

1. The request is held pending approval. The approver (e.g. org admin)
   receives an **email** containing a **gate-approval link**.
2. The link includes a **one-time token**. Open the link in a browser
   (you may need to be logged in or use the token as proof).
3. The app calls the gate-approve API; the request is **approved** and
   the original action can proceed.

**Important:** Use the link only once and only if you intend to approve
the request. Do not share the link; treat it as sensitive.

## Policy denial notification

When access is **denied** by policy (DENY effect), the user may see an
option to **notify the org admin** (e.g. “Send denial context to admin”).

- The user can send a notification that includes context about the
  denied action (e.g. object, action, identity). This is sent by email
  to the configured org admin or support address.
- Use this to escalate or document denials for compliance or
  troubleshooting.

---

## See also

- [Writing policies](/docs/guides/writing-policies/#effects) — ALLOW,
  DENY, and GATE effects
- [Managing policies](/docs/guides/managing-policies/) — Create and
  activate policies that use GATE
- [End-user features](/docs/features/) — Gate approval and notify
  policy denial
