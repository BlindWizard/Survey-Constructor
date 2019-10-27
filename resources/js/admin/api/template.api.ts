import {axios} from "../../common/axios";
import {Template} from "../models/Template";

export class TemplateApi {
	public static getAll()
	{
		axios.post('/admin/template/getAll')
			.then((response) => {
				return response.data as Template;
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}
}