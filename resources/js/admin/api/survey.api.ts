import {axios} from "../../common/axios";
import {CreateSurvey} from "./requests/createSurvey";
import {AjaxHelper} from "../contracts/AjaxHelper";

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
	 *
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
}