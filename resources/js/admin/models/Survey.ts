import {BlockContract} from "../contracts/BlockContract";

export class Survey
{
	public id: string;
	public title: string;
	public ownerId: string;
	public blocks: BlockContract[] = [];
	public createdAt: string;
	public updatedAt: string;
}