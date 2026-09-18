---
title: Public links
---

**Goal:** Use public links to download or upload files without logging
in (recipient perspective).

stellarbridge supports four public (unauthenticated) flows: transfer
download, drive share download, transfer-request upload, and form
submission. Recipients use a link; no account is required.

## Public download { #public-download }

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

## Public drive share { #public-drive-share }

A Drive share can permit an original-file download or require Secure
Viewer. The recipient does not need a Stellarbridge account.

### Download a shared Drive file { #download-a-shared-drive-file }

1. Open the link from the share email.
2. Review the file name, size, and access type.
3. Enter the share password if the sender configured one.
4. Choose **Download**.

The download link is limited by its expiry and use count. The sender can
revoke it. Download shares are subject to `DRIVE_SHARE` policy when they
are created.

### View a shared Drive file securely { #view-a-shared-drive-file-securely }

1. Open the link from the share email.
2. If prompted, enter the share password. Password verification happens
   before Stellarbridge sends an email code.
3. Choose **Send verification code**. The code goes only to the email
   address selected by the sender.
4. Enter the six-digit code within 10 minutes.
5. Choose **Open Secure Viewer**.
6. Close the viewer when you finish. You can return while the share is
   valid, but you must verify again after the short verification session
   expires.

Opening a link or requesting a code does not start a viewer. Viewer
resources are created only after successful verification and an explicit
**Open Secure Viewer** action.

Only one Secure Viewer session can be active for a share. A policy change,
file freeze, deletion, expiry, or share revocation blocks new sessions and
terminates an affected active session. A freeze suspends access; explicit
share revocation is permanent.

Secure-view shares do not provide a public presigned download URL. They do
not prevent screenshots, screen recording, photography, OCR, or manual
capture of visible information.

## Public upload { #public-upload }

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

<span id="public-form-submit-public-form-submit"></span>
## Public form submit {#public-form-submit}

Used when a form owner publishes a **form link** (by publication token).
The recipient completes the form and submits answers without an account.

1. A form owner publishes a form from **Forms** and shares the
   publication link (token in the URL). See [Forms](/docs/guides/forms/#publish-a-shareable-link).
2. Recipient opens the **form link**.
3. The public form page shows the published fields (pinned to the schema
   at publish time).
4. Recipient completes required fields and **submits**. The response is
   stored as an immutable snapshot tied to the publication.

No login is required. Submissions are rate-limited. Revoking the
publication or archiving the form stops new submissions on that link.
Answer values are visible only to authorized org members; audit events
record submission metadata without answer payloads.

---

## See also { #see-also }

- [Forms](/docs/guides/forms/) — Create forms, publish links, and review
  responses (sender perspective)
- [Transfer a file](/docs/guides/transfer/) — How senders create
  transfers and transfer requests
- [Using the Drive](/docs/guides/drive/) — Create a share and send link
  by email
- [End-user features](/docs/features/) — Full list of public and
  dashboard features
