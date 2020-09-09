import {axios} from "../../common/axios";
import {NextPageRequest} from "./requests/NextPageRequest";
import {PrevPageRequest} from "./requests/PrevPageRequest";
import {OptionsListSelectRequest} from "./requests/OptionsListSelectRequest";
import {OptionSelectRequest} from "./requests/OptionSelectRequest";
import {RunRequest} from "./requests/RunRequest";
import {EnterTextRequest} from "./requests/EnterTextRequest";
import {PageSelectRequest} from "./requests/PageSelectRequest";

export class EventsApi {
	public static run(request: RunRequest)
	{
		return axios.post('/api/event/run', request);
	}

	public static nextPage(request: NextPageRequest)
	{
		return axios.post('/api/event/nextPage', request);
	}

	public static prevPage(request: PrevPageRequest)
	{
		return axios.post('/api/event/prevPage', request);
	}

	public static optionsListSelect(request: OptionsListSelectRequest)
	{
		return axios.post('/api/event/optionsListSelect', request);
	}

	public static optionSelect(request: OptionSelectRequest)
	{
		return axios.post('/api/event/optionSelect', request);
	}

	public static enterText(request: EnterTextRequest)
	{
		return axios.post('/api/event/enterText', request)
	}

	public static setPage(request: PageSelectRequest)
	{
		return axios.post('/api/event/setPage', request)
	}
}