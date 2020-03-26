class Loader {
	public runSurvey(element: HTMLElement|string)
	{
		let container: HTMLElement;
		if (typeof element === 'string') {
			container  = document.getElementById(element) as HTMLElement;
		}
		else {
			container = element;
		}

		import('./app').then(loaded => {
			let app = loaded.client;
			app.$mount();
			container.appendChild(app.$el);
		});
	}
}

const SurveyBoxLoader = new Loader();
window['SurveyBoxLoader'] = SurveyBoxLoader;

export {SurveyBoxLoader};