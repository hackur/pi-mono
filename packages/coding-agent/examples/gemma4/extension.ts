import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const SAMPLE_MODELS_JSON = `{
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
`;

const SAMPLE_LM_STUDIO_MODELS_JSON = `{
  "providers": {
    "google": {
      "api": "openai-completions",
      "baseUrl": "http://127.0.0.1:3000/v1",
      "apiKey": "LMSTUDIO_API_KEY",
      "compat": {
        "supportsDeveloperRole": false,
        "supportsReasoningEffort": false
      },
      "models": [
        {
          "id": "gemma-4-26b-a4b-it",
          "name": "Gemma 4 26B A4B (LM Studio)",
          "input": ["text", "image"],
          "reasoning": true,
          "contextWindow": 262144,
          "maxTokens": 8192
        }
      ]
    }
  }
}
`;

export default function (pi: ExtensionAPI) {
	pi.registerCommand("gemma4-config", {
		description: "Show a sample Gemma 4 models.json configuration",
		async handler(_args, ctx) {
			ctx.ui.setEditorText(SAMPLE_MODELS_JSON);
		},
	});

	pi.registerCommand("gemma4-lm-studio-config", {
		description: "Show a sample LM Studio OpenAI-compatible Gemma 4 models.json configuration",
		async handler(_args, ctx) {
			ctx.ui.setEditorText(SAMPLE_LM_STUDIO_MODELS_JSON);
		},
	});
}
