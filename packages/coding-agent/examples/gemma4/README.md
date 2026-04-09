# Gemma 4 Support for pi

This example package documents how to use Google Gemma 4 with `pi` and provides a small extension to show a sample `models.json` configuration.

## How to use

### Built-in support

`@mariozechner/pi-ai` already includes built-in support for Google Gemma 4 models such as `gemma-4-26b-a4b-it` via the `google-generative-ai` provider.

If your environment already has a valid Google API key for Gemini/Gemini Studio, the built-in model ID is:

- `google/gemma-4-26b-a4b-it`

You can also add a custom provider to `~/.pi/agent/models.json` when you need a different base URL or a custom Google AI Studio endpoint.

### Sample custom `models.json`

Copy `models.json.example` to `~/.pi/agent/models.json` and fill in your API key name or literal value.

```json
{
  "providers": {
    "gemini": {
      "api": "google-generative-ai",
      "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
      "apiKey": "GEMINI_API_KEY",
      "models": [
        {
          "id": "gemma-4-26b-a4b-it",
          "name": "Gemma 4 26B A4B",
          "input": ["text", "image"],
          "reasoning": true,
          "contextWindow": 256000,
          "maxTokens": 8192
        }
      ]
    }
  }
}
```

If you use an environment variable, set it before running `pi`:

```bash
export GEMINI_API_KEY=...
```

## Local LM Studio OpenAI-compatible API

If LM Studio is running locally with an OpenAI-compatible endpoint, override the built-in Google provider and route `google/gemma-4-26b-a4b-it` through your local server.

Copy `models.lm-studio.json.example` to `~/.pi/agent/models.json` and set your LM Studio key if needed.

```bash
export LMSTUDIO_API_KEY=...
```

The example uses `openai-completions` and disables developer-role compatibility, which is often required for local OpenAI-compatible backends.

If you have installed this package inside `pi`, run `/gemma4-lm-studio-config` to open the sample local LM Studio config in the editor.

## Using the package

Install or load the package with:

```bash
pi install /path/to/pi-mono/packages/coding-agent/examples/gemma4
```

Or load temporarily:

```bash
pi -e ./packages/coding-agent/examples/gemma4
```

Then run the command:

```bash
/gemma4-config
```

This opens a sample config in the editor.

## Running validation tests

From the repo root, run:

```bash
cd packages/coding-agent
npx vitest --run test/model-registry.test.ts
```

This verifies the custom `google/gemma-4-26b-a4b-it` LM Studio provider and auth resolution behavior.

## Selecting the model

Once your API key is configured, run `/model` inside `pi` and choose one of:

- `google/gemma-4-26b-a4b-it`
- `gemini/gemma-4-26b-a4b-it` (if you added a custom provider named `gemini`)

If you already have the model loaded by your environment, these entries should appear when the provider has valid credentials.

## SDK example

See `packages/coding-agent/examples/sdk/14-gemma4.ts` for a small script that selects Gemma 4 and runs a prompt.
