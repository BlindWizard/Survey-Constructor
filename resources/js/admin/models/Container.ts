import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {BlockStyle} from "./BlockStyle";
import {BlockAction} from "./BlockAction";

export class Container implements BlockContract {
	public id: string;
	public position: number;
	public parentId: string;
	public slots: string[] = [];
	public children: Object;
	public style: BlockStyle;
	public slotsStyle: Object;
	public actions: BlockAction[] = [];

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
		this.slots = data['slots'].slice(0);
		this.children = {};
		for(let slotId of Object.keys(data['children'])) {
			this.children[slotId] = {};
			for (let blockId of Object.keys(data['children'][slotId])) {
				let block = ComponentsFactory.cloneElement(data['children'][slotId][blockId]);
				block.setParentId(slotId);

				this.children[slotId][blockId] = block;
			}
		}
	}

	setPosition(position: number): void {
		this.position = position;
	}

	getParentId(): string {
		return this.parentId;
	}

	setParentId(id: string) {
		this.parentId = id;
	}

	getData(): Object {
		return {
			'slots': this.slots,
			'children': this.children,
		};
	}

	getStyle(): Object {
		return {
			'style': this.style,
			'slotsStyle': this.slotsStyle,
		}
	}

	setStyle(data: Object) {
		this.style = data['style'];
		this.slotsStyle = data['slotsStyle'];
	}

	getBlocksInOrder(slotId: string): BlockContract[]
	{
		if (!this.children[slotId] || 0 === this.children[slotId].length) {
			return [];
		}

		let blocks: BlockContract[] = [];

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
			block.setParentId(slotId);
			this.children[slotId][block.getId()] = ComponentsFactory.cloneElement(block);
		}
	}

	deleteBlock(blockId: string): void
	{
		for (let slotId of Object.keys(this.children)) {
			let blocks = this.getBlocksInOrder(slotId).filter((block: BlockContract) => {
				return block.getId() !== blockId;
			});

			this.setBlocks(slotId, blocks);
		}
	}

	getActions(): BlockAction[] {
		return this.actions;
	}

	setActions(data: BlockAction[]): void {
		this.actions = data;
	}
}