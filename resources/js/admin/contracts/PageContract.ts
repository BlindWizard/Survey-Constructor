import {BlockContract} from "./BlockContract";

export interface PageContract {
	getId(): string;
	getStep(): number;
	setStep(step: number): void;
	getBlocks(): any;
	getBlocksInOrder(): BlockContract[]
	setBlocks(blocks: BlockContract[]): void;
	deleteBlock(blockId: string): void;
}