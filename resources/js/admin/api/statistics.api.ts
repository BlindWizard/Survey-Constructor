import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {ApiToken} from "../models/ApiToken";
import {GetSurveyStatistics} from "./requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {BlockStatistics} from "../models/BlockStatistics";
import {OptionStatistics} from "../models/OptionStatistics";

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
						blockStatistics.type = blockData.type;

						blockData.options.forEach((optionData: any) => {
							let optionStatistics = new OptionStatistics();
							optionStatistics.optionId = optionData.optionId;
							optionStatistics.label = optionData.label;
							optionStatistics.count = optionData.count;

							blockStatistics.options.push(optionStatistics);
						});

						blocksStatistics.blockStatistics.push(blockStatistics);
					});

					data.push(blocksStatistics);
				})

				return data;
			});
	}
}