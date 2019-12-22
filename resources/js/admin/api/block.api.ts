import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {BlockContract} from "../contracts/BlockContract";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {CreateElement} from "./requests/CreateElement";

export class BlockApi
{
	/**
	 * @@TODO-09.12.2019-Чучманский Aндрей
	 *
	 * @param request
	 */
	public static createElement(request: CreateElement): Promise<BlockContract>
	{
		return axios.post('/admin/block/createElement', request)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				return ComponentsFactory.createElementFromData(result.data.type, result.data.data);
			});
	}

	/**
	 * @TODO-19.12.2019-Чучманский Aндрей
	 */
	public static saveData(request: CreateElement): Promise<any>
	{
		return axios.post('/admin/block/saveData', request);
	}
}