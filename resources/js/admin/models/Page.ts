import {BlockContract} from "../contracts/BlockContract";
import {PageContract} from "../contracts/PageContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {Container} from "./Container";

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

	getBlockById(blockId: string): BlockContract|null
	{
		for (let innerBlockId of Object.keys(this.blocks)) {
			let block = this.blocks[innerBlockId];
			if (blockId === block.getId()) {
				return block;
			}

			if (BlockTypes.CONTAINER === block.getType()) {
				block = this.getBlockByIdInContainer(blockId, block);
				if (null !== block) {
					return block;
				}
			}
		}

		return null;
	}

	getBlockByIdInContainer(blockId: string, container: Container): BlockContract|null
	{
		for (let slotId of Object.keys(container.children)) {
			let children = container.children[slotId];
			for (let innerBlockId of Object.keys(children)) {
				let block = children[innerBlockId];
				if (block.getId() === blockId) {
					return block;
				}

				if (BlockTypes.CONTAINER === block.getType()) {
					block = this.getBlockByIdInContainer(blockId, block);
					if (null !== block) {
						return block;
					}
				}
 			}
		}

		return null;
	}

	getContainerBySlotId(slotId: string): Container|null
	{
		for (let blockId of Object.keys(this.blocks)) {
			let container = this.blocks[blockId];
			if (BlockTypes.CONTAINER === container.getType()) {
				if (-1 !== container.slots.indexOf(slotId)) {
					return container;
				}

				container = this.getContainerBySlotIdInContainer(slotId, container);
				if (null !== container) {
					return container;
				}
			}
		}

		return null;
	}

	getContainerBySlotIdInContainer(slotId: string, container: Container): Container|null
	{
		for (let innerSlotId of Object.keys(container.children)) {
			let children = container.children[innerSlotId];
			for (let innerBlockId of Object.keys(children)) {
				let container = children[innerBlockId];
				if (BlockTypes.CONTAINER === container.getType()) {
					if (-1 !== container.slots.indexOf(slotId)) {
						return container;
					}

					container = this.getContainerBySlotIdInContainer(slotId, container);
					if (null !== container) {
						return container;
					}
				}
			}
		}

		return null;
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