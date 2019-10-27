import {axios} from "../../common/axios";
import {Survey} from "../models/Survey";

export class SurveyApi {
	public static createSurvey()
	{
		axios.post('/admin/survey/createBlank')
			.then((response) => {
				return response.data as Survey;
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	}
}