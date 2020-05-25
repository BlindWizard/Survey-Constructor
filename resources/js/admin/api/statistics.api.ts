import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {ApiToken} from "../models/ApiToken";
import {GetSurveyStatistics} from "./requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {BlockStatistics} from "../models/BlockStatistics";

export class StatisticsApi {
	public static getSurveyStatistics(request: GetSurveyStatistics): Promise<BlocksStatistics[]>
	{
		return axios.get('/admin/survey/statistics/' + request.surveyId)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let data: BlocksStatistics[] = [];
				result.data.forEach((tokenData: any) => {
					let blocksStatistics = new BlocksStatistics();
					blocksStatistics.tokenId = tokenData.tokenId;
					blocksStatistics.tokenLabel = tokenData.tokenLabel;

					tokenData.blocks.forEach((blockData: any) => {
						let blockStatistics = new BlockStatistics();
						blockStatistics.blockId = blockData.blockId;
						blockStatistics.blockLabel = blockData.blockLabel;
						blockStatistics.valueLabel = blockData.valueLabel;
						blockStatistics.type = blockData.type;
						blockStatistics.count = blockData.count;

						blocksStatistics.blockStatistics.push(blockStatistics);
					});

					data.push(blocksStatistics);
				})

				return data;
			});
	}
}