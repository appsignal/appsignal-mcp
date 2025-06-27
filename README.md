# AppSignal MCP Server

The AppSignal MCP Server is an implementation of the [Model Context Protocol (MCP)][mcp] that connects any with AppSignal's API. This integration allows AI agents to access AppSignal's monitoring data, metrics, and tools.

## Prerequisites

- Node.js 20.10.0 or higher
- An [AppSignal account][appsignal-sign-up] with API access

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/appsignal/appsignal-mcp.git
   cd appsignal-mcp
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

#### Claude

Configure Claude to use the MCP server by editing `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "appsignal": {
      "command": "node",
      "args": [
        "/path/to/appsignal-mcp/build/index.js"
      ],
      "env": {
        "APPSIGNAL_API_KEY": "your_api_key_here"
      }
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
