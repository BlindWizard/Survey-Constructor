import {BlockContract} from "../contracts/BlockContract";
import {PageContract} from "../contracts/PageContract";

export class Page implements PageContract
{
	public id: string;
	public step: number;
	public blocks: BlockContract[] = [];
	public createdAt: string;
	public updatedAt: string;

	getBlocks(): BlockContract[] {
		return this.blocks;
	}

	getId(): string {
		return this.id;
	}

	getStep(): number {
		return this.step;
	}
}