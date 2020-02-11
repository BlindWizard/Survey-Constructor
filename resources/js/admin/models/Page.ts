import {BlockContract} from "../contracts/BlockContract";
import {PageContract} from "../contracts/PageContract";

export class Page implements PageContract
{
	public id: string;
	public step: number;
	public blocks: any = {};
	public createdAt: string;
	public updatedAt: string;

	getBlocks()
	{
		return this.blocks;
	}

	getBlocksInOrder(): BlockContract[]
	{
		let blocks: BlockContract[] = [];
		for (let blockId of Object.keys(this.blocks)) {
			let block: BlockContract = this.blocks[blockId];
			blocks.push(block);
		}

		blocks.sort((a: BlockContract, b: BlockContract) => {
			return a.getPosition() - b.getPosition();
		});

		return blocks;
	}

	setBlocks(blocks: BlockContract[]): void
	{
		this.blocks = {};
		for (let block of blocks) {
			this.blocks[block.getId()] = block;
		}
	}

	deleteBlock(blockId: string): void
	{
		delete this.blocks[blockId];
	}

	getId(): string
	{
		return this.id;
	}

	getStep(): number
	{
		return this.step;
	}

	setStep(step: number): void
	{
		this.step = step;
	}
}