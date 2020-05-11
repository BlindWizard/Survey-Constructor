import {Survey} from "../../admin/models/Survey";
import {AjaxHelper} from "../../admin/contracts/AjaxHelper";
import {axios} from "../../common/axios";
import {Page} from "../../admin/models/Page";
import {BlockWrapper} from "../../admin/models/BlockWrapper";
import {ComponentsFactory} from "../../admin/services/ComponentsFactory";
import {GetSurvey} from "./requests/GetSurvey";

export class SurveyApi
{
	/**
	 * @@TODO-06.12.2019-Чучманский Aндрей
	 *
	 * @param request
	 */
	public static getSurvey(request: GetSurvey): Promise<Survey>
	{
		return axios.get('/api/survey/get/' + request.surveyId + '?token=' + request.token)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;
				let survey = new Survey();
				survey.id = result.data.id;
				survey.title = result.data.title;
				survey.ownerId = result.data.public;
				survey.createdAt = result.data.createdAt;
				survey.updatedAt = result.data.updatedAt;

				result.data.pages.forEach((pageData: any) => {
					let page = new Page();
					page.id = pageData.id;
					page.step = pageData.step;
					page.createdAt = pageData.createdAt;
					page.updatedAt = pageData.updatedAt;
					survey.pages[page.getId()] = page;

					pageData.blocks.forEach((wrapper: any) => {
						let blockData: BlockWrapper = wrapper as BlockWrapper;
						let block = ComponentsFactory.createElementFromData(blockData.type, blockData.data);
						page.blocks[block.getId()] = block;
					});
				});

				return survey;
			});
	}
}