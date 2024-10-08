import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {Option} from "./Option";
import {BlockStyle} from "./BlockStyle";
import {BlockAction} from "./BlockAction";

export class OptionsList implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public options: Option[] = [];
	public text: string;
	public multiple: boolean = false;
	public style: BlockStyle;
	public actions: BlockAction[] = [];

	getType(): string
	{
		return BlockTypes.OPTIONS_LIST;
	}

	getId(): string
	{
		return this.id;
	}

	getParentId(): string {
		return this.parentId;
	}

	getPosition(): number
	{
		return this.position;
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
		return {
			'text': this.text,
			'options': this.options,
			'multiple': this.multiple,
		};
	}

	setData(data: Object): void
	{
		this.text = data['text'];
		this.multiple = data['multiple'];
		this.options = [];

		data['options'].forEach((option: Option, i: number) => {
			this.options.push(option)
		});
	}

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