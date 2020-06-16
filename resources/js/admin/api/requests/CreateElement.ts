export class CreateElement {
	public pageId: string;
	public blockId: string;
	public type: string;
	public parentBlockId: string|null = null;
	public position: number|null;
}