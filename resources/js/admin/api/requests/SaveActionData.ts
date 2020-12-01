import {ActionCondition} from "../../models/ActionCondition";

export class SaveActionData {
	public id: string;
	public blockId: string;
	public handle: string|null = null;
	public data: Object|null = null;
	public conditions: ActionCondition[] = [];
}