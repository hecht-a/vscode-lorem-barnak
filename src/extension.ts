import { commands, ExtensionContext } from "vscode";

import { generateLine } from "./utils/generateLine";
import { generateMultipleParagraphs } from "./utils/generateMultiplesParagraphs";
import { generateParagraph } from "./utils/generateParagraph";

export function activate(context: ExtensionContext): void {
	const cmds = [
		commands.registerCommand("lorem-barnak.line", generateLine),
		commands.registerCommand("lorem-barnak.paragraph", generateParagraph),
		commands.registerCommand("lorem-barnak.multipleParagraphs", generateMultipleParagraphs),
	];

	cmds.forEach((command) => context.subscriptions.push(command));
}

export function deactivate(): void {}
