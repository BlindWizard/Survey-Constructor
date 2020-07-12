import {OptionStatistics} from "./OptionStatistics";

export class BlockStatistics {
	public type: string;
	public blockId: string;
	public blockLabel: string;
	public options: OptionStatistics[] = [];
}