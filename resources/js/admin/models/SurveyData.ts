import {VariableData} from "./VariableData";

export class SurveyData {
	public id: string;
	public type: string;
	public data: VariableData[]|null = null;
}