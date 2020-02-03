import {BlockContract} from "./BlockContract";

export interface PageContract {
	getId(): string;
	getStep(): number;
	getBlocks(): BlockContract[];
}