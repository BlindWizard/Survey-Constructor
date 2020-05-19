import {SurveysList} from "./components/SurveysList";
import {SurveyEdit} from "./components/SurveyEdit";
import {TemplatesList} from "./components/TemplatesList";
import {UserSettings} from "./components/UserSettings";
import {StatisticsReport} from "./components/StatisticsReport";

export const routes = [
	{path: '/admin', component: SurveysList, name: 'main-page'},
	{path: '/admin/templates', component: TemplatesList, name: 'templates-list'},
	{path: '/admin/survey/:surveyId/edit', component: SurveyEdit, name: 'survey', props: true},
	{path: '/admin/settings', component: UserSettings, name: 'settings'},
	{path: '/admin/statistics/:surveyId', component: StatisticsReport, name: 'survey-statistics'},
];