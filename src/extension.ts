import { getText } from "lorembarnak";
import * as vscode from "vscode";

function randomInt(max: number): number {
	return Math.floor(Math.random() * Math.floor(max));
}

function insertText(count?: number): void {
	const c = count ?? randomInt(4) + 6;
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	editor.edit((edit) =>
		editor.selections.forEach((selection) => {
			edit.delete(selection);
			edit.insert(selection.start, getText(c));
		}),
	);
}

function generateLine(): void {
	insertText();
}

function generateParagraph(): void {
	insertText(randomInt(4) + 10);
}

async function generateMultipleParagraphs(): Promise<void> {
	const items = [];
	for (let i = 10; i <= 20; i++) {
		items.push(i.toString());
	}

	const count = await vscode.window.showQuickPick(items, { placeHolder: "How many paragraphs?" });
	if (!count) {
		return;
	}

	insertText(Number.parseInt(count, 10));
}
export function activate(context: vscode.ExtensionContext): void {
	const commands = [
		vscode.commands.registerCommand("lorem-barnak.line", generateLine),
		vscode.commands.registerCommand("lorem-barnak.paragraph", generateParagraph),
		vscode.commands.registerCommand("lorem-barnak.multipleParagraphs", generateMultipleParagraphs),
	];

	commands.forEach((command) => context.subscriptions.push(command));
}

export function deactivate(): void {}
