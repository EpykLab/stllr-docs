---
title: Roles reference
description: RBAC role and route reference for stellarbridge.
weight: 10
tags: [reference, rbac]
---

Complete list of roles, Casbin subjects, and allowed API routes.

## Summary

| Role | Casbin subject | Description |
|------|----------------|-------------|
| GlobalAdmin | admin | Global admin role - access to everything |
| TransferUser | user:bridge | Transfer user - can upload, download, and manage transfers |
| StreamUser | user:stream | Stream user - can stream and manage their streams |
| UploadUser | user:upload | Upload user - can upload and manage their uploads |
| OrgUser | user:org | Org user - basic user access to uploads, streams, transfer history and organization overview |
| OrgUserAdmin | admin:org-user | Organization user admin - can delete user accounts within organization |
| TagAdmin | admin:tag | Tag admin - manage organization tag catalog (assign on objects still requires Drive write) |
| FormAdmin | admin:form | Form admin - manage any form in the organization |
| FormsViewResponses | reader:forms-responses | Forms response reader - org-wide read of form submissions |
| RoleAdmin | admin:role | Role admin - can manage roles and permissions assigned to users within an organization |
| SecurityAnalyst | admin:security | Security analyst - can view security reports |
| NetworkAdmin | admin:network | Network admin - can manage network rules |
| DataCustodian | data:custodian | Data custodian - can generate chain of custody reports |
| TransferAdmin | admin:transfer | Org transfer administrator - can manage transfers in an organization |
| FileRequestedUser | anonymous:transfer:file-requested | File requested user - role assigned to anonymous users when a file is requested, allows them access to multipart upload handler routes |
| ServiceAccountAdmin | admin:service-account | Service account admin - role assigned to service accounts that can create and manage service accounts |
| AgentIdentityAdmin | admin:agent-identity | Agent identity admin - can create, update, delete, and rotate API keys for agent identities |
| AuditLogStreamer | audit:streamer | Audit log streamer - role assigned to users that can view audit logs |
| StorageMigration | agent:storage-migration | Storage migration – machine identity for importing from external storage (bridge multipart, Drive, partners, projects) |
| PartnerUser | user:partner | Partner user - external identity with partner-scoped access (create/delete folder, upload/download file) |
| PolicyAdmin | admin:policy | Policy admin - full CRUD for policies |
| SurfaceAdmin | admin:surface | Surface admin - full CRUD for external surfaces (partners and projects) |
| GlobalReader | reader:global | Global reader - read-only access across routes |
| DriveUser | user:drive | Drive user - can use Drive (browse, create folders, upload, download, rename/move, delete, add transfers to Drive) |
| ApiAgent | agent:api | API key agent (MCP/automation) — explicit /api/v1 allowlist via X-API-Key; no policy-attachment mutations |

## GlobalAdmin

**Casbin subject:** `admin`

Global admin role - access to everything

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/* | (GET\|POST\|PUT\|DELETE\|PATCH) | Admin access to all routes |
| /api/v1/dashboard/organization/settings/features | GET | List tenant feature settings |
| /api/v1/dashboard/organization/settings/features/* | PUT | Toggle tenant feature setting |
| /api/v1/objects/:id/secure-view | POST | Start secure viewer session |
| /ws/viewer/signal/:sessionId | GET | Secure viewer signaling websocket |

## TransferUser

**Casbin subject:** `user:bridge`

Transfer user - can upload, download, and manage transfers

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/bridge/upload/info/:name/:size | GET | Get upload info |
| /api/v1/bridge/uploads/initialize-multipart-upload | POST | Start multipart upload |
| /api/v1/bridge/uploads/get-multipart-presigned-urls | POST | Get presigned URLs |
| /api/v1/bridge/uploads/finalize-multipart-upload | POST | Finalize upload |
| /api/v1/bridge/uploads/cancel | POST | Cancel upload |
| /api/v1/bridge/download/protect-transfer | POST | Protect transfer |
| /api/v1/bridge/download/unprotect-transfer/:tid | POST | Unprotect transfer |
| /api/v1/bridge/download/delete-transfer/:tid | DELETE | Delete transfer |
| /api/v1/bridge/transfers/:tid/share | POST | Share transfer by email |
| /api/v1/bridge/transfers/:tid/download-url | GET | Authenticated transfer download URL |
| /api/v1/dashboard/user/transfers/history | GET | Get transfers history |
| /api/v1/bridge/transfer/requests/from-user | GET | Get transfer requests from user |
| /api/v1/bridge/transfers/:tid/add-to-drive | POST | Add transfer to Drive folder |
| /api/v1/streams/config | GET | Get stream config |
| /api/v1/streams/session | POST | Create stream session |
| /ws/streams/signal/:sessionId | GET | Open stream signaling websocket |
| /api/v1/bridge/* | (GET\|POST\|PUT\|DELETE) | All bridge operations |
| /api/v1/bridge/reports/* | (GET\|POST) | Bridge reports |
| /api/v1/bridge/analytics/* | (GET\|POST) | Bridge analytics |
| /api/v1/bridge/transfer/request/get/* | GET | Public transfer request |

## StreamUser

**Casbin subject:** `user:stream`

Stream user - can stream and manage their streams

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/streams/config | GET | Get stream config |
| /api/v1/streams/session | POST | Create stream session |
| /ws/streams/signal/:sessionId | GET | Open stream signaling websocket |

## UploadUser

**Casbin subject:** `user:upload`

Upload user - can upload and manage their uploads

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/bridge/upload/info/:name/:size | GET | Get upload info |
| /api/v1/bridge/uploads/initialize-multipart-upload | POST | Start multipart upload |
| /api/v1/bridge/uploads/get-multipart-presigned-urls | POST | Get presigned URLs |
| /api/v1/bridge/uploads/finalize-multipart-upload | POST | Finalize upload |
| /api/v1/bridge/uploads/cancel | POST | Cancel upload |
| /api/v1/bridge/download/protect-transfer | POST | Protect transfer |
| /api/v1/bridge/download/unprotect-transfer/:tid | POST | Unprotect transfer |
| /api/v1/bridge/download/delete-transfer/:tid | DELETE | Delete own transfers |
| /api/v1/bridge/transfers/:tid/share | POST | Share transfer by email |
| /api/v1/bridge/transfers/:tid/download-url | GET | Authenticated transfer download URL |
| /api/v1/bridge/uploads/* | (GET\|POST\|PUT\|DELETE) | Upload operations |
| /api/v1/bridge/transfer/request/get/* | GET | Public transfer request |
| /api/v1/dashboard/user/transfers/history | GET | Get transfers history |
| /api/v1/bridge/transfer/requests/from-user | GET | Get transfer requests from user |
| /api/v1/bridge/transfers/:tid/add-to-drive | POST | Add transfer to Drive folder |

## OrgUser

**Casbin subject:** `user:org`

Org user - basic user access to uploads, streams, transfer history and organization overview

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/bridge/upload/info/:name/:size | GET | Get upload info |
| /api/v1/bridge/uploads/initialize-multipart-upload | POST | Start multipart upload |
| /api/v1/bridge/uploads/get-multipart-presigned-urls | POST | Get presigned URLs |
| /api/v1/bridge/uploads/finalize-multipart-upload | POST | Finalize upload |
| /api/v1/bridge/uploads/cancel | POST | Cancel upload |
| /api/v1/bridge/download/delete-transfer/:tid | DELETE | Delete own transfers |
| /api/v1/bridge/transfers/:tid/share | POST | Share transfer by email |
| /api/v1/bridge/transfers/:tid/download-url | GET | Authenticated transfer download URL |
| /api/v1/bridge/uploads/* | (GET\|POST\|PUT\|DELETE) | Upload operations |
| /api/v1/dashboard/organization/panel | GET | Organization panel basic access |
| /api/v1/dashboard/organization/user-org-info | GET | Basic organization info |
| /api/v1/dashboard/organization/accept-invite-to-org | PUT | Accept invite to org |
| /api/v1/dashboard/security/update | PUT | Reset password |
| /api/v1/bridge/transfer/request/get/* | GET | Public transfer request |
| /api/v1/dashboard/user/transfers/history | GET | Get transfers history |
| /api/v1/bridge/transfer/requests/from-user | GET | Get transfer requests from user |
| /api/v1/bridge/transfers/:tid/add-to-drive | POST | Add transfer to Drive folder |
| /api/v1/streams/config | GET | Get stream config |
| /api/v1/streams/session | POST | Create stream session |
| /ws/streams/signal/:sessionId | GET | Open stream signaling websocket |
| /api/v1/partners | GET | List partners |
| /api/v1/policies | GET | List all policies for organization |
| /api/v1/partners/:partnerId/policies | GET | List policies for partner |
| /api/v1/policies/:id | GET | Get policy |
| /api/v1/policies/:id/versions | GET | List policy versions |
| /api/v1/notify-policy-denial | POST | Notify admin of policy denial |
| /api/v1/identities | GET | List identities (e.g. agents) |
| /api/v1/identities/:id/policy-attachments | GET | List identity policy attachments |
| /api/v1/partners/:partnerId/projects | GET | List projects for partner |
| /api/v1/objects | GET | List objects |
| /api/v1/objects | POST | Create folder or file object |
| /api/v1/objects/:id | GET | Get object |
| /api/v1/objects/:id | PATCH | Update object (rename, move) |
| /api/v1/objects/:id | DELETE | Soft-delete object |
| /api/v1/objects/:id/upload-url | GET | Get upload URL |
| /api/v1/objects/:id/upload/complete | POST | Upload complete |
| /api/v1/objects/:id/download-url | GET | Get download URL |
| /api/v1/objects/:id/policy-attachments | GET | List policy attachments |
| /api/v1/tags | GET | List tag catalog |
| /api/v1/objects/:id/tags | GET | List tags on object |
| /api/v1/objects/:id/tags | PUT | Replace tags on object |
| /api/v1/objects/:id/tags | POST | Add tag to object |
| /api/v1/objects/:id/tags/:tagId | DELETE | Remove tag from object |
| /api/v1/forms | GET | List accessible forms |
| /api/v1/forms | POST | Create personal form |
| /api/v1/forms/:formId | GET | Get form definition |
| /api/v1/forms/:formId | PATCH | Update form definition |
| /api/v1/forms/:formId/archive | POST | Archive form |
| /api/v1/forms/:formId/collaborators | GET | List form collaborators |
| /api/v1/forms/:formId/collaborators | POST | Add form collaborator |
| /api/v1/forms/:formId/collaborators/:identityId | DELETE | Remove form collaborator |
| /api/v1/forms/:formId/promote | POST | Promote form to org-owned |
| /api/v1/forms/:formId/publications | GET | List form publications |
| /api/v1/forms/:formId/publications | POST | Create form publication |
| /api/v1/forms/:formId/publications/:publicationId/revoke | POST | Revoke form publication |
| /api/v1/forms/:formId/responses | GET | List form responses |

## OrgUserAdmin

**Casbin subject:** `admin:org-user`

Organization user admin - can delete user accounts within organization

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/user/delete | DELETE | Delete user account |
| /api/v1/dashboard/organization/invite-user-to-org | PUT | Invite user to organization |
| /api/v1/dashboard/organization/cancel-auth0-invitation | POST | Cancel organization invitation |
| /api/v1/dashboard/organization/users | GET | List organization users |
| /api/v1/dashboard/organization/users | PUT | Add user to organization |
| /api/v1/dashboard/organization/users | DELETE | Remove user from organization |
| /api/v1/tags | GET | List tag catalog |
| /api/v1/tags | POST | Create catalog tag |
| /api/v1/tags/:tagId | PATCH | Update catalog tag |
| /api/v1/tags/:tagId | DELETE | Delete catalog tag |
| /api/v1/forms | GET | List forms |
| /api/v1/forms | POST | Create form |
| /api/v1/forms/:formId | GET | Get form |
| /api/v1/forms/:formId | PATCH | Update form |
| /api/v1/forms/:formId/archive | POST | Archive form |
| /api/v1/forms/:formId/unarchive | POST | Un-archive form |
| /api/v1/forms/:formId/collaborators | GET | List form collaborators |
| /api/v1/forms/:formId/collaborators | POST | Add form collaborator |
| /api/v1/forms/:formId/collaborators/:identityId | DELETE | Remove form collaborator |
| /api/v1/forms/:formId/promote | POST | Promote form to org-owned |
| /api/v1/forms/:formId/publications | GET | List publications |
| /api/v1/forms/:formId/publications | POST | Create publication |
| /api/v1/forms/:formId/publications/:publicationId/revoke | POST | Revoke publication |
| /api/v1/forms/:formId/responses | GET | List responses |

## TagAdmin

**Casbin subject:** `admin:tag`

Tag admin - manage organization tag catalog (assign on objects still requires Drive write)

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/tags | GET | List tag catalog |
| /api/v1/tags | POST | Create catalog tag |
| /api/v1/tags/:tagId | PATCH | Update catalog tag |
| /api/v1/tags/:tagId | DELETE | Delete catalog tag |

## FormAdmin

**Casbin subject:** `admin:form`

Form admin - manage any form in the organization

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/forms | GET | List forms |
| /api/v1/forms | POST | Create form |
| /api/v1/forms/:formId | GET | Get form |
| /api/v1/forms/:formId | PATCH | Update form |
| /api/v1/forms/:formId/archive | POST | Archive form |
| /api/v1/forms/:formId/unarchive | POST | Un-archive form |
| /api/v1/forms/:formId/collaborators | GET | List form collaborators |
| /api/v1/forms/:formId/collaborators | POST | Add form collaborator |
| /api/v1/forms/:formId/collaborators/:identityId | DELETE | Remove form collaborator |
| /api/v1/forms/:formId/promote | POST | Promote form to org-owned |
| /api/v1/forms/:formId/publications | GET | List publications |
| /api/v1/forms/:formId/publications | POST | Create publication |
| /api/v1/forms/:formId/publications/:publicationId/revoke | POST | Revoke publication |
| /api/v1/forms/:formId/responses | GET | List responses |

## FormsViewResponses

**Casbin subject:** `reader:forms-responses`

Forms response reader - org-wide read of form submissions

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/forms | GET | List forms read-only |
| /api/v1/forms/:formId | GET | Get form read-only |
| /api/v1/forms/:formId/responses | GET | List form responses |

## RoleAdmin

**Casbin subject:** `admin:role`

Role admin - can manage roles and permissions assigned to users within an organization

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/organization/rbac/roles | GET | Role operations |
| /api/v1/dashboard/organization/rbac/user/roles | GET | Get user roles (query: email) |
| /api/v1/dashboard/organization/rbac/user/roles/add | POST | Settings operations |
| /api/v1/dashboard/organization/rbac/user/roles/remove | DELETE | Settings roles operations |
| /api/v1/tags | GET | List tag catalog |
| /api/v1/tags | POST | Create catalog tag |
| /api/v1/tags/:tagId | PATCH | Update catalog tag |
| /api/v1/tags/:tagId | DELETE | Delete catalog tag |

## SecurityAnalyst

**Casbin subject:** `admin:security`

Security analyst - can view security reports

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/organization/get-events-in-org | GET | Organization events |
| /api/v1/dashboard/organization/get-transfers-in-org | GET | Organization transfers |
| /api/v1/dashboard/organization/data-flow-topology | GET | Data flow topology |
| /api/v1/dashboard/organization/data-flow-overview | GET | Data flow overview |
| /api/v1/dashboard/organization/data-flow-story/identity | GET | Identity data flow story |
| /api/v1/dashboard/organization/data-flow-story/project | GET | Project data flow story |
| /api/v1/dashboard/organization/data-flow-story/partner | GET | Partner data flow story |
| /api/v1/dashboard/organization/data-flow-activity | GET | Data flow activity |

## NetworkAdmin

**Casbin subject:** `admin:network`

Network admin - can manage network rules

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/settings/networking | GET | List network rules |
| /api/v1/settings/networking | POST | Create network rule |
| /api/v1/settings/networking/* | PUT | Update network rule |
| /api/v1/settings/networking/* | DELETE | Delete network rule |

## DataCustodian

**Casbin subject:** `data:custodian`

Data custodian - can generate chain of custody reports

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/bridge/transfer/custody | GET | Generate custody report |

## TransferAdmin

**Casbin subject:** `admin:transfer`

Org transfer administrator - can manage transfers in an organization

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/organization/set-transfer-org-lock-status/:tid | (POST\|DELETE) | Set or clear transfer org lock status |
| /api/v1/dashboard/organization/settings/toggle-lock-to-org/* | POST | Toggle lock to org |

## FileRequestedUser

**Casbin subject:** `anonymous:transfer:file-requested`

File requested user - role assigned to anonymous users when a file is requested, allows them access to multipart upload handler routes

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/request/uploads/initialize-multipart-upload | POST | Start multipart upload |
| /api/v1/request/uploads/get-multipart-presigned-urls | POST | Get presigned URLs |
| /api/v1/request/uploads/finalize-multipart-upload | POST | Finalize upload |
| /api/v1/bridge/url/info/request | GET | Get url info |

## ServiceAccountAdmin

**Casbin subject:** `admin:service-account`

Service account admin - role assigned to service accounts that can create and manage service accounts

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/key-auth/list | GET | List service accounts |
| /api/v1/dashboard/key-auth/policy-attachments | GET | Key auth policy attachments discovery |
| /api/v1/dashboard/key-auth/get | GET | Get service account |
| /api/v1/dashboard/key-auth/add | POST | Add service account |
| /api/v1/dashboard/key-auth/revoke-one | PUT | Revoke service account |
| /api/v1/dashboard/key-auth/rotate-one | POST | Rotate service account |
| /api/v1/dashboard/key-auth/delete | DELETE | Delete service account |
| /api/v1/dashboard/key-auth/rotate-all | POST | Rotate all service accounts |

## AgentIdentityAdmin

**Casbin subject:** `admin:agent-identity`

Agent identity admin - can create, update, delete, and rotate API keys for agent identities

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/identities | GET | List identities (e.g. agents) |
| /api/v1/identities | POST | Create identity (e.g. agent) |
| /api/v1/identities/:id | PATCH | Update identity |
| /api/v1/identities/:id | DELETE | Delete agent identity |
| /api/v1/identities/:id/rotate-key | POST | Rotate agent API key |
| /api/v1/identities/:id/policy-attachments | GET | List identity policy attachments |

## AuditLogStreamer

**Casbin subject:** `audit:streamer`

Audit log streamer - role assigned to users that can view audit logs

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/events | GET | Get user event logs |
| /api/v1/dashboard/organization/get-events-in-org | GET | Get organization logs |
| /api/v1/dashboard/organization/data-flow-topology | GET | Data flow topology |
| /api/v1/dashboard/organization/data-flow-overview | GET | Data flow overview |
| /api/v1/dashboard/organization/data-flow-story/identity | GET | Identity data flow story |
| /api/v1/dashboard/organization/data-flow-story/project | GET | Project data flow story |
| /api/v1/dashboard/organization/data-flow-story/partner | GET | Partner data flow story |
| /api/v1/dashboard/organization/data-flow-activity | GET | Data flow activity |

## StorageMigration

**Casbin subject:** `agent:storage-migration`

Storage migration – machine identity for importing from external storage (bridge multipart, Drive, partners, projects)

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/bridge/upload/info/:name/:size | GET | Get upload info |
| /api/v1/bridge/uploads/initialize-multipart-upload | POST | Start multipart upload |
| /api/v1/bridge/uploads/get-multipart-presigned-urls | POST | Get presigned URLs |
| /api/v1/bridge/uploads/finalize-multipart-upload | POST | Finalize upload |
| /api/v1/bridge/uploads/cancel | POST | Cancel upload |
| /api/v1/bridge/download/protect-transfer | POST | Protect transfer |
| /api/v1/bridge/download/unprotect-transfer/:tid | POST | Unprotect transfer |
| /api/v1/bridge/download/delete-transfer/:tid | DELETE | Delete transfer |
| /api/v1/bridge/transfers/:tid/share | POST | Share transfer by email |
| /api/v1/bridge/transfers/:tid/download-url | GET | Authenticated transfer download URL |
| /api/v1/bridge/uploads/* | (GET\|POST\|PUT\|DELETE) | Upload operations |
| /api/v1/bridge/transfer/request/get/* | GET | Public transfer request |
| /api/v1/dashboard/user/transfers/history | GET | Get transfers history |
| /api/v1/bridge/transfer/requests/from-user | GET | Get transfer requests from user |
| /api/v1/bridge/transfers/:tid/add-to-drive | POST | Add transfer to Drive folder |
| /api/v1/dashboard/organization/user-org-info | GET | User org info |
| /api/v1/dashboard/organization/panel | GET | Organization panel |
| /api/v1/objects | GET | List objects |
| /api/v1/objects | POST | Create folder or file object |
| /api/v1/objects/:id | GET | Get object |
| /api/v1/objects/:id | PATCH | Update object (rename, move) |
| /api/v1/objects/:id | DELETE | Soft-delete object |
| /api/v1/objects/:id/upload-url | GET | Get upload URL |
| /api/v1/objects/:id/upload/complete | POST | Upload complete |
| /api/v1/objects/:id/download-url | GET | Get download URL |
| /api/v1/objects/:id/share | POST | Create Drive share |
| /api/v1/partners | GET | List partners |
| /api/v1/partners/:partnerId/projects | GET | List projects for partner |
| /api/v1/projects | GET | List projects for org |
| /api/v1/partners | POST | Create partner |
| /api/v1/partners/:id | DELETE | Delete partner |
| /api/v1/partners/:partnerId/projects | POST | Create project under partner |
| /api/v1/projects | POST | Create project with partners |
| /api/v1/projects/:projectId/partners | PATCH | Update project partners |
| /api/v1/projects/:id | GET | Get project by ID |
| /api/v1/projects/:id | DELETE | Delete project |

## PartnerUser

**Casbin subject:** `user:partner`

Partner user - external identity with partner-scoped access (create/delete folder, upload/download file)

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/projects | GET | List projects (partner-scoped for external users) |
| /api/v1/objects | GET | List objects |
| /api/v1/objects | POST | Create folder |
| /api/v1/objects/:id | GET | Get object |
| /api/v1/objects/:id/upload-url | GET | Get upload URL |
| /api/v1/objects/:id/upload/complete | POST | Upload file complete |
| /api/v1/objects/:id/download-url | GET | Download file |
| /api/v1/objects/:id | DELETE | Delete folder or file |
| /api/v1/tags | GET | List tag catalog (read-only) |
| /api/v1/objects/:id/tags | GET | List tags on object (read-only) |

## PolicyAdmin

**Casbin subject:** `admin:policy`

Policy admin - full CRUD for policies

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/policies | GET | List all policies for organization |
| /api/v1/policies | POST | Create org-catalog policy |
| /api/v1/partners/:partnerId/policies | GET | List policies for partner |
| /api/v1/partners/:partnerId/policies | POST | Create policy |
| /api/v1/policies/:id | GET | Get policy |
| /api/v1/policies/:id | PATCH | Update policy |
| /api/v1/policies/:id | DELETE | Delete policy |
| /api/v1/policies/:id/versions | GET | List policy versions |
| /api/v1/policies/:id/versions | POST | Create policy version |
| /api/v1/policies/:id/versions/:versionId/activate | POST | Activate policy version |
| /api/v1/policies/:id/export | GET | Export policy |
| /api/v1/policies/:id/import | POST | Import policy |
| /api/v1/policies/evaluate | POST | Evaluate policy |
| /api/v1/notify-policy-denial | POST | Notify policy denial (read/admin flow) |

## SurfaceAdmin

**Casbin subject:** `admin:surface`

Surface admin - full CRUD for external surfaces (partners and projects)

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/partners | GET | List partners |
| /api/v1/partners | POST | Create partner |
| /api/v1/partners/:id | DELETE | Delete partner |
| /api/v1/partners/:id/identities | GET | List partner identities |
| /api/v1/partners/:id/identities | POST | Create partner identity |
| /api/v1/partners/:id/identities/:identityId | PATCH | Update partner identity |
| /api/v1/partners/:id/identities/:identityId/rotate-password | POST | Rotate partner identity password |
| /api/v1/partners/:id/identities/:identityId | DELETE | Revoke partner identity |
| /api/v1/partners/:id/identities/:identityId/permanent | DELETE | Permanently delete partner identity |
| /api/v1/partners/:partnerId/projects | GET | List projects for partner |
| /api/v1/projects | GET | List projects for org |
| /api/v1/partners/:partnerId/projects | POST | Create project under partner |
| /api/v1/projects | POST | Create project with partners |
| /api/v1/projects/:projectId/partners | PATCH | Update project partners |
| /api/v1/projects/:id | GET | Get project by ID |
| /api/v1/projects/:id | DELETE | Delete project |

## GlobalReader

**Casbin subject:** `reader:global`

Global reader - read-only access across routes

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/user/transfers/history | GET | Transfers history |
| /api/v1/dashboard/organization/panel | GET | Organization panel |
| /api/v1/dashboard/organization/user-org-info | GET | User org info |
| /api/v1/partners | GET | List partners |
| /api/v1/policies | GET | List policies (org) |
| /api/v1/partners/:partnerId/policies | GET | List policies |
| /api/v1/policies/:id | GET | Get policy |
| /api/v1/policies/:id/versions | GET | List policy versions |
| /api/v1/identities | GET | List identities |
| /api/v1/partners/:partnerId/projects | GET | List projects |
| /api/v1/projects | GET | List projects (org) |
| /api/v1/objects | GET | List objects |
| /api/v1/objects/:id | GET | Get object |
| /api/v1/bridge/upload/info/:name/:size | GET | Bridge upload info |
| /api/v1/bridge/transfer/requests/from-user | GET | Transfer requests |
| /api/v1/settings/networking | GET | List network rules |
| /api/v1/dashboard/organization/get-events-in-org | GET | Org events |
| /api/v1/dashboard/organization/get-transfers-in-org | GET | Org transfers |
| /api/v1/dashboard/organization/data-flow-topology | GET | Data flow topology |
| /api/v1/dashboard/organization/data-flow-overview | GET | Data flow overview |
| /api/v1/dashboard/organization/data-flow-story/identity | GET | Identity data flow story |
| /api/v1/dashboard/organization/data-flow-story/project | GET | Project data flow story |
| /api/v1/dashboard/organization/data-flow-story/partner | GET | Partner data flow story |
| /api/v1/dashboard/organization/data-flow-activity | GET | Data flow activity |
| /api/v1/bridge/transfer/custody | GET | Custody report |
| /api/v1/dashboard/key-auth/list | GET | List key auth |
| /api/v1/dashboard/key-auth/policy-attachments | GET | Key auth policy attachments discovery |
| /api/v1/dashboard/key-auth/get | GET | Get key auth |
| /api/v1/dashboard/events | GET | User event logs |

## DriveUser

**Casbin subject:** `user:drive`

Drive user - can use Drive (browse, create folders, upload, download, rename/move, delete, add transfers to Drive)

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/dashboard/organization/user-org-info | GET | User org info |
| /api/v1/dashboard/organization/panel | GET | Organization panel |
| /api/v1/dashboard/user/transfers/history | GET | Transfers history |
| /api/v1/bridge/transfer/requests/from-user | GET | Transfer requests from user |
| /api/v1/bridge/transfers/:tid/add-to-drive | POST | Add transfer to Drive |
| /api/v1/bridge/transfers/:tid/share | POST | Share transfer by email |
| /api/v1/bridge/transfers/:tid/download-url | GET | Authenticated transfer download URL |
| /api/v1/objects | GET | List objects |
| /api/v1/objects | POST | Create folder |
| /api/v1/objects/:id | GET | Get object |
| /api/v1/objects/:id | PATCH | Update object (rename, move) |
| /api/v1/objects/:id | DELETE | Delete object |
| /api/v1/objects/:id/upload-url | GET | Get upload URL |
| /api/v1/objects/:id/upload/complete | POST | Upload complete |
| /api/v1/objects/:id/download-url | GET | Get download URL |
| /api/v1/objects/:id/secure-view | POST | Start secure viewer session |
| /ws/viewer/signal/:sessionId | GET | Secure viewer signaling websocket |
| /api/v1/objects/:id/share | POST | Create Drive share |
| /api/v1/partners | GET | List partners |
| /api/v1/partners/:partnerId/projects | GET | List projects |
| /api/v1/projects | GET | List projects (org) |
| /api/v1/objects/:id/policy-attachments | GET | List policy attachments |
| /api/v1/tags | GET | List tag catalog |
| /api/v1/objects/:id/tags | GET | List tags on object |
| /api/v1/objects/:id/tags | PUT | Replace tags on object |
| /api/v1/objects/:id/tags | POST | Add tag to object |
| /api/v1/objects/:id/tags/:tagId | DELETE | Remove tag from object |

## ApiAgent

**Casbin subject:** `agent:api`

API key agent (MCP/automation) — explicit /api/v1 allowlist via X-API-Key; no policy-attachment mutations

| Path | Method | Description |
|------|--------|-------------|
| /api/v1/bridge/* | (GET\|POST\|PUT\|DELETE) | Bridge operations |
| /api/v1/transfers | GET | List transfers |
| /api/v1/transfers/:tid | GET | Get transfer |
| /api/v1/transfers/:tid | DELETE | Delete transfer |
| /api/v1/logs | GET | Audit logs |
| /api/v1/projects | GET | List projects |
| /api/v1/projects | POST | Create project |
| /api/v1/projects/:id | GET | Get project |
| /api/v1/projects/:id/data-custodian | PATCH | Update data custodian |
| /api/v1/projects/:id | DELETE | Delete project |
| /api/v1/projects/:projectId/partners | PATCH | Update project partners |
| /api/v1/objects | GET | List objects |
| /api/v1/objects | POST | Create object |
| /api/v1/objects/:id | GET | Get object |
| /api/v1/objects/:id | PATCH | Update object |
| /api/v1/objects/:id | DELETE | Delete object |
| /api/v1/objects/:id/download-url | GET | Download URL |
| /api/v1/objects/:id/upload-url | GET | Upload URL |
| /api/v1/objects/:id/upload/complete | POST | Upload complete |
| /api/v1/objects/:id/policy-attachments | GET | List policy attachments |
| /api/v1/objects/:id/share | POST | Drive share (stub) |
| /api/v1/public/transfer-share/info/:token | GET | Public transfer share info |

## Roles not in UnifiedPermissions

These role names exist in `internal/rbac/roles/roles.go` but have no entry in `UnifiedPermissions`:

- `ApiKey`
- `StreamReceiver`
- `StreamSender`

