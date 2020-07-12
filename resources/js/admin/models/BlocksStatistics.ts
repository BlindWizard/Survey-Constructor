import {BlockStatistics} from "./BlockStatistics";

export class BlocksStatistics {
	public surveyId: string;
	public surveyName: string;
	public tokenId: string;
	public tokenLabel: string;
	public startDate: string;
	public lastDate: string;
	public blockStatistics: BlockStatistics[] = [];
}