---
title: Audit log reference
description: Public Audit API contract, OCSF event shape, event families, and code lookup guidance.
weight: 15
tags: [reference, audit, api, ocsf]
---

# Audit log reference

Use this reference when you pull organization audit events from
stellarbridge, build a SIEM integration, or interpret an exported event.
It describes the public Audit API response as well as the stellarbridge
codes carried by each event.

For implementation examples and SIEM forwarding patterns, see [Export
logs to SIEM](/docs/guides/security/).

!!! important
    Audit events contain operational and identity metadata. Store API
    keys in a secrets manager, restrict access to exported logs, and
    apply your organization's retention policy to downstream copies.

## Endpoint and authentication { #endpoint-and-authentication }

```http
GET https://api.stellarbridge.app/api/v1/audit
X-API-Key: YOUR_API_KEY
Accept: application/json
```

The API key determines the organization scope. A request returns only
events belonging to that organization.

## Query parameters { #query-parameters }

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `startTime` | RFC 3339 timestamp | — | Include events at or after this UTC timestamp. |
| `endTime` | RFC 3339 timestamp | — | Include events at or before this UTC timestamp. |
| `actor` | string | — | Exact, case-insensitive match on the actor email recorded on the event. |
| `fileName` | string | — | Exact, case-insensitive match on the sender file name or target name. |
| `flowId` | UUID string | — | Return events belonging to one correlated user flow. |
| `limit` | integer | `50` | Number of events to return. Values above `1000` are capped at `1000`; invalid or non-positive values use `50`. |
| `offset` | integer | `0` | Number of matching events to skip. Invalid or negative values use `0`. |

Timestamps must include an offset, normally `Z` for UTC. Invalid time
values and invalid `flowId` values are ignored rather than returning a
validation error. Validate filters before making a request.

Example:

```bash
curl --request GET \
  --header "X-API-Key: $STELLARBRIDGE_API_KEY" \
  --header "Accept: application/json" \
  --get \
  --data-urlencode "startTime=2026-09-01T00:00:00Z" \
  --data-urlencode "endTime=2026-09-02T00:00:00Z" \
  --data-urlencode "limit=100" \
  "https://api.stellarbridge.app/api/v1/audit"
```

## Response envelope { #response-envelope }

Every successful response contains a `data` array and a `meta` object.

```json
{
  "data": [
    {
      "category_name": "Audit",
      "category_uid": 3,
      "class_name": "Application Activity",
      "class_uid": 3001,
      "time": 1788278400123456,
      "type_uid": 300101,
      "activity_id": 1003,
      "activity_name": "Login",
      "severity": "Informational",
      "severity_id": 1,
      "status": "Success",
      "status_id": 1,
      "message": "User authentication successful",
      "actor": {
        "user": {
          "email_addr": "alice@example.com",
          "type": "User"
        },
        "app_name": "Stellarbridge"
      },
      "metadata": {
        "logged_time": 1788278400456789,
        "product": {
          "vendor_name": "Stellarbridge",
          "name": "Stellarbridge App"
        },
        "version": "1.1.0"
      },
      "src_endpoint": {
        "ip": "203.0.113.24"
      }
    }
  ],
  "meta": {
    "total": 148,
    "limit": 100,
    "offset": 0
  }
}
```

The example is representative. Optional fields are omitted when the
source event does not contain a value.

### Envelope fields { #envelope-fields }

| Field | Type | Description |
|-------|------|-------------|
| `data` | array of event objects | Events in the requested page. An empty result is `[]`, not `null`. |
| `meta.total` | integer | Total number of events matching the filters, before pagination. |
| `meta.limit` | integer | Effective page size after validation and capping. |
| `meta.offset` | integer | Effective offset used for this response. |

Fetch subsequent pages by increasing `offset` by the number of events
received. Stop when `offset + data.length` is greater than or equal to
`meta.total`. Events are returned newest first.

## Event object { #event-object }

The public payload is OCSF-shaped and uses the OCSF 1.1.0 schema
version. Stellarbridge currently publishes all Audit API records as
Application Activity events. The individual operation is identified by
`activity_id` and `activity_name`.

| Field | Type | Presence | Description |
|-------|------|----------|-------------|
| `category_name` | string | Always | `Audit`. |
| `category_uid` | integer | Always | `3`. |
| `class_name` | string | Always | `Application Activity`. |
| `class_uid` | integer | Always | `3001`. |
| `time` | integer | Always | Time the activity occurred, as Unix microseconds in UTC. |
| `type_uid` | integer | Always | `300101`, the current Application Activity event type. |
| `type_name` | string | Optional | Human-readable type label. Currently omitted when no label is available. |
| `activity_id` | integer | Always | Stellarbridge action code describing what happened. |
| `activity_name` | string | Always | Human-readable action title, or a mapped fallback for older events. |
| `severity` | string | Always | `Informational`, `Medium`, or `High`. |
| `severity_id` | integer | Always | Numeric severity; see [Severity](#severity). |
| `status` | string | Always | `Success` or `Failure`. |
| `status_id` | integer | Always | `1` for success or `2` for failure. |
| `status_detail` | string | Optional | Additional status context when supplied by the source event. |
| `message` | string | Always | Event message. If no direct message exists, stellarbridge derives it from the result title and description. |
| `actor` | object | Always | User and application associated with the event. |
| `metadata` | object | Always | Collection time, product identity, and OCSF version. |
| `enrichments` | array | Optional | String name/value pairs derived from event-specific metadata. |
| `extra_map` | object | Optional | Event-specific metadata in its original JSON-compatible types. |
| `src_endpoint` | object | Optional | Source IP and, when available, source port. |
| `flow_id` | UUID string | Optional | Correlates events emitted by the same user gesture or workflow. |

### TypeScript model { #typescript-model }

The following interfaces model the current response contract. Keep
optional properties optional when you map the response into another
schema.

```typescript
interface AuditLogResponse {
  data: AuditEvent[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

interface AuditEvent {
  category_name: "Audit";
  category_uid: 3;
  class_name: "Application Activity";
  class_uid: 3001;
  time: number;
  type_uid: 300101;
  type_name?: string;
  activity_id: number;
  activity_name: string;
  severity: "Informational" | "Medium" | "High";
  severity_id: 1 | 3 | 4;
  status: "Success" | "Failure";
  status_id: 1 | 2;
  status_detail?: string;
  message: string;
  actor: {
    user: {
      name?: string;
      email_addr?: string;
      type?: string;
    };
    app_name?: string;
  };
  metadata: {
    logged_time: number;
    log_provider?: string;
    log_version?: string;
    product: {
      vendor_name: string;
      name: string;
    };
    version: string;
  };
  enrichments?: Array<{ name: string; value: string }>;
  extra_map?: Record<string, unknown>;
  src_endpoint?: {
    ip?: string;
    port?: number;
  };
  flow_id?: string;
}
```

### Actor { #actor }

| Field | Type | Presence | Description |
|-------|------|----------|-------------|
| `actor.user.name` | string | Optional | Actor display name when recorded. |
| `actor.user.email_addr` | string | Optional | Actor email address when recorded. |
| `actor.user.type` | string | Optional | Actor classification, such as `User`, `App/System`, or `External user`. |
| `actor.app_name` | string | Optional | Application that produced the event. Audit API events use `Stellarbridge`. |

See [Audit targets and actors](/docs/reference/audit-targets-and-actors/)
for the complete actor and target constants used by stellarbridge.

### Metadata { #metadata }

| Field | Type | Presence | Description |
|-------|------|----------|-------------|
| `metadata.logged_time` | integer | Always | Time the event was serialized for the API response, as Unix microseconds in UTC. |
| `metadata.log_provider` | string | Optional | Provider name when supplied. |
| `metadata.log_version` | string | Optional | Source log format version when supplied. |
| `metadata.product.vendor_name` | string | Always | `Stellarbridge`. |
| `metadata.product.name` | string | Always | `Stellarbridge App`. |
| `metadata.version` | string | Always | OCSF schema version; currently `1.1.0`. |

`time` and `metadata.logged_time` describe different moments. Use
`time` for investigations and timeline ordering. `logged_time` reflects
when the API mapped the stored event into its response.

### Enrichments and extra metadata { #enrichments-and-extra-metadata }

Event-specific context can appear in two forms:

- `extra_map` preserves the original JSON-compatible value types.
- `enrichments` exposes the same context as string `name` and `value`
  pairs for systems that prefer a flat enrichment list.

Keys vary by event family. Consumers must ignore unknown keys and must
not require a particular enrichment to be present.

```json
{
  "extra_map": {
    "file_name": "quarterly-report.pdf",
    "file_size": 482193
  },
  "enrichments": [
    {"name": "file_name", "value": "quarterly-report.pdf"},
    {"name": "file_size", "value": "482193"}
  ]
}
```

## Event types and action codes { #event-types-and-action-codes }

Do not use `type_uid` to distinguish stellarbridge operations: its
current value is the same for every Audit API event. Use
`activity_id` as the stable machine-readable action code and
`activity_name` for display.

| Action-code range | Event family | Examples |
|-------------------|--------------|----------|
| `1000–1099` | User accounts and authentication | Create user, login success, login failure, logout |
| `1100–1199` | MFA | Set up, verify, or disable MFA |
| `1200–1299` | Identity-provider administration | Invitations, membership, connections, SCIM |
| `1300–1399` | API keys | Create, delete, revoke, or rotate a key |
| `2000–2099` | File transfers | Start or complete upload/download, delete, access |
| `2100–2199` | Storage | Create, delete, or update storage; backup operations |
| `3000–3099` | Subscriptions and payments | Subscribe, update payment, start or end trial |
| `4000–4099` | System lifecycle | Health, configuration, jobs, maintenance |
| `5000–5099` | Notifications and organization state | Notifications, settings, lock/unlock |
| `6000–6099` | Policy decisions | Policy allow or deny |
| `6100–6199` | Policy administration | Create, update, activate, import, or export policy |
| `6200–6299` | Network rules | Create, update, delete, or list a rule |
| `6300–6399` | Drive/VFS objects | Create, access, upload, download, share, or attach policy |
| `6400–6499` | Support and gates | Policy-denial notification and gate approval |
| `6500–6599` | Terms | Accept or retrieve terms |
| `6600–6699` | Tenancy and identities | Partners, projects, agents, groups, external identities |
| `6700–6709` | Data-flow visualization | Read data-flow information |
| `6710–6719` | Platform tags | Tag lifecycle operations |
| `6720–6729` | Platform forms | Form lifecycle, publication, and submission |

Use the [Audit action codes](/docs/reference/audit-action-codes/) page
to look up every defined `activity_id`, constant name, and description.
Code ranges reserve room for future actions, so not every integer in a
range is assigned.

## Result, status, and severity { #result-status-and-severity }

Stellarbridge stores a result code with each source event. In the
public OCSF payload, the result is normalized into `status`,
`status_id`, and `message`; there is currently no separate
`result_code` field.

| Source result code | `status` | `status_id` |
|--------------------|----------|-------------|
| Less than `400` | `Success` | `1` |
| `400` or greater | `Failure` | `2` |

The [Audit result codes](/docs/reference/audit-result-codes/) catalog
documents the source result vocabulary used across stellarbridge. Use
it when a legacy export, support record, or event-specific metadata
includes a numeric result code.

### Severity { #severity }

| Source level | `severity` | `severity_id` |
|--------------|------------|---------------|
| `INFO` or any unrecognized value | `Informational` | `1` |
| `WARN` | `Medium` | `3` |
| `ERROR` | `High` | `4` |

Status and severity answer different questions. Status says whether
the operation succeeded. Severity indicates the operational importance
of the recorded event.

## Correlating a workflow { #correlating-a-workflow }

Some user actions produce multiple audit records. When present,
`flow_id` ties those records to the same user gesture or workflow.

1. Read `flow_id` from an event of interest.
2. Request `/api/v1/audit?flowId=<uuid>`.
3. Sort the returned events by `time` ascending to reconstruct the flow.

Older events and single-step operations may not have a `flow_id`.

## Compatibility guidance { #compatibility-guidance }

- Parse timestamps as 64-bit integers. Unix microseconds exceed the
  safe range of 32-bit integer types.
- Treat fields marked optional as absent, not necessarily `null`.
- Ignore unknown top-level fields and unknown `extra_map` keys.
- Use numeric identifiers for correlation and filtering; use names for
  display.
- Do not assume array order across pages. Use `time` and `flow_id` to
  reconstruct timelines.
- Record the `metadata.version` value with downstream events so schema
  changes can be handled deliberately.

## HTTP responses { #http-responses }

| Status | Meaning | Recommended action |
|--------|---------|--------------------|
| `200` | Request succeeded, including an empty result set. | Process `data` and `meta`. |
| `401` | API key is missing, invalid, or not authorized. | Check the `X-API-Key` header and key status. |
| `429` | Request rate limit was exceeded. | Back off and retry with jitter. |
| `500` | Audit records could not be retrieved. | Retry with backoff; contact support if the failure persists. |

## Related references { #related-references }

- [Audit action codes](/docs/reference/audit-action-codes/)
- [Audit result codes](/docs/reference/audit-result-codes/)
- [Audit targets and actors](/docs/reference/audit-targets-and-actors/)
- [Audit logging](/docs/about-stellarbridge/audit-logging/)
- [Export logs to SIEM](/docs/guides/security/)
- [Role-based access control](/docs/security/rbac/)
