export class RunSettings {
	public readonly defaultContainer = 'survey-box';
	public element: HTMLElement|string|null = null;
	public surveyId: string;
	public token: string;
}