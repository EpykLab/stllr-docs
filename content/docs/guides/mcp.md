---
title: Using the Stellarbridge MCP
---

**Goal:** Install and use the Stellarbridge MCP server so an AI coding
agent (Cursor, Claude, and others) can work with your Drive, transfers,
file requests, projects, and audit logs from the conversation.

The Stellarbridge MCP server exposes the Stellarbridge API as
[Model Context Protocol](https://modelcontextprotocol.io) (MCP) tools.
Once the server is installed and configured in your agent, you can ask
the agent in plain language to list files, upload or download objects,
create file requests, manage projects, or query audit logs. The agent
selects and calls the right tools for you.

The MCP can be downloaded from the official repository:
[github.com/EpykLab/stllr-mcp](https://github.com/EpykLab/stllr-mcp/tree/master).

## What the server provides

The server exposes five tool groups (namespaces). Each group maps to a
part of the Stellarbridge API:

| Namespace | Tool count | What you can do |
| --- | --- | --- |
| **drive** | 14 | List, create, rename, move, delete files and folders; get upload/download URLs; share objects; manage policy attachments |
| **transfers** | 10 | List, get, delete, share transfers; add transfers to Drive; initialize and finalize multipart uploads |
| **requests** | 3 | Create, inspect, and delete file upload requests sent to external recipients |
| **projects** | 3 | List, create, and delete Drive projects |
| **audit** | 3 | Query audit logs by time range, actor, file name, or file hash |

You do not call these tools by name yourself; you describe what you want
(e.g. “List all files in my Compliance project”) and the agent invokes
the appropriate tools.

## Prerequisites

- **Python 3.13 or later** (to run the server).
- **Install method:** [uv](https://docs.astral.sh/uv/) (recommended) or pip.
- **Stellarbridge API key** from **Organization Settings → API Keys** in
  the dashboard. The key is used (or exchanged for a JWT) on each
  request.

## Installation

Install from the [stllr-mcp repository](https://github.com/EpykLab/stllr-mcp/tree/master):

### With uv (recommended)

```bash
uv tool install git+https://github.com/EpykLab/stllr-mcp
```

This installs the `stellarbridge-mcp` binary into uv’s tool environment
and adds it to your `PATH`.

### With pip

```bash
pip install git+https://github.com/EpykLab/stllr-mcp
```

### Verify

```bash
stellarbridge-mcp --help
```

If the command is not found, ensure the directory where uv or pip
installs binaries is on your `PATH`. With uv, run `uv tool dir --bin`
and add that directory to your shell profile.

## Configuration

The server uses **environment variables** only (no config file). Every
variable is prefixed with `STELLARBRIDGE_`:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `STELLARBRIDGE_API_KEY` | Yes* | — | API key; exchanged for a JWT on first request |
| `STELLARBRIDGE_JWT_TOKEN` | Yes* | — | Pre-supplied JWT; skips key exchange (use one of API_KEY or JWT_TOKEN) |
| `STELLARBRIDGE_API_URL` | No | `http://localhost:8080` | Base URL of your Stellarbridge API |
| `STELLARBRIDGE_HTTP_TIMEOUT` | No | `30` | HTTP request timeout in seconds |

\*Provide either `STELLARBRIDGE_API_KEY` or `STELLARBRIDGE_JWT_TOKEN`, not both.

- **Cloud Stellarbridge:** set `STELLARBRIDGE_API_URL` to
  `https://api.stellarbridge.app` (or your tenant URL).
- **Self-hosted:** set it to your instance base URL (e.g.
  `https://files.yourcompany.com`).

## Installing the server into your agent

You must register the MCP server in your AI agent’s configuration so the
agent can start the process and call the tools. Below are steps for
common clients.

### Cursor

1. Open **Cursor → Settings → MCP** (or edit `~/.cursor/mcp.json`).
2. Add a server entry for `stellarbridge-mcp` and the required
   environment variables:

```json
{
  "mcpServers": {
    "stellarbridge": {
      "command": "stellarbridge-mcp",
      "env": {
        "STELLARBRIDGE_API_KEY": "your_api_key",
        "STELLARBRIDGE_API_URL": "https://api.stellarbridge.app"
      }
    }
  }
}
```

3. Reload MCP settings. The `stellarbridge-*` tools appear in Composer
   and can be used by the agent.

### Claude Code (Claude Code)

Add the server with the CLI:

```bash
claude mcp add stellarbridge \
  -e STELLARBRIDGE_API_KEY=your_api_key \
  -e STELLARBRIDGE_API_URL=https://api.stellarbridge.app \
  -- stellarbridge-mcp
```

Or add it manually to `~/.claude/mcp.json` (or a project-local
`.claude/mcp.json`):

```json
{
  "mcpServers": {
    "stellarbridge": {
      "command": "stellarbridge-mcp",
      "env": {
        "STELLARBRIDGE_API_KEY": "your_api_key",
        "STELLARBRIDGE_API_URL": "https://api.stellarbridge.app"
      }
    }
  }
}
```

Restart Claude Code or run `/mcp` to confirm the server is connected.

### Claude Desktop

1. Open **Claude → Settings → Developer → Edit Config**.
2. Add the `stellarbridge` entry under `mcpServers` as in the Cursor
   example above (same JSON shape).
3. Save and restart Claude Desktop. Stellarbridge tools show up in the
   tool picker.

### OpenCode

Edit `~/.config/opencode/config.json` and add:

```json
{
  "mcp": {
    "servers": {
      "stellarbridge": {
        "command": "stellarbridge-mcp",
        "env": {
          "STELLARBRIDGE_API_KEY": "your_api_key",
          "STELLARBRIDGE_API_URL": "https://api.stellarbridge.app"
        }
      }
    }
  }
}
```

Restart OpenCode; the tools are available in sessions.

### Goose

Add a toolset in `~/.config/goose/config.yaml`:

```yaml
extensions:
  stellarbridge:
    type: stdio
    cmd: stellarbridge-mcp
    env:
      STELLARBRIDGE_API_KEY: your_api_key
      STELLARBRIDGE_API_URL: https://api.stellarbridge.app
```

Enable it for a session:

```bash
goose session --with-extension stellarbridge
```

Or set it as a default extension so it loads in every session.

### Other MCP clients (stdio)

The server uses standard MCP over stdio. Run the binary and connect
your client to its stdin/stdout:

```bash
STELLARBRIDGE_API_KEY=your_api_key \
STELLARBRIDGE_API_URL=https://api.stellarbridge.app \
stellarbridge-mcp
```

For clients that support SSE transport, you can run with
`--transport sse --port 8081` or set `FASTMCP_TRANSPORT=sse` and
`FASTMCP_PORT=8081` in the environment.

## Using the tools

After the server is installed and configured, use natural language in
your agent. The agent will choose and call the right Stellarbridge tools.

Example prompts:

- *“List all files in my Compliance project”*
- *“Upload report.pdf to the Legal folder in the Compliance project”*
- *“Send a file request to contractor@example.com for this quarter’s invoice”*
- *“Show me audit logs for the last 24 hours for user alice@example.com”*
- *“Create a new project called M&A Diligence and share NDA.pdf with partner@example.com”*

The same permissions and policies that apply in the dashboard apply to
tool calls: the API key (or JWT) is tied to an identity and organization,
and Drive and transfer actions are subject to access policies.

## Upgrading

```bash
# With uv
uv tool upgrade stellarbridge-mcp

# With pip
pip install --upgrade git+https://github.com/EpykLab/stllr-mcp
```

Restart your agent or MCP client after upgrading so it uses the new binary.

## Troubleshooting

### `stellarbridge-mcp` not found after install

The binary may not be on your `PATH`. For uv, run `uv tool dir --bin`
and add that directory to your shell profile (e.g. `export PATH="$(uv tool dir --bin):$PATH"`).

### 401 Unauthorized

The API key may be expired or lack the required scopes. Create a new key
in **Organization Settings → API Keys** and set `STELLARBRIDGE_API_KEY`
(or `STELLARBRIDGE_JWT_TOKEN`) in your agent’s MCP config.

### Wrong API or empty results

For cloud Stellarbridge use `STELLARBRIDGE_API_URL=https://api.stellarbridge.app`.
For self-hosted, use your instance’s base URL. Wrong URL often leads to
connection errors or empty lists.

### Tool calls time out

Increase `STELLARBRIDGE_HTTP_TIMEOUT` (default 30 seconds). Large
uploads or slow networks may need a higher value (e.g. `60` or `120`).

### Agent does not see the tools

Confirm the MCP server is listed as connected in your agent (e.g. Cursor
MCP panel, Claude’s `/mcp`). Restart the agent after changing the config.
Ensure the `command` is exactly `stellarbridge-mcp` and that the env vars
are set in the same config object as the server.

---

## See also

- [Using the Drive](/docs/guides/drive/) — Browse, upload, download,
  share, and policies in the dashboard
- [Managing your organization](/docs/guides/managing-your-organization/)
  — API keys, users, and org settings
- [Export logs to SIEM](/docs/guides/security/) — Audit log export and
  SIEM integration
