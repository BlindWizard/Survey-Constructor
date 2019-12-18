import Vue from "vue";
import Vuex from 'vuex';
import {actions, getters, mutations} from "./types";
import {Settings} from "../settings";
import {TemplateApi} from "../api/template.api";
import {SurveyApi} from "../api/survey.api";
import {CreateSurvey} from "../api/requests/CreateSurvey";
import {GetSurvey} from "../api/requests/GetSurvey";
import {AddElement} from "../api/requests/AddElement";
import {Locale} from "../models/Locale";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: null,
		locale: new Locale(),
		surveys: null,
		templates: null,
		survey: null,
	},
	mutations: {
		[mutations.SET_CSRF](state, token) {
			state.csrf = token;
		},
		[mutations.SET_LOCALE](state, locale: Locale) {
			state.locale = locale;
		},
		[mutations.SET_SURVEYS](state, surveys) {
			state.surveys = surveys;
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
			commit(mutations.SET_LOCALE, setting.locale);
		},
		async [actions.LOAD_SURVEYS]({commit}) {
			commit(mutations.SET_SURVEYS, await SurveyApi.getAll());
		},
		async [actions.LOAD_TEMPLATES]({commit}) {
			commit(mutations.SET_TEMPLATES, await TemplateApi.getAll());
		},
		async [actions.CREATE_SURVEY]({commit}, request: CreateSurvey) {
			let id = await SurveyApi.createSurvey(request);
			if (!id) {
				throw new Error('Error during creating survey');
			}

			return id;
		},
		async [actions.LOAD_SURVEY]({commit}, request: GetSurvey) {
			commit(mutations.SET_ACTIVE_SURVEY, await SurveyApi.getSurvey(request));
		},
		async [actions.ADD_ELEMENT]({commit}, request: AddElement) {
			await SurveyApi.addElement(request);
		},
		async [actions.REORDER_ELEMENT]({commit}) {
			console.log('reorder');
		}
	},
	getters: {
		[getters.CSRF](state) {
			return state.csrf;
		},
		[getters.LOCALE](state): Locale {
			return state.locale;
		},
		[getters.SURVEYS](state) {
			return state.surveys;
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