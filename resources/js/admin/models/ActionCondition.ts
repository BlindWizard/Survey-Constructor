export class ActionCondition {
	public id: string;
	public comparison: string|null = null;
	public expected: any|null = null;
	public got: any|null = null;
}