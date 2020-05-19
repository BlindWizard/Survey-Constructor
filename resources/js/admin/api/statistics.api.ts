import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {ApiToken} from "../models/ApiToken";
import {GetSurveyStatistics} from "./requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";

export class StatisticsApi {
	public static getSurveyStatistics(request: GetSurveyStatistics): Promise<BlocksStatistics>
	{
		return axios.get('/admin/survey/statistics/' + request.surveyId)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let data = new BlocksStatistics();

				return data;
			});
	}
}