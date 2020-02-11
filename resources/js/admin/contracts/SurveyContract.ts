import {PageContract} from "./PageContract";

export interface SurveyContract {
	getPages(): any;
	getPagesByStep(): PageContract[]
}