import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {BlockStyle} from "./BlockStyle";

export class Image implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public imageId: string|null;
	public imageUrl: string|null;
	public style: BlockStyle;

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
			'imageId': this.imageId,
			'imageUrl': this.imageUrl,
		};
	}

	setData(data: Object): void
	{
		this.imageId = data['imageId'];
		this.imageUrl = data['imageUrl'];
	}

	getStyle(): Object {
		return {'style': this.style};
	}

	setStyle(data: Object) {
		this.style = data['style'];
	}
}