import {SurveyContract} from "../contracts/SurveyContract";
import {PageContract} from "../contracts/PageContract";
import {BlockContract} from "../contracts/BlockContract";

export class Survey implements SurveyContract
{
	public id: string;
	public title: string;
	public ownerId: string;
	public pages: any = {};
	public createdAt: string;
	public updatedAt: string;

	getPages()
	{
		return this.pages;
	}

	getPagesByStep(): PageContract[]
	{
		let pages: PageContract[] = [];
		for (let pageId of Object.keys(this.pages)) {
			let page: PageContract = this.pages[pageId];
			pages[page.getStep()] = page;
		}

		return pages;
	}
}