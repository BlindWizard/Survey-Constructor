import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class Container implements BlockContract {
	public id: string;
	public position: number;
	public slotsCount: number;
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
		this.slotsCount = data['slotsCount'];
		this.children = data['children'];
	}

	setPosition(position: number): void {
		this.position = position;
	}

	getData(): Object {
		return {
			'slotsCount': this.slotsCount,
			'children': this.children,
		};
	}

	getBlocksInOrder(): BlockContract[]
	{
		let blocks: BlockContract[] = [];
		for (let blockId of Object.keys(this.children)) {
			let block: BlockContract = this.children[blockId];
			blocks.push(block);
		}

		blocks.sort((a: BlockContract, b: BlockContract) => {
			return a.getPosition() - b.getPosition();
		});

		return blocks;
	}

	setBlocks(blocks: BlockContract[]): void
	{
		this.children = {};
		for (let block of blocks) {
			this.children[block.getId()] = block;
		}
	}
}