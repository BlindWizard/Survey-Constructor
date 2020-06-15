export class CreateElement {
	pageId: string;
	blockId: string;
	type: string;
	parentBlockId: string|null = null;
	position: number|null;
}