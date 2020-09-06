import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {BlockStyle} from "./BlockStyle";
import {BlockAction} from "./BlockAction";

export class Delimiter implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public style: BlockStyle;
	public actions: BlockAction[] = [];

	getType(): string
	{
		return BlockTypes.DELIMITER;
	}

	getId(): string
	{
		return this.id;
	}

	getPosition(): number
	{
		return this.position;
	}

	getParentId(): string {
		return this.parentId;
	}

	setPosition(position: number)
	{
		this.position = position;
	}

	setParentId(id: string) {
		this.parentId = id;
	}

	getData(): Object
	{
		return {};
	}

	setData(data: Object): void {}

	getStyle(): Object {
		return {'style': this.style};
	}

	setStyle(data: Object) {
		this.style = data['style'];
	}

	getActions(): BlockAction[] {
		return this.actions;
	}

	setActions(data: BlockAction[]): void {
		this.actions = data;
	}
}