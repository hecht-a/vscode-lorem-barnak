import { window } from "vscode";

import { insertText } from "./insertText";
import { randomInt } from "./randomInt";

export async function generateMultipleParagraphs(): Promise<void> {
	const items = [];
	const resp: Record<string, boolean> = { yes: true, no: false };
	for (let i = 1; i <= 8; i++) {
		items.push(i.toString());
	}

	let newLine = await window.showQuickPick(["yes", "no"], {
		placeHolder: "Do you want new line after each paragraph?",
	});
	const count = await window.showInputBox({
		valueSelection: [1, 1],
		prompt: "How many paragraphs to generate?",
		placeHolder: "Enter a number",
		validateInput(value: string) {
			return !/^\d+$/.test(value) || value === "0" ? "Please enter a valid number and over than 0." : undefined;
		},
	});
	if (!newLine || newLine === undefined) {
		newLine = "yes";
	}
	if (!count) {
		window.showErrorMessage("You must choose how many paragraphs to insert.");
		return;
	}

	insertText(randomInt(4) + 10, Number.parseInt(count, 10), resp[newLine]);
}
