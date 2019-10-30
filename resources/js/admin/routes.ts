import {SurveysList} from "./components/SurveysList";
import {SurveyEdit} from "./components/SurveyEdit";
import {TemplatesList} from "./components/TemplatesList";

export const routes = [
	{path: '/admin', component: SurveysList, name: 'main-page'},
	{path: '/admin/templates', component: TemplatesList, name: 'templates-page'},
	{path: '/admin/new', component: SurveyEdit, name: 'edit-survey'},
];