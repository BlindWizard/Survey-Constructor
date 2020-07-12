export class GetSurveyStatistics {
	public surveyId: string;
	public dateFrom: string|null = null;
	public dateTo: string|null = null;
	public options: Object = {};
}