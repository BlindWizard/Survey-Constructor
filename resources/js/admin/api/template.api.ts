import {axios} from "../../common/axios";
import {Template} from "../models/Template";
import {AjaxHelper} from "../contracts/AjaxHelper";

export class TemplateApi
{
	/**
	 * @swagger
	 * /admin/template/getAll:
	 *   get:
	 *     tags:
	 *       - Admin
	 *     description: Returns the list of available for current user templates. It may be system templates like "Blank", "Simple Voting"m, etc... or created by user ones.
	 *     responses:
	 *       200:
	 *         description: Array of Template objects.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: ./resources/js/admin/schema/template.yml
	 */
	public static getAll(): Promise<Template[]>
	{
		return axios.get('/admin/template/getAll')
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;
				let templates:Template[] = [];
				result.data.forEach((data:Template) => {
					let template:Template = new Template();
					template.id = data.id;
					template.title = data.title;
					template.public = data.public;
					template.createdAt = data.createdAt;
					template.updatedAt = data.updatedAt;

					templates.push(template);
				});

				return templates;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
}