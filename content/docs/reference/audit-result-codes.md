---
title: Audit result codes
description: Auto-generated audit result codes (outcome) from stellarbridge-app.
weight: 20
tags: [reference, audit, generated]
---

> Auto-generated from `stellarbridge-app`. Do not edit by hand.
> Regenerate: `task docs:sync` in the stllr repo.

Look up a numeric code or constant name to see its meaning. Codes are grouped by category.

## Authentication/Authorization

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 10000 | MessageAccessDenied | access denied |
| 10001 | MessageInvalidCredentials | invalid credentials |
| 10002 | MessageTokenExpired | token expired |
| 10003 | MessageSessionInvalid | session invalid |
| 10004 | MessageSessionNotFound | could not get session from store |
| 10005 | MessageSessionNotSaved | could not save to session |

</div>

## TargetDatabase

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 11000 | MessageDatabaseRecordDeleteError | could not delete object from database |
| 11001 | MessageDatabaseWriteError | could not write to the database |
| 11002 | MessageDatabaseReadError | could not read from database |
| 11003 | MessageDatabaseConnectError | could not connect to database |
| 11004 | MessageRecordNotFound | record not found |
| 11005 | MessageDuplicateRecord | duplicate record |

</div>

## Validation

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 12000 | MessageInvalidInput | invalid input provided |
| 12001 | MessageValidationFailed | validation failed |
| 12002 | MessageRequiredFieldMissing | required field missing |
| 12003 | MessageInvalidFormat | invalid format |

</div>

## Network/HTTP

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 13000 | MessageRequestTimeout | request timed out |
| 13001 | MessageServiceUnavailable | service unavailable |
| 13002 | MessageInvalidRequest | invalid request |
| 13003 | MessageRateLimitExceeded | rate limit exceeded |
| 14000 | MessageResourceNotFound | resource not found |
| 14001 | MessageResourceLocked | resource locked |
| 14002 | MessageResourceExhausted | resource exhausted |
| 14003 | MessageQuotaExceeded | quota exceeded |

</div>

## Processing

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 15000 | MessageProcessingFailed | processing failed |
| 15001 | MessageOperationCancelled | operation cancelled |
| 15002 | MessageAsyncTaskFailed | asynchronous task failed |

</div>

## Configuration

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 16000 | MessageConfigInvalid | invalid configuration |
| 16001 | MessageEnvVarMissing | environment variable missing |

</div>

## External Services

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 17000 | MessageExternalAPIError | external api error |
| 17001 | MessageIntegrationFailed | integration failed |

</div>

## State

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 18000 | MessageInvalidState | invalid state |
| 18001 | MessageStateTransitionError | state transition error |

</div>

## System

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 19000 | MessageInternalError | internal error |
| 19001 | MessageMaintenanceMode | system in maintenance mode |
| 19002 | MessageOperationSuccess | operation was successful |

</div>

## TargetStorage

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 20000 | MessageStorageContainerCheckError | error checking the availability of a storage account |
| 20001 | MessageStorageContainerCreateError | could not create storage container |
| 20002 | MessageStorageContainerCreated | create the storage container successfully |
| 20003 | MessageStorageContainerFileDownloaded | a file has been downloaded from storage container |
| 20004 | MessageStorageContainerFileInfoPageAccessed | a remote user has reached the info page for a download item |
| 20005 | MessageStorageContainerObjectDeleted | an object has been deleted from a storage container |
| 20006 | MessageStorageContainerObjectProtectionStatusChanged | an objects protection status has been updated |
| 20007 | MessageStorageContainerObjectFailedAccess | bad password for access on protected object |
| 20008 | MessageStorageContainerObjectDeleteError | could not delete object from storage account |
| 20008 | MessageStorageContainerObjectLockToOrgStatusChanged | an objects lock to org status has been updated |
| 20009 | MessageStorageContainerMultipartUploadStartError | error starting multipart upload |
| 20010 | MessageStorageContainerMultipartUploadStarted | multipart upload started |

</div>

## TargetAccount Messages

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 21000 | MessageAccountDeletedAccount | a user deleted their account |
| 21001 | MessageAccountUpdatedEmail | a user has updated their email address |
| 21002 | MessageAccountUpdateMFASettingsSuccess | a user has updated their MFA settings |
| 21003 | MessageAccountUpdateMFASettingsFailure | failed to update MFA settings for account |
| 21004 | MessageAccountUpdatedName | a user has updated their name |
| 21005 | MessageAccountUpdatedNotificationSettings | a user has updated their notification settings |
| 21006 | MessageAccountUpdatedPassword | a user has updated their password |
| 21007 | MessageAccountUserLoginSuccess | a user has logged into their account |
| 21008 | MessageAccountUserLogoutSuccess | a user has logged out of their account |
| 21009 | MessageAccountUpdated | a user has updated their account |
| 21010 | MessageAccountUpdateFailure | failure in updating user account |
| 21011 | MessageAccountDeleteFailure | failure in deleting account |

</div>

## TargetTransfer actions

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 23000 | MessageTransferCreateError | error creating a transfer |
| 23001 | MessageTransferCreateSuccess | successfully created a transfer |
| 23002 | MessageTransferOrgLogSuccess | successfully created a transfer log |
| 23003 | MessageTransferOrgLockError | error creating a transfer log |
| 23004 | MessageTransferOrgUnlockSuccess | successfully created a transfer log |
| 23005 | MessageTransferOrgUnlockError | error creating a transfer log |
| 23006 | MessageTransferDeleteSuccess | transfer deleted |
| 23007 | MessageTransferDeleteError | could not delete transfer |
| 24000 | MessageCasbinInitError | error initializing casbin |
| 24001 | MessageCasbinInitSuccess | successfully initialized casbin |
| 24002 | MessageInfo | info message |

</div>

## TargetAuth0 actions

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 25000 | MessageAuth0UserDeleteSuccess | auth0 user deleted |
| 25001 | MessageAuth0UserDeleteError | could not delete auth0 user |
| 25002 | MessageAuth0UserBlockSuccess | auth0 user blocked |
| 25003 | MessageAuth0UserBlockError | could not block auth0 user |
| 25004 | MessageAuth0UserUnblockSuccess | auth0 user unblocked |
| 25005 | MessageAuth0UserUnblockError | could not unblock auth0 user |
| 25006 | MessageAuth0PasswordResetSuccess | auth0 password reset sent |
| 25007 | MessageAuth0PasswordResetError | could not send auth0 password reset |
| 25008 | MessageAuth0OrgInvitationCreateSuccess | auth0 organization invitation created |
| 25009 | MessageAuth0OrgInvitationCreateError | could not create auth0 organization invitation |
| 25010 | MessageAuth0OrgInvitationDeleteSuccess | auth0 organization invitation deleted |
| 25011 | MessageAuth0OrgInvitationDeleteError | could not delete auth0 organization invitation |
| 25012 | MessageAuth0OrgMFARequiredSetSuccess | auth0 organization MFA requirement updated |
| 25013 | MessageAuth0OrgMFARequiredSetError | could not update auth0 organization MFA requirement |
| 25014 | MessageAuth0UserLoginInitiatedSuccess | A user initiated login and has been redirected to the IdP successfully |

</div>

## API Key messages (25015-25024)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 25015 | MessageApiKeyCreateSuccess | API key created |
| 25016 | MessageApiKeyCreateError | could not create API key |
| 25017 | MessageApiKeyDeleteSuccess | API key deleted |
| 25018 | MessageApiKeyDeleteError | could not delete API key |
| 25019 | MessageApiKeyRevokeSuccess | API key revoked |
| 25020 | MessageApiKeyRevokeError | could not revoke API key |
| 25021 | MessageApiKeyRotateSuccess | API key rotated |
| 25022 | MessageApiKeyRotateError | could not rotate API key |
| 25023 | MessageApiKeyRotateAllSuccess | all API keys rotated for organization |
| 25024 | MessageApiKeyRotateAllError | could not rotate all API keys |

</div>

## Policy decision messages (26000-26099) - policy engine allow/deny for OCSF

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 26000 | MessagePolicyDecisionAllow | Policy engine allowed the action |
| 26001 | MessagePolicyDecisionDeny | Policy engine denied the action |

</div>

## Policy CRUD messages (27000-27099)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27000 | MessagePolicyCreateSuccess | access policy created |
| 27001 | MessagePolicyCreateError | could not create access policy |
| 27002 | MessagePolicyDeleteSuccess | access policy deleted |
| 27003 | MessagePolicyDeleteError | could not delete access policy |
| 27004 | MessagePolicyUpdateSuccess | access policy updated |
| 27005 | MessagePolicyUpdateError | could not update access policy |
| 27006 | MessagePolicyVersionCreateSuccess | policy version created |
| 27007 | MessagePolicyVersionCreateError | could not create policy version |
| 27008 | MessagePolicyVersionActivateSuccess | policy version activated |
| 27009 | MessagePolicyVersionActivateError | could not activate policy version |
| 27010 | MessagePolicyExportSuccess | policy document exported |
| 27011 | MessagePolicyExportError | could not export policy document |

</div>

## Network rule messages (27100-27199)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27100 | MessageNetworkRuleCreateSuccess | network rule created |
| 27101 | MessageNetworkRuleCreateError | could not create network rule |
| 27102 | MessageNetworkRuleDeleteSuccess | network rule deleted |
| 27103 | MessageNetworkRuleDeleteError | could not delete network rule |
| 27104 | MessageNetworkRuleUpdateSuccess | network rule updated |
| 27105 | MessageNetworkRuleUpdateError | could not update network rule |

</div>

## VFS messages (27200-27299)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27200 | MessageVfsObjectCreateSuccess | VFS object created |
| 27201 | MessageVfsObjectCreateError | could not create VFS object |
| 27202 | MessageVfsObjectDeleteSuccess | VFS object deleted |
| 27203 | MessageVfsObjectDeleteError | could not delete VFS object |
| 27204 | MessageVfsObjectUpdateSuccess | VFS object updated |
| 27205 | MessageVfsObjectUpdateError | could not update VFS object |
| 27206 | MessageVfsPolicyAttachmentCreateSuccess | policy attachment created |
| 27207 | MessageVfsPolicyAttachmentCreateError | could not create policy attachment |
| 27208 | MessageVfsPolicyAttachmentDeleteSuccess | policy attachment deleted |
| 27209 | MessageVfsPolicyAttachmentDeleteError | could not delete policy attachment |
| 27210 | MessageVfsObjectShareSuccess | share link sent |
| 27211 | MessageVfsObjectShareError | could not share file |
| 27212 | MessageVfsObjectSecureViewSuccess | secure viewer session started |
| 27213 | MessageVfsObjectSecureViewRateLimited | secure viewer start rate limited |

</div>

## Support messages (27300-27399)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27300 | MessageSupportNotifyPolicyDenialSuccess | policy denial notification sent |
| 27301 | MessageSupportNotifyPolicyDenialError | could not send policy denial notification |
| 27302 | MessageSupportGateApproveSuccess | gate request approved |
| 27303 | MessageSupportGateApproveError | could not approve gate request |

</div>

## Terms messages (27400-27499)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27400 | MessageTermsAcceptSuccess | terms accepted |
| 27401 | MessageTermsAcceptError | could not record terms acceptance |
| 27402 | MessageTermsGetSuccess | terms retrieved |
| 27403 | MessageTermsGetError | could not retrieve terms |

</div>

## Tenancy messages (27500-27599)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27500 | MessagePartnerCreateSuccess | partner created |
| 27501 | MessagePartnerCreateError | could not create partner |
| 27502 | MessagePartnerDeleteSuccess | partner deleted |
| 27503 | MessagePartnerDeleteError | could not delete partner |
| 27510 | MessageProjectCreateSuccess | project created |
| 27511 | MessageProjectCreateError | could not create project |
| 27512 | MessageProjectDeleteSuccess | project deleted |
| 27513 | MessageProjectDeleteError | could not delete project |
| 27514 | MessageProjectUpdateSuccess | project updated |
| 27515 | MessageProjectUpdateError | could not update project |

</div>

## Identity (agent identity) messages (27520-27529)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27520 | MessageIdentityCreateSuccess | agent identity created |
| 27521 | MessageIdentityCreateError | could not create agent identity |
| 27522 | MessageIdentityUpdateSuccess | agent identity updated |
| 27523 | MessageIdentityUpdateError | could not update agent identity |
| 27524 | MessageIdentityDeleteSuccess | agent identity deleted |
| 27525 | MessageIdentityDeleteError | could not delete agent identity |

</div>

## Group messages (27530-27535)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27530 | MessageGroupCreateSuccess | group created |
| 27531 | MessageGroupCreateError | could not create group |
| 27532 | MessageGroupUpdateSuccess | group updated |
| 27533 | MessageGroupUpdateError | could not update group |
| 27534 | MessageGroupDeleteSuccess | group deleted |
| 27535 | MessageGroupDeleteError | could not delete group |

</div>

## Partner external identity messages (27536-27543)

<div class="gendocs-catalog-table">

| Code | Title | Description |
|------|-------|-------------|
| 27536 | MessagePartnerIdentityCreateSuccess | partner external identity created |
| 27537 | MessagePartnerIdentityCreateError | could not create partner external identity |
| 27538 | MessagePartnerIdentityUpdateSuccess | partner external identity updated |
| 27539 | MessagePartnerIdentityUpdateError | could not update partner external identity |
| 27540 | MessagePartnerIdentityRevokeSuccess | partner external identity revoked |
| 27541 | MessagePartnerIdentityRevokeError | could not revoke partner external identity |
| 27542 | MessagePartnerIdentityDeleteSuccess | partner external identity deleted |
| 27543 | MessagePartnerIdentityDeleteError | could not delete partner external identity |
| 27544 | MessageProjectListSuccess | projects listed |
| 27545 | MessageProjectListError | could not list projects |
| 27546 | MessageDataFlowReadSuccess | data flow query succeeded |
| 27547 | MessageDataFlowReadError | data flow query failed |
| 27548 | MessagePolicyEvaluateSuccess | policy scenario evaluated |
| 27549 | MessagePolicyEvaluateError | policy scenario evaluation failed |

</div>

