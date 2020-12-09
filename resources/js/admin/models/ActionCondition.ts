export class ActionCondition {
	public id: string;
	public comparison: string|null = null;
	public expected: any|null = null;
	public got: any|null = null;

	public empty(): boolean {
		return null !== this.comparison && null !== this.expected && null !== this.got;
	}
}