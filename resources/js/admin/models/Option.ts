import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Option implements BlockContract {
	public id: string;
	public position: number;
	public text: string;

	getType(): string {
		return BlockTypes.OPTION
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