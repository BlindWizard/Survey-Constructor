import Vue from "vue";
import Vuex from 'vuex';
import {actions, getters, mutations} from "./types";
import {Settings} from "../settings";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: null,
		appName: null,
	},
	mutations: {
		[mutations.SET_CSRF](state, token) {
			state.csrf = token;
		},
		[mutations.SET_APPNAME](state, name) {
			state.appName = name;
		}
	},
	actions: {
		[actions.LOAD_SETTINGS]({commit}, setting: Settings) {
			commit(mutations.SET_CSRF, setting.csrf);
			commit(mutations.SET_APPNAME, setting.appName);
		}
	},
	getters: {
		[getters.CSRF](state) {
			return state.csrf;
		},
		[getters.APPNAME](state) {
			return state.appName;
		}
	}
});

export {store};