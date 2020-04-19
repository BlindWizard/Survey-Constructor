import {RunSettings} from "./models/RunSettings";

class Loader {
	public runSurvey(settings: RunSettings)
	{
		let container: HTMLElement|null;
		if (typeof settings.element === 'string') {
			container  = document.getElementById(settings.element);
		}
		else if (null !== settings.element) {
			container = settings.element;
		}
		else {
			container = document.getElementById(settings.defaultContainer);
		}

		if (!settings.surveyId) {
			throw new Error('Survey is undefined: surveyId isn\'t set');
		}

		if (null === container) {
			throw new Error('Container is undefined: element not found');
		}

		import('./app').then(loaded => {
			if (container) {
				let app = loaded.client;
				app.$mount();
				container.appendChild(app.$el);
			}
		});
	}
}

const SurveyBoxLoader = new Loader();
window['SurveyBoxLoader'] = SurveyBoxLoader;

export {SurveyBoxLoader};