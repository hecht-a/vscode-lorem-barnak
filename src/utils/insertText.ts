import { getText } from "lorembarnak";
import { window } from "vscode";

import { randomInt } from "./randomInt";

export function insertText(count?: number, nbrParagraphs = 1, newLine?: boolean): void {
	const c = count ?? randomInt(4) + 4;
	const editor = window.activeTextEditor;
	if (!editor) {
		window.showErrorMessage("There is no active text editor.");
		return;
	}
	editor.edit((edit) =>
		editor.selections.forEach((selection) => {
			edit.delete(selection);
			if (nbrParagraphs !== undefined && nbrParagraphs > 0) {
				for (let i = 0; i < nbrParagraphs; i++) {
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					newLine
						? edit.insert(selection.start, `${getText(c)}\n`)
						: edit.insert(selection.start, `${getText(c)} `);
				}
			} else {
				edit.insert(selection.start, getText(c));
			}
		}),
	);
}
