import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Header implements BlockContract {
	public id: string;
	public position: number;
	public text: string;

	getType(): string
	{
		return BlockTypes.HEADER;
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
			'text': this.text,
		};
	}

	setData(data: Object): void
	{
		this.text = data['text'];
	}
}