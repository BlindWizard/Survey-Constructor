import {PageContract} from "./PageContract";

export interface SurveyContract {
	getId(): string;
	getPages(): any;
	getPagesByStep(): PageContract[]
}