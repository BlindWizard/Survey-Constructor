import {ActionCondition} from "./ActionCondition";

export class BlockAction {
	public id: string;
	public type: string;
	public handle: string|null = null;
	public data: Object|null = null;
	public conditions: ActionCondition[] = [];
}