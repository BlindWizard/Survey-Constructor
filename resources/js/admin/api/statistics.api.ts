import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {GetSurveyStatistics} from "./requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {BlockStatistics} from "../models/BlockStatistics";
import {OptionStatistics} from "../models/OptionStatistics";
import {GetStatisticsSample} from "./requests/GetStatisticsSample";
import {StatisticsSample} from "../components/StatisticsSample";
import {StatisticAction} from "../models/StatisticAction";

export class StatisticsApi {
	public static getSurveyStatistics(request: GetSurveyStatistics): Promise<BlocksStatistics[]>
	{
		return axios.get('/admin/survey/statistics/' + request.surveyId)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let data: BlocksStatistics[] = [];
				result.data.forEach((tokenData: any) => {
					let blocksStatistics = new BlocksStatistics();
					blocksStatistics.surveyId = tokenData.surveyId;
					blocksStatistics.surveyName = tokenData.surveyName
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
							optionStatistics.samples = optionData.samples;

							blockStatistics.options.push(optionStatistics);
						});

						blocksStatistics.blockStatistics.push(blockStatistics);
					});

					data.push(blocksStatistics);
				})

				return data;
			});
	}

	public static getStatisticsSample(request: GetStatisticsSample): Promise<StatisticAction[]>
	{
		return axios.get('/admin/survey/statistics/' + request.surveyId + '/sample/' + request.sampleId)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let actions: StatisticAction[] = [];
				result.data.forEach((actionData: any) => {
					let action = new StatisticAction();
					action.actionLabel = actionData.actionLabel;
					action.blockLabel = actionData.blockLabel;
					action.timestamp = actionData.timestamp;

					actions.push(action);
				});

				return actions;
		});
	}
}