import {BlockContract} from "../contracts/BlockContract";
import {PageContract} from "../contracts/PageContract";

export class Survey
{
	public id: string;
	public title: string;
	public ownerId: string;
	public blocks: BlockContract[] = [];
	public pages: PageContract[] = [];
	public createdAt: string;
	public updatedAt: string;
}