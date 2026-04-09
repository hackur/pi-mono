/**
 * Gemma 4 example for pi SDK
 *
 * Shows how to select a built-in or custom Gemma 4 model and run a prompt.
 */

import { AuthStorage, createAgentSession, ModelRegistry, SessionManager } from "@mariozechner/pi-coding-agent";

const authStorage = AuthStorage.create();
const modelRegistry = ModelRegistry.create(authStorage);

const builtInGemma = modelRegistry.find("google", "gemma-4-26b-a4b-it");
const customGemma = modelRegistry.find("gemini", "gemma-4-26b-a4b-it");
const model = builtInGemma ?? customGemma;

if (!model) {
	throw new Error(
		"Gemma 4 model not found. Configure ~/.pi/agent/models.json or set your Google credentials. " +
			"Built-in model id: google/gemma-4-26b-a4b-it",
	);
}

console.log(`Using model: ${model.provider}/${model.id}`);

const { session } = await createAgentSession({
	sessionManager: SessionManager.inMemory(),
	authStorage,
	modelRegistry,
	model,
});

session.subscribe((event) => {
	if (event.type === "message_update") {
		const update = event.assistantMessageEvent;
		if (update.type === "text_delta") {
			process.stdout.write(update.delta);
		}
	}
});

await session.prompt("Describe how to set up and use Google Gemma 4 in pi.");
console.log();
