import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {BlockStyle} from "./BlockStyle";

export class TextField implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public label: string;
	public placeholder: string;
	public multiline: boolean;
	public style: BlockStyle;

	getType(): string
	{
		return BlockTypes.TEXT_FIELD;
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
		return {
			'label': this.label,
			'placeholder': this.placeholder,
			'multiline': this.multiline,
		};
	}

	setData(data: Object): void
	{
		this.label = data['label'];
		this.placeholder = data['placeholder'];
		this.multiline = data['multiline'];
	}

	getStyle(): Object {
		return {'style': this.style};
	}

	setStyle(data: Object) {
		this.style = data['style'];
	}
}