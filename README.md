# AppSignal MCP Server [beta]

This is the official AppSignal [MCP][mcp] server. It allows AI agents to access AppSignal's monitoring data, metrics, and tools and is currently in beta.

Join our  [Discord community][discord] to help test and shape this MCP implementation.

## Prerequisites

- Docker
- An [AppSignal account][appsignal-sign-up] with API access

## Installation

Pull the Docker image:

```
docker pull appsignal/mcp:latest
```

1. Clone this repository:
   ```bash
   git clone https://github.com/appsignal/mcp.git
   cd mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration examples

### Claude

Configure Claude to use the MCP server by editing `~/Library/Application Support/Claude/claude_desktop_config.json`:
(See below for Claude _code_)

```json
{
  "mcpServers": {
    "appsignal": {
      "command": "docker",
      "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "APPSIGNAL_API_KEY",
          "appsignal/mcp"
      ],
      "env": {
        "APPSIGNAL_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Claude code

```
claude mcp add appsignal -e APPSIGNAL_API_KEY=your_api_key_here -e  -- docker run -i --rm -e APPSIGNAL_API_KEY appsignal/mcp
```

### Zed

```json
{
  "context_servers": {
    "appsignal": {
      "command": {
        "path": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "APPSIGNAL_API_KEY",
           "appsignal/mcp"
        ],
        "env": {
          "APPSIGNAL_API_KEY": "your_api_key_here"
        }
      },
      "settings": {}
    }
  }
}
```

## Development

To work on the MCP server:

1. Start the TypeScript compiler in watch mode:
   ```bash
   npm run watch
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Use the MCP inspector for debugging:
   ```bash
   npm run inspector
   ```

## Contributing

Thinking of contributing to our project? Awesome! 🚀

Please follow our [Contributing guide][contributing-guide] in our
documentation and follow our [Code of Conduct][coc].

Also, we would be very happy to send you Stroopwafles. Have look at everyone
we send a package to so far on our [Stroopwafles page][waffles-page].

## Support

- Join our [Discord community][discord] to chat with other developers and the AppSignal team
- [Contact us][contact] to speak directly with the engineers working on AppSignal. They will help you get set up, tweak your code and make sure you get the most out of using AppSignal.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About AppSignal

[AppSignal][appsignal] provides real-time performance monitoring for your web applications. Track errors, monitor performance, measure client-side metrics, and receive alerts when things go wrong.

[mcp]: https://github.com/anthropics/anthropic-tools/blob/main/model-context-protocol.md
[appsignal]: https://www.appsignal.com
[appsignal-sign-up]: https://appsignal.com/users/sign_up
[contact]: mailto:support@appsignal.com
[coc]: https://docs.appsignal.com/appsignal/code-of-conduct.html
[waffles-page]: https://www.appsignal.com/waffles
[contributing-guide]: https://docs.appsignal.com/appsignal/contributing.html
[discord]: https://discord.gg/fT2cbMuQSJ
