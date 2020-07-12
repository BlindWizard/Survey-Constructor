import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class TextField implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public label: string;
	public placeholder: string;
	public multiline: boolean;

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
}