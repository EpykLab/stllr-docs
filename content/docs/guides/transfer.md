---
title: Transfer
---

**Goal:** Send or receive a file using the stellarbridge dashboard.

You can use either **upload** (simpler, good for typical files) or
**stream** (better for large files or unreliable networks). Both flows
are described below.

## Before you start

- You need a stellarbridge account with the right role. To **upload**
  or **stream**, you typically need the **BridgeUser** or **StreamUser**
  role; your admin assigns roles.
- Ensure you are logged in to the stellarbridge dashboard.

---

## Option A: Upload a file

Use upload when you want to send a file to a destination (person, team,
or folder) without streaming. Best for small to medium files and
one-off transfers.

### Sender: upload a file

1. Log in to the stellarbridge dashboard.
2. Open the **Home** tab, then the **Upload** tab.
3. In the drop zone, select the file(s) to transfer.
4. Choose the destination (if applicable) and click **Upload**.
5. When the upload completes, you and the receiver can see status and
   receipt in the dashboard.

### Receiver

The file lands in the chosen destination (e.g. a shared folder or
inbox). The receiver can open the dashboard and see the file in that
location; no separate receive step is required for standard uploads.

---

## Option B: Stream a file

Use streaming for large files or when you need resume support (e.g.
unstable networks). The sender creates a stream and shares a
seed phrase; the receiver uses that phrase to receive the file.

### Sender: start a stream

1. Log in to the stellarbridge dashboard.
2. Open the **Home** tab, then the **Stream** tab.
3. In the drop zone, select the file to transfer.
4. Click **Send file**.
5. Copy the **file stream seed phrase** shown by the dashboard.
6. Send the seed phrase to the receiver securely (e.g. email or
   another channel allowed by your organization).

### Receiver: receive a stream

1. Log in to the stellarbridge dashboard.
2. Open the **Home** tab, then the **Stream** tab.
3. In the “Receive file” area, paste the file stream seed phrase from
   the sender.
4. Click **Receive file**.
5. The transfer runs (and resumes automatically if interrupted). When
   it finishes, you can see status and receipt in the dashboard.

---

## See also

- [File uploads](/docs/moving-files/uploading-files/) — When and why to
  use uploads
- [File streaming](/docs/moving-files/streaming-files/) — When and why
  to use streaming
- [RBAC](/docs/security/rbac/) — Roles and permissions for uploads and
  streams
