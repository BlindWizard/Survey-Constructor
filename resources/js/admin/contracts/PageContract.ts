import {BlockContract} from "./BlockContract";
import {Container} from "../models/Container";

export interface PageContract {
	getId(): string;
	getStep(): number;
	setStep(step: number): void;
	getBlocks(): any;
	getBlockById(blockId: string): BlockContract|null;
	getContainerBySlotId(slotId: string): Container|null;
	getBlocksInOrder(): BlockContract[]
	setBlocks(blocks: BlockContract[]): void;
	deleteBlock(blockId: string): void;
}