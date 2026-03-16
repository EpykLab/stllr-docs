---
title: Public links
---

**Goal:** Use public links to download or upload files without logging
in (recipient perspective).

stellarbridge supports three public (unauthenticated) flows: transfer
download, drive share download, and transfer-request upload. Recipients
use a link; no account is required.

## Public download

Used when a sender shares a **transfer download link** (by transfer
UUID). The recipient can download the file without an account.

1. Recipient opens the link (e.g. from email). The link includes the
   transfer UUID.
2. The public download page shows **download info** (e.g. file name,
   size, sender).
3. Recipient clicks **Download**. The app returns a presigned URL; the
   browser or client uses it to download the file.

No login is required. Link validity and access are controlled by the
sender and org (e.g. transfer protection, expiry).

## Public drive share

Used when a user shares a **drive share link** (by token) so someone can
download a file from the Drive without logging in.

1. A user creates a share from the Drive (see [Using the
   Drive](/docs/guides/drive/#share-a-file-send-link-by-email)) and
   sends the link to the recipient.
2. Recipient opens the **share link** (token in the URL).
3. The public share page shows **share info** (e.g. file name, size).
4. Recipient clicks **Download**. The app returns a presigned URL and
   the file is downloaded.

No login is required. Share links are subject to policy (e.g.
SHARE_LINK_CREATE) and can be revoked.

## Public upload

Used when a **transfer request** is created and the sender shares an
**upload link** (by request UID). The recipient uploads files to
fulfill the request without an account.

1. Sender creates a transfer request in **Transfer Studio** and
   receives an **upload link** (request UID). Sender shares that link
   with the recipient.
2. Recipient opens the **upload link**.
3. The public upload page shows **request info** (e.g. what is being
   requested, any instructions).
4. Recipient selects files and **uploads** them. When the upload
   completes, the transfer request is fulfilled.

No login is required. Request and upload behavior are subject to org
and policy settings.

---

## See also

- [Transfer a file](/docs/guides/transfer/) — How senders create
  transfers and transfer requests
- [Using the Drive](/docs/guides/drive/) — Create a share and send link
  by email
- [End-user features](/docs/features/) — Full list of public and
  dashboard features
