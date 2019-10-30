import {axios} from "../../common/axios";
import {Template} from "../models/Template";
import {AjaxHelper} from "../contracts/AjaxHelper";

export class TemplateApi
{
	/**
	 * @swagger
	 * /admin/template/getAll:
	 *   get:
	 *      description: Returns the list of available templates
	 *      responses:
	 *          200:
	 *              description: templates
	 *              schema:
	 *   type: array
	 *   items:
	 *      $ref: '#/resources/js/admin/models/Template'
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
					template.created_at = data.created_at;
					template.updated_at = data.updated_at;

					templates.push(template);
				});

				return templates;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
}