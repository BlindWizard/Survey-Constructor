import Vue from "vue";
import Vuex from 'vuex';
import {actions, getters, mutations} from "./types";
import {Settings} from "../settings";
import {TemplateApi} from "../api/template.api";
import {Template} from "../models/Template";
import {SurveyApi} from "../api/survey.api";
import {CreateSurvey} from "../api/requests/createSurvey";
import {Survey} from "../models/Survey";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: null,
		appName: null,
		templates: null,
		survey: null,
	},
	mutations: {
		[mutations.SET_CSRF](state, token) {
			state.csrf = token;
		},
		[mutations.SET_APPNAME](state, name) {
			state.appName = name;
		},
		[mutations.SET_TEMPLATES](state, templates) {
			state.templates = templates;
		},
		[mutations.SET_ACTIVE_SURVEY](state, survey) {
			state.survey = survey;
		}
	},
	actions: {
		[actions.LOAD_SETTINGS]({commit}, setting: Settings) {
			commit(mutations.SET_CSRF, setting.csrf);
			commit(mutations.SET_APPNAME, setting.appName);
		},
		async [actions.SHOW_TEMPLATES]({commit}) {
			commit(mutations.SET_TEMPLATES, await TemplateApi.getAll());
		},
		async [actions.CREATE_SURVEY]({commit}, request: CreateSurvey) {
			let id = await SurveyApi.createSurvey(request);
			if (!id) {
				throw new Error('Error during creating survey');
			}

			return id;
		},
		async [actions.GET_SURVEY]({commit}, id: string) {
			commit(mutations.SET_ACTIVE_SURVEY, await SurveyApi.getSurvey(id));
		}
	},
	getters: {
		[getters.CSRF](state) {
			return state.csrf;
		},
		[getters.APPNAME](state) {
			return state.appName;
		},
		[getters.TEMPLATES](state) {
			return state.templates;
		},
		[getters.SURVEY](state) {
			return state.survey;
		},
	}
});

export {store};