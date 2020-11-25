import {SurveysList} from "./components/SurveysList";
import {SurveyEdit} from "./components/SurveyEdit";
import {TemplatesList} from "./components/TemplatesList";
import {UserSettings} from "./components/UserSettings";
import {StatisticsReport} from "./components/StatisticsReport";
import {StatisticsSample} from "./components/StatisticsSample";
import {SurveyDatasetEdit} from "./components/SurveyDatasetEdit";

export const routes = [
	{path: '/admin', component: SurveysList, name: 'main-page'},
	{path: '/admin/templates', component: TemplatesList, name: 'templates-list'},
	{path: '/admin/survey/:surveyId/edit', component: SurveyEdit, name: 'survey', props: true},
	{path: '/admin/settings', component: UserSettings, name: 'settings'},
	{path: '/admin/statistics/:surveyId', component: StatisticsReport, name: 'survey-statistics', props: true},
	{path: '/admin/statistics/:surveyId/sample/:sampleId', component: StatisticsSample, name: 'statistics-sample', props: true},
	{path: '/admin/survey/:surveyId/dataset', component: SurveyDatasetEdit, name: 'survey-dataset', props: true}
];