import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {Option} from "./Option";

export class OptionsList implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public options: Option[] = [];
	public text: string;
	public multiple: boolean = false;

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
		let optionsData: Array<Object> = [];
		this.options.forEach((option: Option) => {
			optionsData.push({
				'id': option.getId(),
				...option.getData(),
				'position': option.getPosition(),
			});
		});

		return {
			'text': this.text,
			'options': optionsData,
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
}