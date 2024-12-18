# AppSignal MCP Server

Proof of concept, don't use this in production, or anywhere, really.

## Installation

Clone repo and install dependencies:

```
asdf local nodejs 20.10.0
npm install
```

Install the Claude app.
Add appsignal as an mcpServer: `zed  ~/Library/Application\ Support/Claude/claude_desktop_config.json`

```bash
{
  "mcpServers": {
    "appsignal": {
      "command": "/Users/<your username>/.asdf/installs/nodejs/20.10.0/bin/node",
      "args": [
        "/Users/your username/appsignal/appsignal-mcp/build/index.js"
      ],
      "env": {
        "APPSIGNAL_API_KEY": "<staging api key>",
        "APPSIGNAL_ENDPOINT": "http://localhost:5000/api/mcp"
      }
    }
  }
}
```

## Debugging

Tail the logs:

```
tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
```
