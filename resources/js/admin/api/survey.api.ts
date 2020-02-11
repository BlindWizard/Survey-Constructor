import {axios} from "../../common/axios";
import {CreateSurvey} from "./requests/CreateSurvey";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {Survey} from "../models/Survey";
import {GetSurvey} from "./requests/GetSurvey";
import {BlockContract} from "../contracts/BlockContract";
import {BlockWrapper} from "../models/BlockWrapper";
import {BlockTypes} from "../contracts/BlockTypes";
import {OptionsList} from "../models/OptionsList";
import {Option} from "../models/Option";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {PageContract} from "../contracts/PageContract";
import {Page} from "../models/Page";

export class SurveyApi
{
	/**
	 * @swagger
	 * /admin/survey/getAll:
	 *   get:
	 *     tags:
	 *       - Admin
	 *     description: Returns the list of user's surveys.
	 *     responses:
	 *       200:
	 *         description: Array of Survey objects.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: ./resources/js/admin/schema/survey.yml
	 */
	public static getAll(): Promise<Survey[]>
	{
		return axios.get('/admin/survey/getAll')
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;
				let surveys:Survey[] = [];
				result.data.forEach((data:Survey) => {
					let survey:Survey = new Survey();
					survey.id = data.id;
					survey.title = data.title;
					survey.ownerId = data.ownerId;
					survey.createdAt = data.createdAt;
					survey.updatedAt = data.updatedAt;

					surveys.push(survey);
				});

				return surveys;
			});
	}

	/**
	 * @swagger
	 * /admin/survey/create:
	 *   get:
	 *     tags:
	 *       - Admin
	 *     description: Returns id of created survey.
	 *     responses:
	 *       200:
	 *         description: Survey id.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: string
	 *               format: uuid
	 *               example: 123e4567-e89b-12d3-a456-426655440000
	 */
	public static createSurvey(request: CreateSurvey): Promise<string>
	{
		return axios.post('/admin/survey/create', request)
			.then((response) => {
				let result: AjaxHelper = response.data as AjaxHelper;

				return result.data as string;
			});
	}

	/**
	 * @@TODO-06.12.2019-Чучманский Aндрей
	 *
	 * @param request
	 */
	public static getSurvey(request: GetSurvey): Promise<Survey>
	{
		return axios.get('/admin/survey/get/' + request.surveyId)
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