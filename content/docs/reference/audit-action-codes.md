---
title: Audit action codes
description: Auto-generated audit action codes (what happened) from stellarbridge-app.
weight: 20
tags: [reference, audit, generated]
---

> Auto-generated from `stellarbridge-app`. Do not edit by hand.
> Regenerate: `task docs:sync` in the stllr repo.

Look up a numeric code or constant name to see its meaning.

| Code | Title | Description | Category |
|------|-------|-------------|----------|
| 1000 | ActionUserCreate | New user account creation | ActionUserCreate User TargetAccount Actions (1000-1099) |
| 1001 | ActionUserUpdate | Update user account information |  |
| 1002 | ActionUserDelete | Delete user account and associated data |  |
| 1003 | ActionUserLoginSuccess | User authentication successful |  |
| 1004 | ActionUserLoginFailed | User authentication failed |  |
| 1005 | ActionUserLogout | User session termination |  |
| 1100 | ActionMfaSetup | Two-factor authentication setup | ActionMfaSetup MFA Actions (1100-1199) |
| 1101 | ActionMfaVerify | Two-factor authentication verification |  |
| 1102 | ActionMfaDisable | Disable two-factor authentication |  |
| 1200 | ActionAuth0UserDelete | Delete user from Auth0 | ActionAuth0Management Auth0 Actions (1200-1299) |
| 1201 | ActionAuth0UserBlock | Block user in Auth0 |  |
| 1202 | ActionAuth0UserUnblock | Unblock user in Auth0 |  |
| 1203 | ActionAuth0PasswordReset | Send Auth0 password reset |  |
| 1204 | ActionAuth0OrgMemberAdd | Add member to Auth0 organization |  |
| 1205 | ActionAuth0OrgMemberRemove | Remove member from Auth0 organization |  |
| 1206 | ActionAuth0OrgInvitationsList | List Auth0 organization invitations |  |
| 1207 | ActionAuth0OrgMembersList | List Auth0 organization members |  |
| 1208 | ActionAuth0OrgInvitationCreate | Create Auth0 organization invitation |  |
| 1209 | ActionAuth0OrgInvitationDelete | Delete Auth0 organization invitation |  |
| 1210 | ActionAuth0OrgMFARequiredSet | Set Auth0 organization MFA requirement |  |
| 1211 | ActionAuth0ConnectionCreate | Create Auth0 connection |  |
| 1212 | ActionAuth0ConnectionDelete | Delete Auth0 connection |  |
| 1213 | ActionAuth0ConnectionEnableForOrg | Enable Auth0 connection for organization |  |
| 1214 | ActionAuth0SCIMEnable | Enable Auth0 SCIM |  |
| 1215 | ActionAuth0SCIMDisable | Disable Auth0 SCIM |  |
| 1216 | ActionAuth0SCIMRotateToken | Rotate Auth0 SCIM token |  |
| 1217 | ActionAuth0OrgMetadataUpdate | Update Auth0 organization metadata |  |
| 1218 | ActionAuth0UserLoginInitiated | A user initiated login and has been redirected to the IdP successfully |  |
| 1300 | ActionApiKeyCreate | Create API key | API Key Actions (1300-1399) |
| 1301 | ActionApiKeyDelete | Delete API key |  |
| 1302 | ActionApiKeyRevoke | Revoke API key |  |
| 1303 | ActionApiKeyRotate | Rotate API key |  |
| 1304 | ActionApiKeyRotateAll | Rotate all API keys for organization |  |
| 2000 | ActionFileUploadInit | Initialize file upload process | ActionFileUploadInit File TargetTransfer Actions (2000-2099) |
| 2001 | ActionFileUploadComplete | Complete file upload process |  |
| 2002 | ActionFileDownloadInit | Initialize file download process |  |
| 2003 | ActionFileDownloadComplete | Complete file download process |  |
| 2004 | ActionFileDelete | Delete file from storage |  |
| 2005 | ActionFileInfoAccess | Info page for file download was accessed |  |
| 2100 | ActionStorageBucketCreate | Create new storage bucket | ActionStorageBucketCreate TargetStorage Actions (2100-2199) |
| 2101 | ActionStorageBucketDelete | Delete storage bucket |  |
| 2102 | ActionStorageObjectProtect | Enable password protection for object |  |
| 2103 | ActionStorageObjectUnprotect | Disable password protection for object |  |
| 3000 | ActionPaymentSubscribe | New subscription creation | ActionPaymentSubscribe Subscription/Payment Actions (3000-3099) |
| 3001 | ActionPaymentUnsubscribe | Subscription cancellation |  |
| 3002 | ActionPaymentUpdate | Update payment information |  |
| 3003 | TrialStart | Begin trial subscription period |  |
| 3004 | ActionPaymentTrialEnd | End trial subscription period |  |
| 4000 | ActionSystemHealthCheck | System health status verification | ActionSystemHealthCheck System Actions (4000-4099) |
| 4001 | ActionSystemConfigUpdate | System configuration update |  |
| 4002 | ActionSystemBackup | System data backup |  |
| 5000 | ActionNotificationSend | Send user notification | ActionNotificationSend Notification Actions (5000-5099) |
| 5001 | ActionNotificationSettingsUpdate | Update notification preferences |  |
| 5002 | ActionTransferToggleOrgLock | Toggle organization lock |  |
| 5003 | ActionTransferTogglerOrgUnlock | Toggle organization unlock |  |
| 5004 | ActionDatabaseTransaction | TargetDatabase transaction |  |
| 5005 | ActionDatabaseTransactionRollback | TargetDatabase transaction rollback |  |
| 5006 | ActionChainOfCustodyReportRequested | Chain of custody report requested |  |
| 5007 | ActionTransferOwnershipChange | Transfer ownership changed (e.g. on account deletion) |  |
| 6000 | ActionPolicyDecisionAllow | Policy engine allowed the action | Policy decision actions (6000-6099) - policy engine allow/deny for audit/OCSF |
| 6001 | ActionPolicyDecisionDeny | Policy engine denied the action |  |
| 6100 | ActionPolicyCreate | Create access policy | Policy CRUD actions (6100-6199) - access policy authoring |
| 6101 | ActionPolicyDelete | Delete access policy |  |
| 6102 | ActionPolicyUpdate | Update access policy |  |
| 6103 | ActionPolicyList | List access policies |  |
| 6104 | ActionPolicyGet | Get access policy by ID |  |
| 6105 | ActionPolicyVersionCreate | Create policy version |  |
| 6106 | ActionPolicyVersionActivate | Activate policy version |  |
| 6107 | ActionPolicyExport | Export policy document |  |
| 6108 | ActionPolicyImport | Import policy document |  |
| 6109 | ActionPolicyEvaluate | Evaluate access policy scenario |  |
| 6200 | ActionNetworkRuleCreate | Create network rule | Network rule actions (6200-6299) |
| 6201 | ActionNetworkRuleDelete | Delete network rule |  |
| 6202 | ActionNetworkRuleUpdate | Update network rule |  |
| 6203 | ActionNetworkRuleList | List network rules |  |
| 6300 | ActionVfsObjectCreate | Create VFS object (file or folder) | VFS object actions (6300-6399) |
| 6301 | ActionVfsObjectDelete | Delete VFS object |  |
| 6302 | ActionVfsObjectUpdate | Update VFS object (rename/move) |  |
| 6303 | ActionVfsObjectList | List VFS objects |  |
| 6304 | ActionVfsObjectGet | Get VFS object |  |
| 6305 | ActionVfsUploadURL | Generate upload URL for VFS file |  |
| 6306 | ActionVfsUploadComplete | Complete VFS file upload |  |
| 6307 | ActionVfsDownloadURL | Generate download URL for VFS file |  |
| 6308 | ActionVfsPolicyAttachmentCreate | Attach policy to VFS object |  |
| 6309 | ActionVfsPolicyAttachmentDelete | Remove policy attachment from VFS object |  |
| 6310 | ActionVfsObjectShare | Share file via email link (Drive or transfer) |  |
| 6311 | ActionVfsObjectSecureView | Start secure viewer session (pixel-stream pod) |  |
| 6400 | ActionSupportNotifyPolicyDenial | Notify admin of policy denial | Support actions (6400-6499) |
| 6401 | ActionSupportGateApprove | Approve gate request via token |  |
| 6500 | ActionTermsAccept | Accept terms of service | Terms actions (6500-6599) |
| 6501 | ActionTermsGet | Get current terms |  |
| 6600 | ActionPartnerCreate | Create partner | Tenancy actions (6600-6699) - partners and projects |
| 6601 | ActionPartnerDelete | Delete partner |  |
| 6602 | ActionPartnerList | List partners |  |
| 6610 | ActionProjectCreate | Create project |  |
| 6611 | ActionProjectDelete | Delete project |  |
| 6612 | ActionProjectUpdate | Update project |  |
| 6613 | ActionProjectList | List projects |  |
| 6614 | ActionProjectGet | Get project by ID |  |
| 6620 | ActionIdentityCreate | Create agent identity | Identity (agent identity) actions (6620-6629) |
| 6621 | ActionIdentityUpdate | Update agent identity |  |
| 6622 | ActionIdentityDelete | Delete agent identity |  |
| 6630 | ActionGroupCreate | Create group | Group actions (6630-6639) |
| 6631 | ActionGroupUpdate | Update group |  |
| 6632 | ActionGroupDelete | Delete group |  |
| 6640 | ActionPartnerIdentityCreate | Create partner external identity | Partner external identity actions (6640-6649) |
| 6641 | ActionPartnerIdentityUpdate | Update partner external identity |  |
| 6642 | ActionPartnerIdentityRevoke | Revoke partner external identity |  |
| 6643 | ActionPartnerIdentityDelete | Delete partner external identity |  |
| 6700 | ActionDataFlowRead | Query data flow topology, activity, overview, or story | Data flow visualization (6700-6709) |
| 6710 | ActionTagCreated | Tag catalog entry created | Platform tags (6710-6719) |
| 6711 | ActionTagUpdated | Tag catalog entry updated |  |
| 6712 | ActionTagDeleted | Tag catalog entry soft-deleted |  |
| 6713 | ActionTagAssigned | Tag assigned to resource |  |
| 6714 | ActionTagUnassigned | Tag unassigned from resource |  |
| 6720 | ActionFormCreated | Form definition created | Platform forms (6720-6729) |
| 6721 | ActionFormUpdated | Form definition updated |  |
| 6722 | ActionFormArchived | Form definition archived |  |
| 6723 | ActionFormPublished | Form publication created |  |
| 6724 | ActionFormPublicationRevoked | Form publication revoked |  |
| 6725 | ActionFormSubmitted | Form response submitted (field keys only in audit) |  |

