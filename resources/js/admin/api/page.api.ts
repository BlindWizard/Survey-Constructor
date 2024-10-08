import {axios} from "../../common/axios";
import {Page} from "../models/Page";
import {AjaxHelper} from "../contracts/AjaxHelper";

export class PageApi {
	public static add(surveyId: string): Promise<Page>
	{
		return axios.post('/admin/page/add', {surveyId})
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let page = new Page();
				page.id = result.data.id;
				page.step = result.data.step;

				return page;
			});
	}

	public static delete(pageId: string): Promise<any>
	{
		return axios.post('/admin/page/delete', {pageId});
	}
}