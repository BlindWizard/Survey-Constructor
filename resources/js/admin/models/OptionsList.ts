import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {Option} from "./Option";

export class OptionsList implements BlockContract {
	public id: string;
	public surveyId: string;
	public position: number;
	public options: Option[] = [];
	public multiple: boolean = false;

	getType(): string {
		return BlockTypes.OPTIONS_LIST
	}

	getId(): string {
		return this.id;
	}

	getPosition(): number {
		return this.position;
	}

	setPosition(position: number) {
		this.position = position;
	}
}