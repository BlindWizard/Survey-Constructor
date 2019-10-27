import {SurveysList} from "./components/SurveysList";
import {SurveyEdit} from "./components/SurveyEdit";

export const routes = [
	{path: '/admin', component: SurveysList, name: 'main-page'},
	{path: '/admin/new', component: SurveyEdit, name: 'edit-survey'},
];