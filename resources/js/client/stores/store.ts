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
		},
		[mutations.SET_PAGE](state, page: PageContract) {
			state.pageId = page.getId();
		}
	},
	actions: {
		async [actions.LOAD_SURVEY]({commit}, request: GetSurvey) {
			let survey = await SurveyApi.getSurvey(request);
			commit(mutations.SET_SURVEY, survey);
		},
		async [actions.NEXT_PAGE]({commit, state}) {
			let pages = state.survey.getPagesByStep();
			var currentPage = state.survey.getPages()[state.pageId];
			let setStep = currentPage.getStep() + 1;
			if (!(setStep in pages)) {
				return;
			}

			commit(mutations.SET_PAGE, pages[setStep]);
		},
		async [actions.PREV_PAGE]({commit, state}) {
			let pages = state.survey.getPagesByStep();
			var currentPage = state.survey.getPages()[state.pageId];
			let setStep = currentPage.getStep() - 1;
			if (!(setStep in pages)) {
				return;
			}

			commit(mutations.SET_PAGE, pages[setStep]);
		},
	},
	getters: {
		[getters.CURRENT_PAGE](state): PageContract|null {
			if (null === state.survey) {
				return null;
			}

			return state.survey.getPages()[state.pageId];
		},
		[getters.IS_LAST_PAGE](state): Function {
			return (pageId: string): boolean => {
				let pages = state.survey.getPagesByStep();
				return pageId === pages[pages.length - 1].getId();
			}
		},
		[getters.IS_FIRST_PAGE](state): Function {
			return (pageId: string): boolean => {
				let pages = state.survey.getPagesByStep();
				return pageId === pages[0].getId();
			}
		},
	}
});

export {store};