import Vue from "vue";
import Vuex from 'vuex';
import {actions, getters, mutations} from "./types";
import {Settings} from "../settings";
import {TemplateApi} from "../api/template.api";
import {Template} from "../models/Template";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: null,
		appName: null,
		templates: null,
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
		}
	},
	actions: {
		[actions.LOAD_SETTINGS]({commit}, setting: Settings) {
			commit(mutations.SET_CSRF, setting.csrf);
			commit(mutations.SET_APPNAME, setting.appName);
		},
		async [actions.SHOW_TEMPLATES]({commit}) {
			commit(mutations.SET_TEMPLATES, await TemplateApi.getAll());
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
	}
});

export {store};