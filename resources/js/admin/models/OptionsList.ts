import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class OptionsList implements BlockContract {
	public id: string;
	public surveyId: string;
	public position: number;
	public options: BlockContract[] = [];
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
}