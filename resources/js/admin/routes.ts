import {SurveysList} from "./components/SurveysList";
import {SurveyEdit} from "./components/SurveyEdit";
import {TemplatesList} from "./components/TemplatesList";
import {UserSettings} from "./components/UserSettings";

export const routes = [
	{path: '/admin', component: SurveysList, name: 'main-page'},
	{path: '/admin/templates', component: TemplatesList, name: 'templates-list'},
	{path: '/admin/survey/:surveyId/edit', component: SurveyEdit, name: 'survey', props: true},
	{path: '/admin/settings', component: UserSettings, name: 'settings'},
];