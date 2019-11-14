import {axios} from "../../common/axios";
import {CreateSurvey} from "./requests/createSurvey";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {Survey} from "../models/Survey";

export class SurveyApi
{
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

	public static getSurvey(id: string)
	{
		return axios.get('/admin/survey/get/' + id)
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