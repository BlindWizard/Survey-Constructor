import {axios} from "../../common/axios";
import {NextPageRequest} from "./requests/NextPageRequest";

export class EventsApi {
	public static nextPage(request: NextPageRequest)
	{
		return axios.post('/api/event', request);
	}
}