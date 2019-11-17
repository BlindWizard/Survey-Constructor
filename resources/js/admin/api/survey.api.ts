import {axios} from "../../common/axios";
import {CreateSurvey} from "./requests/CreateSurvey";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {Survey} from "../models/Survey";
import {GetSurvey} from "./requests/GetSurvey";

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
			})
			.catch((error) => {
				throw new Error(error);
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
	public static createSurvey(request: CreateSurvey)
	{
		return axios.post('/admin/survey/create', request)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				return result.data;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}

	public static getSurvey(request: GetSurvey)
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

				return survey;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
}