import {SurveyContract} from "../contracts/SurveyContract";
import {PageContract} from "../contracts/PageContract";
import {SurveyStatistics} from "./SurveyStatistics";
import {SurveyData} from "./SurveyData";
import {VariableData} from "./VariableData";

export class Survey implements SurveyContract
{
	public id: string;
	public title: string;
	public ownerId: string;
	public pages: object = {};
	public createdAt: string;
	public updatedAt: string;
	public statistics: SurveyStatistics;
	public data: object = {};

	getId(): string {
		return this.id;
	}

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

	getDataset(): object
	{
		return this.data;
	}

	setData(data: SurveyData)
	{
		let newData = {};
		for(let id of Object.keys(this.data)) {
			newData[id] = this.data[id];
		}

		newData[data.id] = data;

		this.data = newData;
	}
}