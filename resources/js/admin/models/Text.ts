import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Text implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public text: string;

	getType(): string
	{
		return BlockTypes.TEXT;
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
			'text': this.text,
		};
	}

	setData(data: Object): void
	{
		this.text = data['text'];
	}
}