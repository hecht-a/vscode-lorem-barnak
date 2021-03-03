import { insertText } from "./insertText";
import { randomInt } from "./randomInt";

export function generateParagraph(): void {
	insertText(randomInt(4) + 10);
}
