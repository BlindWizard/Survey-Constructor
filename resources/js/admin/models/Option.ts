import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Option implements BlockContract {
	public id: string;
	public position: number;

	getType(): string {
		return BlockTypes.OPTION
	}

	getId(): string {
		return this.id;
	}

	getPosition(): number {
		return this.position;
	}
}