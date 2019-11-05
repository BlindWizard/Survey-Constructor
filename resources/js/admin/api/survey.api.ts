import {axios} from "../../common/axios";
import {Survey} from "../models/Survey";
import {Template} from "../models/Template";

export class SurveyApi
{
	public static createSurvey(template: Template)
	{
		axios.post('/admin/survey/create', template)
			.then((response) => {
				return response.data as Survey;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
}