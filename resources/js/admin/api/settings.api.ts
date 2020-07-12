import {axios} from "../../common/axios";
import {AjaxHelper} from "../contracts/AjaxHelper";
import {ApiToken} from "../models/ApiToken";
import {CreateToken} from "./requests/CreateToken";
import {DeleteToken} from "./requests/DeleteToken";

export class SettingsApi {
	public static getTokens(): Promise<ApiToken[]>
	{
		return axios.get('/admin/settings/getAvailableTokens')
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let tokens: ApiToken[] = [];
				result.data.forEach((tokenData: any) => {
					let token = new ApiToken();
					token.id = tokenData.id;
					token.name = tokenData.name;
					token.token = tokenData.value;

					tokens.push(token);
				});

				return tokens;
			});
	}

	public static addToken(request: CreateToken): Promise<ApiToken>
	{
		return axios.post('/admin/settings/addToken', request)
			.then((response) => {
				let result:AjaxHelper = response.data as AjaxHelper;

				let token = new ApiToken();
				token.id = result.data.id;
				token.name = result.data.name;
				token.token = result.data.value;

				return token;
			});
	}

	public static deleteToken(request: DeleteToken): void
	{
		axios.post('/admin/settings/deleteToken', request);
	}
}