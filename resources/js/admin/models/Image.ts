import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Image implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public imageUrl: string;

	getType(): string
	{
		return BlockTypes.IMAGE;
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
			'imageUrl': this.imageUrl,
		};
	}

	setData(data: Object): void
	{
		this.imageUrl = data['imageUrl'];
	}
}