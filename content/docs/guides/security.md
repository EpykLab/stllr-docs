---
title: Security
---

## Export Logs to SIEM

**Goal:** Export audit logs to a SIEM or consume them via the audit API.

This guide shows administrators how to forward stellarbridge audit logs
to a SIEM or export audit events programmatically. You will learn which
logs are available, how to read them, and how to send them to a generic
HTTP endpoint as well as Splunk HEC and Elasticsearch/OpenSearch.
Examples are provided in Python, TypeScript, and Go.

### What Audit Logs Include

The stellarbridge Audit API provides access to security and compliance
events in OCSF format, including:

* **Authentication events** - Login success/failure with timestamp, actor (email), result, IP, and organization context
* **File transfer events** - Upload/download activities with file metadata, participants, and timestamps
* **User management events** - User creation, updates, deletions, and role changes
* **Organization events** - Settings changes, invitations, and administrative actions
* **API access events** - API key usage and authentication attempts

**Tip:** For more context, see [Audit logging](/docs/about-stellarbridge/audit-logging/),
[Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/), and
[Security architecture](/docs/about-stellarbridge/security-architecture-at-stellarbridge/).

***

### Before You Start

Ensure you have:

* **API Access** - An API key generated from your organization dashboard
* **Programming Environment** - Python 3.10+, Node.js 18+, or Go 1.19+ depending on your preferred language
* **SIEM Configuration** - Your SIEM provides an HTTPS ingestion endpoint and credentials (for streaming examples)
* **Network Access** - Outbound HTTPS access to `api.stellarbridge.app` and your SIEM endpoint

***

## Fetching Audit Logs via API

Use the stellarbridge Audit API to programmatically fetch audit events. This is ideal for periodic exports, SIEM integration, or compliance reporting.

### Endpoint

```
GET https://api.stellarbridge.app/api/v1/audit
```

### Authentication

All requests to the Public API require authentication using an API key.

**To generate an API key:**
1. Log in to your stellarbridge organization dashboard
2. Navigate to the organization settings
3. Generate a new API key for programmatic access

**Include the API key in your request header:**

```
X-API-Key: YOUR_API_KEY_HERE
```

**Important:** Treat API keys as sensitive credentials. Store them securely using environment variables or a secrets manager.

### Query Parameters

- `startTime` - Start of time range in ISO 8601 format (e.g., `2025-01-15T00:00:00Z`)
- `endTime` - End of time range in ISO 8601 format (e.g., `2025-01-16T00:00:00Z`)
- `actor` - Filter by the Actor (user ID) who performed the action
- `fileName` - Filter by the name of the file involved
- `fileHash` - Filter by the hash of the file involved
- `orgId` - Filter by Organization ID
- `userId` - Filter by User ID
- `limit` - Maximum number of logs to return (integer, default: 50, min: 1, max: 1000)
- `offset` - Number of logs to skip for pagination (integer, default: 0, min: 0)

### Response Format

The API returns audit logs in **OCSF (Open Cybersecurity Schema Framework)** format. Each response includes:

- `data` - Array of OCSF event objects containing:
  - `category_name`, `category_uid` - Event category information
  - `class_name`, `class_uid` - Event class information
  - `time` - Event timestamp in Unix microseconds
  - `type_uid`, `type_name` - Event type identifiers
  - `activity_id`, `activity_name` - Activity performed
  - `severity`, `severity_id` - Event severity level
  - `status`, `status_id`, `status_detail` - Event status information
  - `message` - Event description
  - `actor` - User and application that performed the action
  - `metadata` - Logging metadata including timestamps and product info
  - `enrichments` - Additional enrichment data (optional)
  - `src_endpoint` - Source network endpoint with IP and port (optional)
- `meta` - Metadata about the response:
  - `total` - Total number of logs matching the filter
  - `limit` - Number of logs returned
  - `offset` - Pagination offset

### Error Responses

- `400` - Invalid request parameters
- `401` - Unauthorized. Invalid or missing API Key
- `429` - Too Many Requests. Rate limit exceeded

### Python Example

```python
import requests
import json
from datetime import datetime, timedelta

# Configuration
API_URL = "https://api.stellarbridge.app/api/v1/audit"
API_KEY = "YOUR_API_KEY_HERE"  # Replace with your actual API key

def fetch_audit_logs():
    """
    Fetches audit logs from the stellarbridge API.
    """
    headers = {
        "X-API-Key": API_KEY,
        "Accept": "application/json"
    }

    # Example: Fetch logs from the last 24 hours
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(hours=24)

    params = {
        "limit": 10,
        "offset": 0,
        "startTime": start_time.isoformat() + "Z",
        "endTime": end_time.isoformat() + "Z"
    }

    try:
        response = requests.get(API_URL, headers=headers, params=params)
        
        # Check for HTTP errors
        response.raise_for_status()
        
        data = response.json()
        
        print(f"Successfully retrieved {len(data.get('data', []))} logs.")
        print("Metadata:", json.dumps(data.get('meta'), indent=2))
        
        # Print the first log entry if available
        if data.get('data'):
            print("\nFirst Log Entry:")
            print(json.dumps(data['data'][0], indent=2))
            
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        if response.content:
            print(f"Error Details: {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    fetch_audit_logs()
```

### TypeScript Example

```typescript
import fetch from 'node-fetch'; // npm install node-fetch or run with Node v18+

const API_URL = "https://api.stellarbridge.app/api/v1/audit";
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

interface AuditResponse {
  data: any[];
  meta: {
    total?: number;
    limit?: number;
    offset?: number;
    [key: string]: any;
  };
}

async function fetchAuditLogs() {
  const params = new URLSearchParams({
    limit: "10",
    offset: "0",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    endTime: new Date().toISOString(),
  });

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    const data = (await response.json()) as AuditResponse;

    console.log(`Successfully retrieved ${data.data.length} logs.`);
    console.log("Metadata:", data.meta);

    if (data.data.length > 0) {
      console.log("\nFirst Log Entry:");
      console.log(JSON.stringify(data.data[0], null, 2));
    }
  } catch (error) {
    console.error("Error fetching audit logs:", error);
  }
}

fetchAuditLogs();
```

### Go Example

```golang
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

const (
	baseURL = "https://api.stellarbridge.app/api/v1/audit"
	apiKey  = "YOUR_API_KEY_HERE" // Replace with your actual API key
)

// OcsfResponse represents the top-level API response
type OcsfResponse struct {
	Data []map[string]interface{} `json:"data"`
	Meta map[string]interface{}   `json:"meta"`
}

func main() {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	// Prepare query parameters
	params := url.Values{}
	params.Add("limit", "10")
	params.Add("offset", "0")
	
	// Example: last 24 hours
	endTime := time.Now().UTC()
	startTime := endTime.Add(-24 * time.Hour)
	params.Add("startTime", startTime.Format(time.RFC3339))
	params.Add("endTime", endTime.Format(time.RFC3339))

	// Construct URL
	reqURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())

	req, err := http.NewRequest("GET", reqURL, nil)
	if err != nil {
		fmt.Printf("Error creating request: %v\n", err)
		return
	}

	// Set Headers
	req.Header.Set("X-API-Key", apiKey)
	req.Header.Set("Accept", "application/json")

	// Execute Request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error sending request: %v\n", err)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Error reading response body: %v\n", err)
		return
	}

	if resp.StatusCode != http.StatusOK {
		fmt.Printf("API request failed with status %d: %s\n", resp.StatusCode, string(body))
		return
	}

	// Parse Response
	var result OcsfResponse
	if err := json.Unmarshal(body, &result); err != nil {
		fmt.Printf("Error parsing JSON: %v\n", err)
		return
	}

	fmt.Printf("Successfully retrieved %d logs.\n", len(result.Data))
	fmt.Printf("Metadata: %+v\n", result.Meta)

	if len(result.Data) > 0 {
		fmt.Println("\nFirst Log Entry:")
		prettyJSON, _ := json.MarshalIndent(result.Data[0], "", "  ")
		fmt.Println(string(prettyJSON))
	}
}
```

***

## Streaming Logs to SIEM

You can continuously stream audit logs from stellarbridge to your SIEM by polling the API at regular intervals and forwarding the results to your SIEM platform.

### Recommended Approach

1. Use the `/api/v1/audit` endpoint with your API key
2. Poll at your desired interval (e.g., every 5 minutes)
3. Use pagination with `limit` and `offset` parameters
4. Track the last processed timestamp to avoid duplicates
5. Forward the OCSF-formatted events to your SIEM

### Example: Sending to Splunk HEC

```python
import requests
import time
from datetime import datetime, timedelta

API_URL = "https://api.stellarbridge.app/api/v1/audit"
API_KEY = "YOUR_API_KEY"
SPLUNK_HEC_URL = "https://splunk.example.com:8088/services/collector/event"
SPLUNK_TOKEN = "your-hec-token"

def fetch_and_forward():
    # Fetch logs from last 5 minutes
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(minutes=5)

    params = {
        "startTime": start_time.isoformat() + "Z",
        "endTime": end_time.isoformat() + "Z",
        "limit": 100
    }

    response = requests.get(
        API_URL,
        headers={"X-API-Key": API_KEY},
        params=params
    )
    response.raise_for_status()

    events = response.json().get("data", [])

    # Forward to Splunk HEC
    for event in events:
        requests.post(
            SPLUNK_HEC_URL,
            headers={"Authorization": f"Splunk {SPLUNK_TOKEN}"},
            json={"event": event}
        )

    print(f"Forwarded {len(events)} events to Splunk")

# Run every 5 minutes
while True:
    fetch_and_forward()
    time.sleep(300)
```

**Note:** Ensure the HEC token is enabled and sourcetype `_json` accepts JSON payloads.

### Example: Sending to Elasticsearch/OpenSearch

```python
import requests
import json
from datetime import datetime, timedelta
import time

API_URL = "https://api.stellarbridge.app/api/v1/audit"
API_KEY = "YOUR_API_KEY"
ELASTIC_URL = "https://elastic.example.com:9200/stellarbridge-logs/_bulk"
ELASTIC_USER = "your-user"
ELASTIC_PASS = "your-password"

def fetch_and_forward():
    # Fetch logs from last 5 minutes
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(minutes=5)

    params = {
        "startTime": start_time.isoformat() + "Z",
        "endTime": end_time.isoformat() + "Z",
        "limit": 100
    }

    response = requests.get(
        API_URL,
        headers={"X-API-Key": API_KEY},
        params=params
    )
    response.raise_for_status()

    events = response.json().get("data", [])

    # Build bulk request for Elasticsearch
    bulk_data = []
    for event in events:
        bulk_data.append({"index": {}})
        bulk_data.append(event)

    if bulk_data:
        bulk_body = "\n".join([json.dumps(item) for item in bulk_data]) + "\n"
        requests.post(
            ELASTIC_URL,
            auth=(ELASTIC_USER, ELASTIC_PASS),
            headers={"Content-Type": "application/x-ndjson"},
            data=bulk_body
        )

    print(f"Forwarded {len(events)} events to Elasticsearch")

# Run every 5 minutes
while True:
    fetch_and_forward()
    time.sleep(300)
```

**Note:** Create the index up front or rely on auto-create. Consider index lifecycle policies for retention.

***

## Security and Privacy

Follow these best practices when exporting logs:

- **Use HTTPS:** Always use HTTPS endpoints and validate TLS certificates when sending to your SIEM
- **Protect credentials:** Treat API keys and tokens as secrets. Inject them via environment variables or a secrets manager
- **Data privacy:** Logs do not include passwords or MFA secrets. Avoid adding sensitive payloads in custom logs you forward
- **Network security:** Ensure outbound egress to the SIEM is allowed only from trusted networks

***

## Troubleshooting

**401 Unauthorized from stellarbridge API:** Verify your API key is correct and included in the `X-API-Key` header. Regenerate the key from your organization dashboard if needed.

**400 Bad Request:** Check that query parameters are properly formatted. Ensure `startTime` and `endTime` use ISO 8601 format with the "Z" suffix (e.g., `2025-01-15T00:00:00Z`).

**429 Rate Limit Exceeded:** Reduce your polling frequency or implement exponential backoff. The API has rate limits to ensure fair usage.

**Empty results:** Verify the time range specified in `startTime` and `endTime` contains events. Check that your API key has access to the organization's audit logs.

**SIEM errors (4xx):** Check your SIEM credentials, endpoint path, and payload format (Splunk HEC vs Elastic bulk). Review SIEM documentation for proper authentication and data format.

**Time zone issues:** The API returns timestamps in Unix microseconds (UTC). Ensure your SIEM is configured to handle UTC timestamps correctly.

***

## Admin Requirements

| Task                                | Action Required                                                                                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| Generate API Key                    | Access organization dashboard and create an API key for programmatic access                        |
| Develop Integration                 | Write a script or service to poll the API and forward events to your SIEM                          |
| Configure SIEM Endpoint             | Set up your SIEM's ingestion endpoint (HEC, bulk API, etc.) and obtain credentials                 |
| Network Configuration               | Ensure outbound HTTPS access to `api.stellarbridge.app` and your SIEM endpoint                     |
| Define Retention Policy             | Configure log retention and index lifecycle policies in your SIEM according to compliance needs    |
| Monitor Integration                 | Set up monitoring and alerting for your log forwarding service to ensure continuous operation      |

***

## Related Resources

- [Audit logging](/docs/about-stellarbridge/audit-logging/)
- [Security at stellarbridge](/docs/about-stellarbridge/security-at-stellarbridge/)
- [Security architecture](/docs/about-stellarbridge/security-architecture-at-stellarbridge/)
