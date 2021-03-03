import { window } from "vscode";

import { insertText } from "./insertText";

export async function generateMultipleParagraphs(): Promise<void> {
	const items = [];
	for (let i = 1; i <= 8; i++) {
		items.push(i.toString());
	}

	const count = await window.showQuickPick(items, { placeHolder: "How many paragraphs?" });
	if (!count) {
		window.showErrorMessage("You must choose how many paragraphs to insert.");
		return;
	}

	insertText(10, Number.parseInt(count, 10), true);
}
