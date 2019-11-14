import {SurveysList} from "./components/SurveysList";
import {SurveyEdit} from "./components/SurveyEdit";
import {TemplatesList} from "./components/TemplatesList";

export const routes = [
	{path: '/admin', component: SurveysList, name: 'main-page'},
	{path: '/admin/templates', component: TemplatesList, name: 'templates-list'},
	{path: '/admin/survey/:surveyId/edit', component: SurveyEdit, name: 'survey-edit', props: true},
];