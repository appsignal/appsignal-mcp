# AppSignal MCP Server

This is the official [AppSignal](https://www.appsignal.com/tour/mcp-server) [MCP][mcp] server. AppSignal MCP gives your AI editor direct access to your monitoring data: errors, traces, logs, metrics, and dashboards.


<img width="1067" height="600" alt="AppSignal MCP server answering a question in an AI editor" src="https://github.com/user-attachments/assets/bfc4a9d2-fd78-4111-8e91-78b441ea10ce" />


AppSignal MCP is a public HTTP endpoint at `https://appsignal.com/api/mcp`. Connect your agent to that endpoint directly. **You don't need this repository to use AppSignal MCP.**

> [!IMPORTANT]
> **This repo is unmaintained. Please use the [AppSignal MCP endpoint directly](https://docs.appsignal.com/mcp-server).**
> This repository holds a legacy stdio proxy, published as the `appsignal/mcp` Docker image and the `@appsignal/mcp` npm package. It still works, but it is no longer the recommended way to connect and we do not plan to develop it further. Connect to `https://appsignal.com/api/mcp` instead. See [Legacy stdio proxy](#legacy-stdio-proxy) if your setup needs it.

Read the full MCP reference on the [AppSignal official documentation](https://docs.appsignal.com/mcp-server).

Join our [Discord community][discord] to help shape this MCP implementation. Feature requests are welcome!

## Connect to AppSignal MCP

The endpoint authenticates with OAuth, so there is no server to install or run. In Claude Code:

```bash
claude mcp add --transport http appsignal https://appsignal.com/api/mcp
```

Claude Code starts the browser sign-in the first time an AppSignal tool is used. Run `claude mcp list` to confirm it shows as connected.

The [setup guide][docs-setup] covers the Claude app, Cursor, Devin, Zed, VS Code, GitHub Copilot CLI, Gemini CLI, and OpenAI Codex. To authenticate with an [MCP token][appsignal-mcp-token] instead of OAuth, add an `Authorization: Bearer <YOUR_MCP_TOKEN>` header. The setup guide shows the exact form for each editor.

## What you can access

The endpoint exposes read and write tools across seven areas: error incidents, performance, anomaly detection, logging, metrics, dashboards, and app discovery. With an MCP token, you can set each area to `read`, `write`, or disabled. With OAuth, AppSignal exposes all read and write tools at once.

For the full list of tools, parameters, and example prompts, see the [MCP tool reference][docs-reference].

## Legacy stdio proxy

The Docker image and npm package in this repository wrap the HTTP endpoint in a stdio transport. Use them only for agents that cannot speak HTTP MCP, or in environments that restrict outbound traffic.

This path is obsolete and we do not recommend it. It keeps working, but all new work goes into the HTTP endpoint.

The proxy authenticates with an [MCP token][appsignal-mcp-token], so it exposes the toolsets that token allows. A token created before a tool shipped does not include that tool unless you set the token to expose new tools automatically. Connect to `https://appsignal.com/api/mcp` over OAuth for all read and write tools, or see [Missing any tools?][docs-missing-tools].

### Requirements

- Docker
- An [AppSignal account][appsignal-sign-up] and an [AppSignal MCP token][appsignal-mcp-token]

### Run the proxy

Pull the Docker image:

```
docker pull appsignal/mcp:latest
```

The image reads two environment variables: `APPSIGNAL_API_KEY` (required, your MCP token) and `APPSIGNAL_ENDPOINT` (optional, defaults to `https://appsignal.com/api/mcp`).

In Claude Code:

```bash
claude mcp add appsignal -e APPSIGNAL_API_KEY=your-mcp-token -- docker run -i --rm -e APPSIGNAL_API_KEY appsignal/mcp
```

For other agents, register the same `docker run` command as a stdio MCP server. Most agents use this shape, but check your agent's own MCP documentation for its exact schema:

```json
{
  "mcpServers": {
    "appsignal": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "APPSIGNAL_API_KEY", "appsignal/mcp"],
      "env": {
        "APPSIGNAL_API_KEY": "your-mcp-token"
      }
    }
  }
}
```

## Development

This repository contains the stdio proxy only. The tools themselves live in the AppSignal application, so new tools and endpoints reach the proxy without a change here.

To work on the proxy:

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

### Change management

Every change that will results in a new version to be released, requires a changeset.
Changesets are small Markdown file that describe the change for the end-user.
The changeset's frontmatter describes the type of change (new feature, bug fix, etc.) and the version bump (major, minor, or patch).

Use [Mono's changeset CLI](https://github.com/appsignal/mono/?tab=readme-ov-file#changeset-add) to generate a new changeset file.
Commit the changeset file and include it in your Pull Requests.

```
mono changeset add
```

### Publishing

Install [Mono](https://github.com/appsignal/mono/), the tool used for release management.

```
git pull # Ensure you have the latest version

mono publish # Publish a new version
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

[mcp]: https://modelcontextprotocol.io/introduction
[docs-setup]: https://docs.appsignal.com/mcp/setup
[docs-reference]: https://docs.appsignal.com/mcp/reference
[docs-missing-tools]: https://docs.appsignal.com/mcp/usage#missing-any-tools
[appsignal]: https://www.appsignal.com
[appsignal-sign-up]: https://appsignal.com/users/sign_up
[appsignal-mcp-token]: https://appsignal.com/users/mcp_tokens
[contact]: mailto:support@appsignal.com
[coc]: https://docs.appsignal.com/appsignal/contributing/code-of-conduct
[waffles-page]: https://www.appsignal.com/waffles
[contributing-guide]: https://docs.appsignal.com/appsignal/contributing
[discord]: https://discord.gg/fT2cbMuQSJ
