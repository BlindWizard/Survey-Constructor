class Loader {
	public init(element: HTMLElement|string)
	{
		if (typeof element === 'string') {
			element = document.getElementById(element) as HTMLElement;
		}

		import('./app').then((client) => {
			console.log(element, client);
		});
	}
}

const SurveyBoxLoader = new Loader();
window['SurveyBoxLoader'] = SurveyBoxLoader;

export {SurveyBoxLoader};