---
title: Platform Hands-On Scenarios
---

# Stellarbridge Platform Hands-On Scenarios

Structured scenario exercises for new Stellarbridge users. Each scenario
maps to real product features in Drive, Transfers, Policies, Forms,
Partners, Settings, Audit, and Data flow.

## How to use this document

1. Read **Training environment** and confirm your tenant has the required
   features enabled.
2. Follow the **Learning path** in order, or jump to a module by role.
3. Complete each scenario's steps, then verify **Success criteria** before
   moving on.
4. Scenarios that depend on earlier work list **Prerequisites** by scenario
   ID.

## Training environment

| Resource | Purpose |
| -------- | ------- |
| Your org admin account | Primary operator for most exercises |
| `external-user@example.com` | External recipient, partner contact, upload sender |
| `trainee@example.com` | Trainee user for onboarding, roles, suspension, audit |
| A dedicated training project | Recommended name: `Training Lab` |
| Sample files | Small PDF, larger file (>100 MB if testing stream), dummy CAD or zip |

### Feature flags

Some scenarios require tenant features to be enabled under **Settings →
Features** (for example Forms). If a nav item or action is missing, check
with your org admin before skipping the scenario.

### External documentation

- [Documentation home](https://docs.stellarbridge.app/docs/)
- [Using the Drive](https://docs.stellarbridge.app/docs/guides/drive/)
- [Transfer a file](https://docs.stellarbridge.app/docs/guides/transfer/)
- [Managing your organization](https://docs.stellarbridge.app/docs/guides/managing-your-organization/)
- [Managing policies](https://docs.stellarbridge.app/docs/guides/managing-policies/)
- [Gate approval](https://docs.stellarbridge.app/docs/guides/gate-approval/)
- [Public links](https://docs.stellarbridge.app/docs/guides/public-links/)

---

## Learning path

| Phase | Focus | Scenario IDs |
| ----- | ----- | -------------- |
| 1 | Secure file movement (Transfers) | TRN-001 – TRN-010 |
| 2 | Workspace (Drive) | DRV-001 – DRV-008 |
| 3 | Governance (Policies and gate) | POL-001 – POL-006 |
| 4 | Structured intake (Forms) | FRM-001 – FRM-008 |
| 5 | Collaboration (Partners and groups) | PRT-001 – GRP-002 |
| 6 | Admin and security (Settings) | ADM-001 – ADM-009 |
| 7 | Investigation (Audit and data flow) | AUD-001 – AUD-005 |
| 8 | Productivity | PRD-001 – PRD-002 |

### Role-based shortcuts

| Role | Start with | Then |
| ---- | ---------- | ---- |
| Everyday user | TRN-001, DRV-001, TRN-002 | FRM-001, ADM-007 |
| Team lead / project owner | PRT-001, DRV-002, POL-001 | PRT-006, AUD-001 |
| Org admin | ADM-001, ADM-005, POL-001 | ADM-008, AUD-002 |
| Security / compliance | AUD-001, TRN-005, POL-005 | AUD-003 – AUD-005, TRN-010 |
| Partner / external user | PRT-005 | TRN-001 (receive side), DRV-001 |

---

## Phase 1 — Transfers

### TRN-001 — Send an invoice via upload transfer

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Upload (Transfer wizard) |
| **Roles** | Org member with transfer create permission |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

A customer needs an invoice for the most recent proof of purchase (PoP).
Sending the file over email is not secure.

**Objective**

Send the invoice to `external-user@example.com` using Stellarbridge's upload
transfer method.

**Steps**

1. Open **Transfers** → **New Transfer** → **Transfer** tab.
2. Click on `Choose files` or drag and drop. Click Next.
3. Add the emails of the recipient(s). Click Next.
4. Review options (password and org-lock optional for this exercise). Click Next.
5. Click on `Start Transfer`.
6. Complete the transfer and confirm success in transfer history.

**Success criteria**

- Transfer appears in **Transfers** history with correct recipient.
- Recipient receives notification (if email delivery is configured).
- Recipient can open the share link and download the file.
- Event appears in **Audit** (transfer created / shared).

---

### TRN-002 — Collect a W-2 via upload request

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Request (Upload request) |
| **Roles** | Org member with transfer create permission |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

You are onboarding a new employee and need a completed W-2 from the
candidate. W-2s contain PII; email is not appropriate.

**Objective**

Use Stellarbridge's file request feature to retrieve the W-2 from
the applicant.

**Steps**

1. Open **Transfers** → **New Transfer** → **Request** tab.
2. Create an upload request for the applicant.
3. Set MIME lock to PDF if you want to restrict file type.
4. Add instructions (for example: "Upload signed W-2, PDF only").
5. Send the request. The recipient will get the request as an email.
6. As the recipient, upload a test PDF via the public upload-share page.

**Success criteria**

- Request appears under **Transfers** → **Your Requests**.
- Recipient can upload without a Stellarbridge account.
- Upload fulfills the request; status shows completed/fulfilled.
- Transfer history reflects the inbound file.

---

### TRN-004 — Password-protected transfer

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Options → Password protection |
| **Roles** | Org member with transfer create permission |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

Legal needs to send a settlement draft to outside counsel. Anyone with
the link must not be able to download without an additional secret.

**Objective**

Create an upload transfer to `external-user@example.com` with password
protection enabled.

**Steps**

1. Create a new upload transfer with a sample document.
2. On the options step, set a transfer password (share it out-of-band for
   the exercise).
3. Complete the transfer.
4. Open the share link in a private/incognito window.
5. Attempt download without the password, then with the password.

**Success criteria**

- Download is blocked or fails without the correct password.
- Download succeeds after entering the password.
- Password can be viewed or changed from transfer detail (if supported).

---

### TRN-005 — Org-locked transfer

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Options → Org members only |
| **Roles** | Org member with transfer create permission |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

You are sharing internal financial projections that must not be accessible
to external identities.

**Objective**

Create a transfer with org-lock enabled and verify external access is
denied.

**Steps**

1. Create a transfer to a recipient with **Org members
   only** enabled.
2. Complete the transfer.
3. Go to transfers, and click on the transfer you just made
4. Click on the share button
5. Attempt to re-share to an external user (or non-org test account).

You can also toggle this org-lock from transfer detail after a transfer has
already been uploaded.

**Success criteria**

- Non-org users cannot download (error such as share link locked).
- Org members can access when appropriate.
- Lock state is visible on transfer detail and in transfer audit.

---

### TRN-006 — Revoke an upload request

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Your Requests |
| **Roles** | Org member who created the request |
| **Prerequisites** | TRN-002 (or any open upload request) |
| **Estimated time** | 10 min |

**Context**

You requested a W-2 from `external-user@example.com` but the candidate
withdrew. The upload link must stop working immediately.

**Objective**

Revoke an open upload request and confirm the link is invalid.

**Steps**

1. Open **Transfers** → **Your Requests**.
2. Locate the open request for `external-user@example.com`.
3. Revoke or delete the request (per UI affordance).
4. Open the former upload-share URL.

**Success criteria**

- Request no longer appears as active/pending.
- Public upload link shows invalid or expired link messaging.
- No new uploads can be associated with the revoked request.

---

### TRN-007 — Custody report for a transfer

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Transfer detail → Custody report |
| **Roles** | Org member with transfer read access |
| **Prerequisites** | TRN-001 or any transfer with activity |
| **Estimated time** | 10 min |

**Context**

Compliance needs proof of every action on a sensitive transfer.

**Objective**

Generate a custody report PDF for a transfer and verify it lists recorded
events.

**Steps**

1. Open **Transfers** and select a transfer with known activity.
2. Open transfer detail → **Custody report** (or equivalent action).
3. Wait for PDF generation.
4. Review the report contents.

**Success criteria**

- PDF generates without error.
- Report includes transfer metadata and event timeline (create, share,
  download, etc. as applicable).

---

### TRN-008 — Add a transfer to Drive

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Transfer detail → Add to Drive |
| **Roles** | Org member with Drive write access |
| **Prerequisites** | TRN-002 (fulfilled request) or TRN-001; DRV-001 recommended |
| **Estimated time** | 15 min |

**Context**

A vendor uploaded specs via upload request. The file should live in the
project Drive, not only in transfer history.

**Objective**

Copy transfer content into a project Drive folder.

**Steps**

1. Open a completed transfer in **Transfers**.
2. Choose **Add to Drive** (or similar).
3. Select the **Training Lab** project and target folder.
4. Open **Drive** for that project and locate the file.

**Success criteria**

- File appears in the selected Drive folder.
- Original transfer history entry remains intact.
- Drive object can be renamed, tagged, or shared independently.

---

### TRN-009 — Freeze a transfer during investigation

| Field | Value |
| ----- | ----- |
| **Feature area** | Audit → Transfer audit → Freeze |
| **Roles** | User with audit / transfer admin capabilities |
| **Prerequisites** | TRN-001; AUD-002 helpful |
| **Estimated time** | 15 min |

**Context**

Security flagged a transfer as suspicious. Downloads must stop while the
case is open.

**Objective**

Freeze a transfer from transfer audit and confirm download is blocked.

**Steps**

1. Open **Audit** → switch to **Transfer audit** mode.
2. Locate the target transfer.
3. Open row actions → toggle **Freeze sharing**.
4. Attempt download via the share link.

**Success criteria**

- Freeze toggle shows updated state and feedback toast.
- Frozen transfer cannot be downloaded by recipients.
- Unfreezing restores download (optional verification).

---

### TRN-010 — Remove transfer password after counsel review

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Transfer detail → Protect |
| **Roles** | Transfer owner or admin |
| **Prerequisites** | TRN-004 |
| **Estimated time** | 10 min |

**Context**

Outside counsel finished review; internal stakeholders need password-free
access within the org.

**Objective**

Remove password protection from an existing transfer.

**Steps**

1. Open the password-protected transfer from TRN-004.
2. Open protect/password settings.
3. Remove the password.
4. Download again without entering a password.

**Success criteria**

- Transfer detail shows no password set.
- Download proceeds without password prompt.

---

## Phase 2 — Drive

### DRV-001 — Select a project workspace

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Workspace picker |
| **Roles** | Org member with Drive access |
| **Prerequisites** | None |
| **Estimated time** | 10 min |

**Context**

Drive is project-centric. Files live in a project workspace, not a single
global folder.

**Objective**

Open Drive, select a project, and confirm the file grid loads.

**Steps**

1. Open **Drive** from the sidebar.
2. On the workspace picker, search or select **Training Lab** (or create
   the project in PRT-002 first).
3. Confirm the URL includes the project identifier.
4. Note empty-folder upload hint if the project has no files yet.

**Success criteria**

- Project file grid is visible.
- Breadcrumb or header shows correct project context.
- Upload affordance is available.

---

### DRV-002 — Set up project folder structure

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Folders |
| **Roles** | Org member with Drive write access |
| **Prerequisites** | DRV-001 or PRT-002 |
| **Estimated time** | 15 min |

**Context**

A new customer engagement needs consistent folder layout for contracts,
deliverables, and internal working files.

**Objective**

Create `/Contracts`, `/Deliverables`, and `/Internal` folders in the
training project Drive.

**Steps**

1. Open the training project in **Drive**.
2. Create each folder via the UI (right click and select New folder).
3. Upload at least one sample file into `/Deliverables`.

**Success criteria**

- All three folders exist and are navigable.
- Sample file appears inside `/Deliverables`.

---

### DRV-003 — Upload, rename, and delete

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → File operations |
| **Roles** | Org member with Drive write access |
| **Prerequisites** | DRV-002 |
| **Estimated time** | 15 min |

**Context**

Day-to-day Drive work requires basic file lifecycle management.

**Objective**

Upload multiple files, rename one, and delete a test file with
confirmation.

**Steps**

1. Upload two or three sample files to the training project (Right click, select `Upload files`).
2. Open the context menu (right click) on one file → **Rename** → save a new name.
3. Open the context menu (right click) on a disposable test file → **Delete** → confirm.

**Success criteria**

- Renamed file shows the new name in the grid.
- Deleted file no longer appears.
- Rename and delete modals behaved as expected.

---

### DRV-004 — Share a Drive file by email

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Share |
| **Roles** | Org member with share permission |
| **Prerequisites** | DRV-003 |
| **Estimated time** | 15 min |

**Context**

A project deliverable must go to `external-user@example.com` without using
email attachments.

**Objective**

Share a Drive file via email link from the Drive UI.

**Steps**

1. Select a file in the training project Drive.
2. Open **Share** (Right click, select `Share`) and enter `external-user@example.com`.
3. Submit the share request.
4. If policy blocks the action, note the denial or gate-pending message
   (complete POL-005 if gated).

**Success criteria**

- Share completes, or gate-pending message explains next steps.
- Recipient receives link (when not gated).
- Audit records the share attempt.

---

### DRV-005 — Drive search

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Search |
| **Roles** | Org member with Drive access |
| **Prerequisites** | DRV-003 |
| **Estimated time** | 10 min |

**Context**

You know a file name but not which folder contains it.

**Objective**

Use Drive search to find a file and jump to its containing folder.

**Steps**

1. In project Drive, use search (top right of window).
2. Search for a known file name from DRV-003.
3. Open the first result.

**Success criteria**

- Search returns the expected file.
- Navigation lands in the containing folder with the item selected.

---

### DRV-006 — Tag and filter Drive objects

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Tags; Settings → Tag catalog |
| **Roles** | Org member; tag admin for catalog setup |
| **Prerequisites** | DRV-003 |
| **Estimated time** | 20 min |

**Context**

Your org labels objects with tags such as `PII`, `Legal Hold`, and
`Customer-facing` for discovery and policy workflows.

**Objective**

Apply tags to Drive files and filter the grid by tag.

**Steps**

1. If needed, open **Settings** → tag catalog and confirm tags exist (or
   create training tags).
2. In Drive, apply the `Legal Hold` tags (or equivalent) to at least two files. Right click
on file (you can click and drag to select multiple files at once) and select `Manage tags` 
3. Use the Drive tag filter to show only tagged items.

**Success criteria**

- Tags appear on object rows or detail.
- Filter reduces the grid to tagged objects only.

---

### DRV-007 — Assign a policy to a Drive folder

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Policy attachments |
| **Roles** | Policy author or admin |
| **Prerequisites** | POL-001; DRV-002 |
| **Estimated time** | 20 min |

**Context**

A folder holds export-controlled data. Access must follow a formal policy,
not ad hoc sharing.

**Objective**

Attach an active policy to a Drive folder and observe allow/deny behavior.

**Steps**

1. Open the sensitive folder in Drive.
2. Open policy attachment UI for the folder (Right click, select `Policy attachments`).
3. Assign the policy created in POL-001.
4. Attempt access or share as a user outside the allowed scope.

**Success criteria**

- Policy attachment is visible on the folder.
- Out-of-scope user receives denial (policy denial modal or error).
- Policy decision is recorded (see POL-006).

---

### DRV-008 — Drive object custody report

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Custody report |
| **Roles** | Org member with appropriate read access |
| **Prerequisites** | DRV-003 with share or download activity |
| **Estimated time** | 10 min |

**Context**

Auditors need chain-of-custody for a file that never left Drive (no
transfer involved).

**Objective**

Generate a custody report for a Drive object.

**Steps**

1. Select a Drive file with known activity.
2. Trigger custody report generation from file actions or
detail (Right click, select `Chain of custody`).
3. Review the exported report.

**Success criteria**

- Report generates for `subject_type=drive_object`.
- Timeline reflects upload, share, or download events as applicable.

---

## Phase 3 — Policies and gate approval

### POL-001 — Create and activate a policy

| Field | Value |
| ----- | ----- |
| **Feature area** | Policies → Create, version, activate |
| **Roles** | Policy author / org admin |
| **Prerequisites** | GRP-001 recommended (for group-scoped rule) |
| **Estimated time** | 30 min |

**Context**

Only members of the Engineering group may download files in the R&D
project.

**Objective**

Create a policy, add a version, activate it, and prepare it for Drive
attachment.

**Steps**

1. Open **Policies** → **New policy**.
2. Fill out the policy details
- Name
- Description (it is useful to have a short description at the very least)
- Scope: For this example, set this to `Object`
- Catalog: Select `Organization`
3. Click the ellipsis in the upper right-hand corner and select `Add version`
4. Define a rule restricting download to the Engineering group (SRN
   reference).
- Scope: Set to `Object`
- Statement 1:
   - Label: allow-download
   - Effect: Allow
   - Who: Paste the SRN of the engineering group
   - Actions: `DRIVE_DOWNLOAD` (make sure that this is the only action selected)
5. Select the `Activate on save` checkbox
6. Click `Create version`


**Success criteria**

- Policy appears in the policies list.
- Active version is marked clearly on detail page.
- Policy can be attached in DRV-007.

---

### POL-002 — Policy versioning and rollback

| Field | Value |
| ----- | ----- |
| **Feature area** | Policies → Version list |
| **Roles** | Policy author |
| **Prerequisites** | POL-001 |
| **Estimated time** | 20 min |

**Context**

A policy change blocked legitimate contractor access. You must restore the
previous behavior quickly.

**Objective**

Reactivate an older policy version without deleting the newer draft.

**Steps**

1. Open the policy from POL-001.
2. Add a second version with stricter rules (simulate the bad change).
3. Activate the stricter version and confirm blocked access.
4. Reactivate the earlier version.
- Click the ellipsis on the older policy version
- Select Activate

This will activate the older version of the policy. All objects that have this policy
attached will automatically get this update. Keep in mind that policies are immutable.
This means that you cannot delete or modify policy versions. If a mistake was made or
you need adjustments, you must create a new policy version.

**Success criteria**

- Version list shows multiple versions with activation history.
- Reactivating older version restores prior access behavior.

---

### POL-003 — Fork a policy

| Field | Value |
| ----- | ----- |
| **Feature area** | Policies → Fork |
| **Roles** | Policy author |
| **Prerequisites** | POL-001 |
| **Estimated time** | 15 min |

**Context**

You have a working external-share policy and need a partner-specific
variant.

**Objective**

Fork an existing policy into a new policy draft.

**Steps**

1. Open policy detail for the source policy.
2. Choose **Fork policy**.
3. Enter new name and metadata; submit.
4. Confirm redirect to the new policy detail page.

**Success criteria**

- New policy ID is distinct from the source.
- Forked draft contains copied definition editable independently.

---

### POL-004 — Policy scenario test

| Field | Value |
| ----- | ----- |
| **Feature area** | Policies → Scenario test / simulation |
| **Roles** | Policy author |
| **Prerequisites** | POL-001; DRV-002 |
| **Estimated time** | 15 min |

**Context**

Before attaching a policy to production data, you want to preview
outcomes.

**Objective**

Run a policy simulation or scenario test against a sample object.

**Steps**

1. From policy detail, open **Scenario test** (right-click the ellipsis, select
`Test scenario`) or run simulation against a Drive object.
2. Under `Existing policy` Select the policy you wish to test .
2. Supply actor identity and action (for example download).
3. Review allow/deny/conditional outcome.

**Success criteria**

- Simulation completes with explicit outcome.
- Outcome matches expectations for in-scope and out-of-scope users.

---

### POL-005 — Gate approval workflow

| Field | Value |
| ----- | ----- |
| **Feature area** | Gate approval; Drive share; Data custodian |
| **Roles** | Requester + data custodian |
| **Prerequisites** | PRT-006 or org data custodian assigned; gated policy or share rule |
| **Estimated time** | 25 min |

**Context**

A user shared a gated file to `external-user@example.com`. Policy requires
custodian approval before the share completes.

**Objective**

Complete an end-to-end gate approval as the data custodian.

**Steps**

1. Trigger a gated share:
2. Confirm requester sees gate-pending messaging.
3. As data custodian, open **Gate approval** (or notification link).
4. Review context and approve or deny.
5. Verify share completes or remains blocked accordingly.

**Success criteria**

- Pending gate request visible to custodian.
- Approve path completes share; deny path blocks it.
- Audit captures gate decision.

**Resources**

This is an example policy that requires gate approval for `DRIVE_SHARE` actions.
Note, at current, the GATE action is only supported for `DRIVE_SHARE` actions.

```yaml
scope: OBJECT
statements:
    - actions:
        - DRIVE_SHARE
      effect: GATE
      sid: allow-edit
      subjects:
        principal_srns:
            - stllr:iam:group:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:engineering
```
---

### POL-006 — Review policy decisions

| Field | Value |
| ----- | ----- |
| **Feature area** | Drive → Policy decisions |
| **Roles** | Policy author or auditor |
| **Prerequisites** | DRV-007 |
| **Estimated time** | 10 min |

**Context**

After attaching a policy, compliance wants evidence that evaluations
occurred.

**Objective**

View recorded policy decisions for assigned objects.

**Steps**

1. Perform allow and deny actions against the gated folder.
2. Open **Policy decisions** on the drive object (such as a folder or file.
Right click and select `Policy decisions`).
3. Inspect decision events: actor, action, outcome.

**Success criteria**

- Each test action produced a decision record.
- Denials include enough context to explain why access failed.

---

## Phase 4 — Forms

### FRM-001 — Create a personal intake form

| Field | Value |
| ----- | ----- |
| **Feature area** | Forms → Catalog → Create |
| **Roles** | Org member; Forms feature enabled |
| **Prerequisites** | ADM-009 if Forms nav is missing |
| **Estimated time** | 25 min |

**Context**

You need a vendor questionnaire with typed fields before sharing a
collection link.

**Objective**

Create a personal form with text, email, checkbox, and required fields.

**Steps**

1. Open **Forms** → create personal form **Vendor questionnaire**.
2. Add fields: company name (text), contact email (email), agreement
   (checkbox, required).
3. Save and confirm form appears in your catalog.

**Success criteria**

- You are listed as owner.
- Form schema saves without validation errors.
- Form is editable from form detail page.

---

### FRM-002 — Publish a public form link

| Field | Value |
| ----- | ----- |
| **Feature area** | Forms → Publications |
| **Roles** | Form owner |
| **Prerequisites** | FRM-001 |
| **Estimated time** | 15 min |

**Context**

Q3 vendor attestation needs a standalone link respondents can open without
signing in.

**Objective**

Publish the form for a public audience and capture the URL.

**Steps**

1. Open form detail for **Vendor questionnaire**.
2. **Publish** for public audience.
3. Copy the standalone public URL.
4. Open the link in a private window and submit valid test answers.

**Success criteria**

- Publication pins current form version.
- Anonymous submission succeeds with confirmation message.
- Response appears in form responses view.

---

### FRM-003 — Review form responses

| Field | Value |
| ----- | ----- |
| **Feature area** | Forms → Responses |
| **Roles** | Form owner or publication creator |
| **Prerequisites** | FRM-002 |
| **Estimated time** | 10 min |

**Context**

Submissions arrived; you need to review them with publication context.

**Objective**

Open responses and verify pinned version and publication metadata.

**Steps**

1. Open **Forms** → select **Vendor questionnaire** → **Responses**.
2. Open the test submission from FRM-002.
3. Note publication name and pinned schema version.

**Success criteria**

- Response shows answers and publication context.
- Pinned version matches version active at publish time.

---

### FRM-004 — Org-owned template (FORM_ADMIN)

| Field | Value |
| ----- | ----- |
| **Feature area** | Forms → Org-owned templates |
| **Roles** | FORM_ADMIN |
| **Prerequisites** | Forms enabled |
| **Estimated time** | 20 min |

**Context**

The org wants a standard **Vendor PO capture** form all members can publish
but not edit.

**Objective**

Create an org-owned template and verify member publish vs edit rules.

**Steps**

1. As FORM_ADMIN, create org-owned form **Vendor PO capture**.
- Go to forms
- Select `New form`
- Toggle `Org template`
- Provide a name for the form
2. Sign in as a regular member (not FORM_ADMIN).
3. Confirm member can publish a new public link.
4. Confirm member cannot edit the schema.

**Success criteria**

- Form ownership is org-owned.
- Member publish succeeds; schema edit is rejected or hidden.

---

### FRM-005 — Promote personal form to org-owned

| Field | Value |
| ----- | ----- |
| **Feature area** | Forms → Promotion |
| **Roles** | FORM_ADMIN |
| **Prerequisites** | FRM-001 with at least one response |
| **Estimated time** | 15 min |

**Context**

A team member's intake form should survive their departure.

**Objective**

Promote **Vendor questionnaire** to org-owned without changing form ID.

**Steps**

1. As FORM_ADMIN, promote **Vendor questionnaire** to org-owned.
2. Optionally retain original owner as collaborator.
3. Verify form ID unchanged and responses still attached.

**Success criteria**

- Ownership model is org-owned.
- Historical responses remain on same form ID.

---

### FRM-006 — Archive a form

| Field | Value |
| ----- | ----- |
| **Feature area** | Forms → Archive |
| **Roles** | Form owner or FORM_ADMIN |
| **Prerequisites** | FRM-002 with active publication |
| **Estimated time** | 10 min |

**Context**

The Q3 campaign ended; no new submissions should be accepted.

**Objective**

Archive the form and confirm publications reject new submissions.

**Steps**

1. Archive **Vendor questionnaire**.
2. Open the former public link and attempt a new submission.

**Success criteria**

- Form status is archived.
- Public link shows no longer accepting responses (or equivalent).
- Archived name cannot be reused on a new form (optional check).

---

### FRM-007 — Upload request with embedded form (Coming soon)

| Field | Value |
| ----- | ----- |
| **Feature area** | Transfers → Request + Forms |
| **Roles** | Transfer user with form picker access |
| **Prerequisites** | FRM-001 or FRM-004; TRN-002 |
| **Estimated time** | 25 min |

**Context**

You need both a signed attestation and a file from `external-user@example.com`
in one governed session.

**Objective**

Create an upload request that embeds a form; complete both halves as
recipient.

**Steps**

1. Create upload request for `external-user@example.com`.
2. Attach form **Vendor PO capture** (or **Vendor questionnaire**).
3. As recipient, open upload-share link.
4. Submit form answers only → confirm intake **Incomplete**.
5. Upload file → confirm intake **Complete**.

**Success criteria**

- Form and upload appear on same page.
- Complete status requires both form and file.
- Owner sees partial submit if only form is filled.

---

### FRM-008 — Form submit audit hygiene

| Field | Value |
| ----- | ----- |
| **Feature area** | Audit → FORM_SUBMITTED |
| **Roles** | Auditor or form owner |
| **Prerequisites** | FRM-002 |
| **Estimated time** | 10 min |

**Context**

Compliance requires proof of submission without duplicating PII into audit
logs.

**Objective**

Verify `FORM_SUBMITTED` audit event metadata.

**Steps**

1. Submit a test response via public link.
2. Open **Audit** and locate `FORM_SUBMITTED` event.
3. Inspect payload: form id, publication id, response id, field keys.

**Success criteria**

- Audit event exists for the submission.
- Payload includes IDs and field keys.
- Payload does **not** include answer values.

---

## Phase 5 — Partners and groups

### PRT-001 — Create a partner

| Field | Value |
| ----- | ----- |
| **Feature area** | Partners and projects |
| **Roles** | Org admin |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

You are engaging Acme CNC as a supplier on a joint prototype.

**Objective**

Create a partner record for the training supplier.

**Steps**

1. Open **Partners and projects**.
2. Click on the `Partners` tab.
3. Select the `New partner` button.
4. Create partner (for example **Acme CNC**).
5. Confirm partner appears in the partners hub.

**Success criteria**

- Partner detail page opens.
- External identities section is available.

---

### PRT-002 — Create an organization-scoped project

| Field | Value |
| ----- | ----- |
| **Feature area** | Partners → Projects |
| **Roles** | Org admin or project creator |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

Internal training work should not mix with partner-scoped data.

**Objective**

Create org-scoped project **Training Lab**.

**Steps**

1. From partners hub, open **Create project**.
2. Name **Training Lab**, scope to organization.
3. Open project in **Drive** from control projects.

**Success criteria**

- Project listed as organization scoped.
- Drive workspace opens empty or with upload hint.

---

### PRT-003 — Create a partner-scoped project

| Field | Value |
| ----- | ----- |
| **Feature area** | Partners → Projects |
| **Roles** | Org admin |
| **Prerequisites** | PRT-001 |
| **Estimated time** | 15 min |

**Context**

Prototype work with Acme CNC should be isolated to that partnership.

**Objective**

Create a project scoped to **Acme CNC** only.

**Steps**

1. Create project linked to **Acme CNC**.
2. Verify scope shows partner name on project row.

**Success criteria**

- Project appears under partner scope filter.
- Drive for project is distinct from **Training Lab**.

---

### PRT-004 — Invite a partner external user

| Field | Value |
| ----- | ----- |
| **Feature area** | Partners → External identities |
| **Roles** | Org admin |
| **Prerequisites** | PRT-001 |
| **Estimated time** | 20 min |

**Context**

Acme's machinist needs shared project access without full org membership.

**Objective**

Invite `external-user@example.com` as external identity on the partner.

**Steps**

1. Go to Settings > Identities > Users
2. Click on the `+` button to create a new user
3. In the modal, fill out the user details
4. Select the `External user` checkbox. This will provide a new dropdown
5. Select the partner this new user will belong to. (Note this requires
the desired partner to already exist)
6. Select the checkmark icon to create the user.

**Success criteria**

- External identity appears in partner list (pending or active).
- Invitation emails are sent to the external user.

---

### PRT-005 — Partner external user experience

| Field | Value |
| ----- | ----- |
| **Feature area** | Getting started; Partner shell |
| **Roles** | External partner user |
| **Prerequisites** | PRT-004 accepted |
| **Estimated time** | 15 min |

**Context**

External users see a reduced shell focused on shared work.

**Objective**

Sign in as external user and map available navigation.

**Steps**

1. Accept invitation and sign in as `external-user@example.com`.
2. Open **Getting started** and follow partner path.
3. Confirm **Drive** and **Transfers** availability.
4. Confirm **Policies**, **Settings**, and admin routes are absent.

**Success criteria**

- Partner getting-started steps match external context.
- Shared project Drive is reachable.
- Admin-only areas are not in the nav.

---

### PRT-006 — Assign project data custodian

| Field | Value |
| ----- | ----- |
| **Feature area** | Projects → Data custodian |
| **Roles** | Org admin |
| **Prerequisites** | PRT-002; ADM-006 helpful |
| **Estimated time** | 15 min |

**Context**

Gated policy actions on a project require a named custodian for approvals.

**Objective**

Assign a data custodian to **Training Lab** project.

**Steps**

1. Click the ellipsis on the project's card → **Data custodian**.
2. Select an org member from roster.
3. Open project **Drive** and confirm custodian warning is cleared.

Note, you can only assign a data custodian to a project that has been
assigned as a data custodian in settings. If you see that there are no
available data custodians to add to a project, go to Settings > Security > `Add custodian`.
Once you have completed this, that user will be available to be assigned as a data
custodian at the project level.

**Success criteria**

- Custodian name visible on project.
- Drive no longer warns that gate actions may be blocked.

---

### PRT-007 — Multi-partner project

| Field | Value |
| ----- | ----- |
| **Feature area** | Partners → Projects |
| **Roles** | Org admin |
| **Prerequisites** | Two partners exist |
| **Estimated time** | 15 min |

**Context**

A design review involves two suppliers who both need scoped access.

**Objective**

Create a project scoped to multiple partners.

**Steps**

1. Create project selecting two partners.
2. Verify both appear on project detail.

**Success criteria**

- Project lists every selected partner.
- Partner-scoped Drive or access rules respect multi-partner scope.

---

### PRT-008 — Revoke partner external access

| Field | Value |
| ----- | ----- |
| **Feature area** | Partners → External identities |
| **Roles** | Org admin |
| **Prerequisites** | PRT-004 |
| **Estimated time** | 15 min |

**Context**

Contract with Acme ended; external login must stop.

**Objective**

Disable or revoke external identity for `external-user@example.com`.

**Steps**

1. Go to Settings > Identities > Users  and find the target user.
2. Click on the user row.
3. Select `Suspend`.

**Success criteria**

- Identity status reflects disabled/revoked.
- External user cannot access partner workspace.

---

### GRP-001 — Create a group for policy targeting

| Field | Value |
| ----- | ----- |
| **Feature area** | Groups |
| **Roles** | Org admin |
| **Prerequisites** | ADM-001 (trainee user exists) |
| **Estimated time** | 15 min |

**Context**

Policies reference groups by SRN; you need a group for Engineering or
External Counsel exercises.

**Objective**

Create **External Counsel** group and add members.

**Steps**

1. Open **Groups** → create group **External Counsel**.
2. Add `trainee@example.com` and one other member.
3. Copy group SRN for use in POL-001.

**Success criteria**

- Group appears in groups list with members.
- SRN format accepted in policy editor.

---

### GRP-002 — Remove user from group

| Field | Value |
| ----- | ----- |
| **Feature area** | Groups → Membership |
| **Roles** | Org admin |
| **Prerequisites** | GRP-001; POL-001 attached |
| **Estimated time** | 10 min |

**Context**

A contractor's engagement ended; group membership must reflect that
immediately.

**Objective**

Remove a user from **External Counsel** and verify policy effect.

**Steps**

1. Remove `trainee@example.com` from the group.
2. As that user, attempt a policy-gated download on the training folder.

**Success criteria**

- User no longer listed as group member.
- Policy denies access that previously succeeded (if user was in scope
  before).

---

## Phase 6 — Admin and security (Settings)

### ADM-001 — Onboard a new user and assign roles

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Identities; Authorization |
| **Roles** | Org admin |
| **Prerequisites** | None |
| **Estimated time** | 30 min |

**Context**

You onboarded a new employee who needs Stellarbridge access aligned to
their job function.

**Objective**

Create account for `trainee@example.com`, map roles, assign
after signup.

**Steps**

1. Open **Settings** → **Identities** → **Users** `+`.
2. Document planned roles (for example: transfer user, drive access, audit
   reader) based on job function.
3. Have trainee accept invitation and complete signup.
4. Open **Settings** → **Authorization** → assign mapped roles.
5. Sign in as trainee and verify sidebar matches expectations.

**Success criteria**

- User status is active after signup.
- Assigned roles visible on authorization tab.
- Trainee capabilities match role design (no admin UI unless intended).

---

### ADM-002 — Suspend user during investigation

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Identities → Suspend / disable |
| **Roles** | Org admin |
| **Prerequisites** | ADM-001 |
| **Estimated time** | 10 min |

**Context**

Suspicious behavior from the new hire; security requires immediate login
block while preserving audit history.

**Objective**

Block `trainee@example.com` from using Stellarbridge.

**Steps**

1. Open **Settings** > **Identities** > **Users**.
2. Locate `trainee@example.com`.
3. **Suspend** the user (per UI).
4. Attempt sign-in as that user.

**Success criteria**

- User cannot authenticate or use the portal.
- Historical audit events for the user remain queryable.

---

### ADM-003 — Export audit logs for a user

| Field | Value |
| ----- | ----- |
| **Feature area** | Audit → Export |
| **Roles** | Audit reader / org admin |
| **Prerequisites** | ADM-001 with user activity |
| **Estimated time** | 15 min |

**Context**

Security is investigating what `trainee@example.com` did in the
platform.

**Objective**

Find all audit activity for the user and export logs.

**Steps**

1. Open **Audit** → event stream.
2. Filter by user `trainee@example.com` (or email identity).
3. Open event details on at least one row.
4. **Download** or export audit logs.
5. Deliver export to security (simulated for training).

**Success criteria**

- Filtered view shows only target user's events.
- Export file downloads successfully.
- Export contains events from before suspension (ADM-002).

---

### ADM-004 — Cancel a pending invitation

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Identities |
| **Roles** | Org admin |
| **Prerequisites** | A pending invite (create disposable email invite) |
| **Estimated time** | 10 min |

**Context**

You invited the wrong email address; the link must not be usable.

**Objective**

Cancel a pending invitation and verify the link fails.

**Steps**

1. Invite a disposable test email; do not accept.
2. Cancel the pending invitation.
3. Open the invitation URL.

**Success criteria**

- Invitation no longer listed as pending.
- Link shows invitation no longer valid feedback.

---

### ADM-006 — Add organization data custodian

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Security → Data custodians |
| **Roles** | Org admin |
| **Prerequisites** | None |
| **Estimated time** | 10 min |

**Context**

Gate approvals route to org-level custodians when project custodian is
unset.

**Objective**

Add a data custodian at organization level.

**Steps**

1. Open **Settings** → **Security**.
2. **Add data custodian** → select org member.
3. Confirm custodian appears in list.

**Success criteria**

- Custodian listed under organization settings.
- Same user selectable on project custodian picker (PRT-006).

---

### ADM-007 — Org security default: lock transfers to org

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Security |
| **Roles** | Org admin |
| **Prerequisites** | None |
| **Estimated time** | 15 min |

**Context**

Security policy requires all new transfers to default to org-only access.

**Objective**

Enable **Lock transfers to org by default** and verify on new transfer.

**Steps**

1. Open **Settings** → **Security**.
2. Enable lock transfers to org by default.
3. Create a new transfer without manually toggling org-lock.

**Success criteria**

- New transfer has org-lock pre-enabled.
- Behavior matches TRN-005 expectations.

---

### ADM-008 — Create and rotate agent API key

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Identities → Agents |
| **Roles** | Org admin |
| **Prerequisites** | None |
| **Estimated time** | 25 min |

**Context**

CI must upload build artifacts via API without a human session.

**Objective**

Create an agent identity, use the API key, rotate it, invalidate old key.

**Steps**

1. Open **Settings** → **Identities** → **Agents** → create agent.
2. Copy API key on creation (shown once).
3. Make a test API call (documented agent endpoint or upload path).
4. **Rotate** API key.
5. Retry with old key → expect failure; new key → success.

**Success criteria**

- Agent appears in agents list.
- Old key rejected after rotation.
- New key works.

---

### ADM-009 — Enable Forms feature for organization

| Field | Value |
| ----- | ----- |
| **Feature area** | Settings → Features |
| **Roles** | Org admin |
| **Prerequisites** | None |
| **Estimated time** | 5 min |

**Context**

Forms exercises require the feature toggle for the tenant.

**Objective**

Enable Forms and confirm navigation for eligible users.

**Steps**

1. Open **Settings** → **Beta** toggles section.
2. Enable **Forms** for the organization.
3. Refresh session; confirm **Forms** nav item appears.

**Success criteria**

- Feature toggle persists after reload.
- Form catalog route loads for members.

---

## Phase 7 — Investigation

### AUD-001 — Filter audit event stream

| Field | Value |
| ----- | ----- |
| **Feature area** | Audit → Event stream |
| **Roles** | Audit reader |
| **Prerequisites** | Activity from prior phases |
| **Estimated time** | 15 min |

**Context**

You need to narrow thousands of events to one transfer or user.

**Objective**

Apply filters on audit event stream and inspect flow details.

**Steps**

1. Open **Audit**.
2. Apply filter (user, event type, or date range).
3. Open a grouped flow row → view details including raw payload.

**Success criteria**

- Filtered list excludes non-matching events.
- Detail modal shows structured and raw payload sections.

---

### AUD-002 — Transfer audit mode

| Field | Value |
| ----- | ----- |
| **Feature area** | Audit → Transfer audit |
| **Roles** | Audit reader |
| **Prerequisites** | TRN-001 |
| **Estimated time** | 15 min |

**Context**

Operations reviews all transfers from a compliance lens, not only generic
events.

**Objective**

Switch to transfer audit, manage freeze/lock, generate custody report.

**Steps**

1. Open **Audit** → **Transfer audit** tab or mode.
2. Locate transfer from TRN-001.
3. Toggle freeze and org-lock from row actions.
4. Generate custody report from the same row.

**Success criteria**

- Transfer audit rows match transfer history.
- Freeze/lock toggles match TRN-009 and TRN-005 behavior.
- Custody report modal completes (see TRN-007).

---

### AUD-003 — Data flow identity lens

| Field | Value |
| ----- | ----- |
| **Feature area** | Data flow (beta) |
| **Roles** | Admin or audit-capable user |
| **Prerequisites** | ADM-001 user with activity |
| **Estimated time** | 15 min |

**Context**

Security asks what data a specific user touched across projects and
transfers.

**Objective**

Visualize data flow for `trainee@example.com`.

**Steps**

1. Open **Data flow**.
2. Select **Identity** lens.
3. Choose `trainee@example.com` from dropdown.
4. Explore graph nodes and edges.

**Success criteria**

- Graph renders for selected identity.
- Known actions (transfer, drive, login) appear as connected flows.

---

### AUD-004 — Data flow project lens

| Field | Value |
| ----- | ----- |
| **Feature area** | Data flow (beta) |
| **Roles** | Admin or project owner |
| **Prerequisites** | PRT-002 with Drive/transfers activity |
| **Estimated time** | 15 min |

**Context**

Compliance review focuses on one customer project.

**Objective**

View data flow graph for **Training Lab** project.

**Steps**

1. Open **Data flow** → **Project** lens.
2. Select **Training Lab**.
3. Identify identities and transfers connected to the project.

**Success criteria**

- Project-centric graph displays.
- Connections match files and transfers created in training.

---

### AUD-005 — Data flow partner lens

| Field | Value |
| ----- | ----- |
| **Feature area** | Data flow (beta) |
| **Roles** | Org admin |
| **Prerequisites** | PRT-001, PRT-004 |
| **Estimated time** | 15 min |

**Context**

Before offboarding Acme CNC, you must see all data flows involving that
partner.

**Objective**

Use partner lens on **Acme CNC**.

**Steps**

1. Open **Data flow** → **Partner** lens.
2. Select **Acme CNC**.
3. Document transfers, projects, and identities in the graph.

**Success criteria**

- Partner graph includes linked project and external identity flows.
- Useful for offboarding checklist (pairs with PRT-008).

---

## Phase 8 — Productivity

### PRD-001 — Command palette navigation

| Field | Value |
| ----- | ----- |
| **Feature area** | Global search / command palette |
| **Roles** | Any signed-in user |
| **Prerequisites** | None |
| **Estimated time** | 5 min |

**Context**

Power users navigate faster without mouse-driven sidebar clicks.

**Objective**

Open command palette and jump to Policies, Drive, and Settings.

**Steps**

1. From dashboard, press command palette (Ctrl/CMD)+g.
2. Search **Policies** → navigate.
3. Repeat for **Drive** and **Settings**.

**Success criteria**

- Palette opens on shortcut.
- Enter navigates to correct route each time.

---

### PRD-002 — File workspace bootstrap wizard

| Field | Value |
| ----- | ----- |
| **Feature area** | Command palette → Set up file workspace |
| **Roles** | Org admin |
| **Prerequisites** | Greenfield training tenant or isolated test org |
| **Estimated time** | 30 min |

**Context**

A new org needs baseline project, groups, and policies in one guided flow.

**Objective**

Run **Set up file workspace** from command palette and complete wizard.

**Steps**

1. Open command palette (Ctrl/Cmd + g) → **Set up file workspace**.
2. Complete wizard steps (project, groups, baseline policies per prompt).
3. Verify Drive project, groups list, and policies list.

**Success criteria**

- Configured project Drive workspace exists.
- Configured groups exist.
- Baseline policies exist and are attachable.

---

## Feature coverage matrix

| Product area | Scenarios |
| ------------ | --------- |
| Transfers (upload, stream, request) | TRN-001 – TRN-010 |
| Transfer security (password, org-lock, freeze, revoke) | TRN-004 – TRN-006, TRN-009 – TRN-010, TRN-005 |
| Transfer compliance (custody, add to Drive) | TRN-007, TRN-008 |
| Drive workspace and file ops | DRV-001 – DRV-005 |
| Drive tags and search | DRV-005, DRV-006 |
| Drive policy attachment and custody | DRV-007, DRV-008 |
| Policies (create, version, fork, test) | POL-001 – POL-004 |
| Gate approval and policy decisions | POL-005, POL-006, PRT-006, ADM-006 |
| Forms (catalog, publish, responses, archive) | FRM-001 – FRM-006 |
| Forms + transfers | FRM-007 |
| Forms audit | FRM-008 |
| Partners, projects, external users | PRT-001 – PRT-008 |
| Groups | GRP-001, GRP-002 |
| User lifecycle and roles | ADM-001 – ADM-004, ADM-002 |
| MFA and account security | ADM-005 |
| Org security settings | ADM-006, ADM-007 |
| Agent identities | ADM-008 |
| Feature toggles | ADM-009 |
| Audit and investigation | ADM-003, AUD-001, AUD-002 |
| Data flow (beta) | AUD-003 – AUD-005 |
| Productivity | PRD-001, PRD-002 |

---

## Facilitator notes

### Suggested workshop schedule (full curriculum)

| Day | Modules | Scenario IDs |
| --- | ------- | -------------- |
| Half day 1 AM | Transfers | TRN-001 – TRN-006 |
| Half day 1 PM | Transfers + Drive intro | TRN-007 – TRN-010, DRV-001 – DRV-004 |
| Half day 2 AM | Drive + Policies | DRV-005 – DRV-008, POL-001 – POL-003 |
| Half day 2 PM | Gate + Forms | POL-004 – POL-006, FRM-001 – FRM-004 |
| Full day 3 | Partners, admin, audit | PRT-*, GRP-*, ADM-*, AUD-*, FRM-005 – FRM-008 |

### Reset between cohorts

- Remove or suspend `trainee@example.com` and re-invite.
- Revoke open upload requests and delete test transfers past retention.
- Archive or delete training forms and publications.
- Keep partner **Acme CNC** or delete if no blocking dependencies.

### Known beta / flag-gated items

- **P2P Stream** — beta tab on New Transfer.
- **Data flow** — beta nav item; graphs require sufficient activity data.
- **Forms** — requires tenant feature toggle (ADM-009).

---

## Completion checklist

Copy for each trainee:

```
[ ] Phase 1  Transfers      TRN-001 – TRN-010
[ ] Phase 2  Drive          DRV-001 – DRV-008
[ ] Phase 3  Policies       POL-001 – POL-006
[ ] Phase 4  Forms          FRM-001 – FRM-008
[ ] Phase 5  Partners       PRT-001 – PRT-008, GRP-001 – GRP-002
[ ] Phase 6  Admin          ADM-001 – ADM-009
[ ] Phase 7  Investigation  AUD-001 – AUD-005
[ ] Phase 8  Productivity   PRD-001 – PRD-002
```

---

*Last updated: 2026-07-06. Align scenario steps with the current UI labels
in your tenant; feature names may shift slightly between releases.*
