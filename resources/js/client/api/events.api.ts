import {axios} from "../../common/axios";
import {NextPageRequest} from "./requests/NextPageRequest";
import {PrevPageRequest} from "./requests/PrevPageRequest";
import {OptionsListSelectRequest} from "./requests/OptionsListSelectRequest";
import {OptionSelectRequest} from "./requests/OptionSelectRequest";

export class EventsApi {
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
}