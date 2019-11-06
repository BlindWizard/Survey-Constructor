import {axios} from "../../common/axios";
import {Survey} from "../models/Survey";
import {CreateSurvey} from "./requests/createSurvey";

export class SurveyApi
{
	public static createSurvey(request: CreateSurvey)
	{
		axios.post('/admin/survey/create', request)
			.then((response) => {
				return response.data as Survey;
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
}