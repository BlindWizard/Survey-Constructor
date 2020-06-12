import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {BlockContract} from "../contracts/BlockContract";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {CreateElement} from "./requests/CreateElement";
import {ReorderElement} from "./requests/ReorderElement";
import {SaveBlockData} from "./requests/SaveBlockData";

export class BlockApi
{
	/**
	 * @TODO-09.12.2019-Чучманский Aндрей
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
	 * @TODO-24.12.2019-Чучманский Aндрей
	 *
	 * @param request
	 */
	public static reoderElement(request: ReorderElement)
	{
		return axios.post('/admin/block/reorderElement', request);
	}

	/**
	 * @TODO-19.12.2019-Чучманский Aндрей
	 *
	 * @param request
	 */
	public static saveData(request: SaveBlockData): Promise<any>
	{
		return axios.post('/admin/block/saveData', request);
	}

	/**
	 * @TODO-19.12.2019-Чучманский Aндрей
	 *
	 * @param blockId
	 */
	public static deleteElement(blockId: string): Promise<any>
	{
		return axios.post('/admin/block/deleteElement', {blockId});
	}
}