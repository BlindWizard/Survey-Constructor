import {axios} from "../../common/axios";
import {SaveBlockData} from "./requests/SaveBlockData";

export class BlockApi
{
	/**
	 * @TODO-19.12.2019-Чучманский Aндрей
	 */
	public static saveData(request: SaveBlockData): Promise<any>
	{
		return axios.post('/admin/block/saveData', request)
			.then((response) => {
			});
	}
}