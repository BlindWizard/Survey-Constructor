import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Container implements BlockContract {
	public id: string;
	public position: number;
	public slots: string[] = [];
	public children: any = {};

	getId(): string {
		return this.id;
	}

	getPosition(): number {
		return this.position;
	}

	getType(): string {
		return BlockTypes.CONTAINER;
	}

	setData(data: Object): void {
		this.slots = data['slots'];
		this.children = data['children'];
	}

	setPosition(position: number): void {
		this.position = position;
	}

	getData(): Object {
		return {
			'slots': this.slots,
			'children': this.children,
		};
	}

	getBlocksInOrder(slotId: string): BlockContract[]
	{
		let blocks: BlockContract[] = [];

		if (!this.children[slotId] || 0 === this.children[slotId].length) {
			return blocks;
		}

		for (let blockId of Object.keys(this.children[slotId])) {
			let block: BlockContract = this.children[slotId][blockId];
			blocks.push(block);
		}

		blocks.sort((a: BlockContract, b: BlockContract) => {
			return a.getPosition() - b.getPosition();
		});

		return blocks;
	}

	setBlocks(slotId: string, blocks: BlockContract[]): void
	{
		this.children[slotId] = {};
		for (let block of blocks) {
			this.children[slotId][block.getId()] = block;
		}
	}
}