import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class TextField implements BlockContract {
	public id: string;
	public position: number;
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

	setPosition(position: number)
	{
		this.position = position;
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