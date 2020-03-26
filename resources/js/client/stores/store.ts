import Vue from "vue";
import Vuex from 'vuex';
import {PageContract} from "../../admin/contracts/PageContract";
import {actions, getters, mutations} from "./types";
import {GetSurvey} from "../../admin/api/requests/GetSurvey";
import {SurveyApi} from "../api/survey.api";
import {SurveyContract} from "../../admin/contracts/SurveyContract";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		survey: null as any,
		pageId: null as any,
	},
	mutations: {
		[mutations.SET_SURVEY](state, survey: SurveyContract) {
			state.survey = survey;
			let pages = survey.getPagesByStep();
			state.pageId = pages[0].getId();
		}
	},
	actions: {
		async [actions.LOAD_SURVEY]({commit}, request: GetSurvey) {
			let survey = await SurveyApi.getSurvey(request);
			commit(mutations.SET_SURVEY, survey);
		}
	},
	getters: {
		[getters.CURRENT_PAGE](state): PageContract|null {
			if (null === state.survey) {
				return null;
			}

			return state.survey.pages[state.pageId];
		},
	}
});

export {store};