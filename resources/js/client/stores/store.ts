import Vue from "vue";
import Vuex from 'vuex';
import {PageContract} from "../../admin/contracts/PageContract";
import {actions, getters, mutations} from "./types";
import {SurveyApi} from "../api/survey.api";
import {SurveyContract} from "../../admin/contracts/SurveyContract";
import {EventsApi} from "../api/events.api";
import {NextPageRequest} from "../api/requests/NextPageRequest";
import Cookies from 'js-cookie';
import {PrevPageRequest} from "../api/requests/PrevPageRequest";
import {OptionSelectRequest} from "../api/requests/OptionSelectRequest";
import {OptionsListSelectRequest} from "../api/requests/OptionsListSelectRequest";
import {RunRequest} from "../api/requests/RunRequest";
import {RunSettings} from "../models/RunSettings";
import {GetSurvey} from "../api/requests/GetSurvey";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		surveyId: null as any,
		clientId: null as any,
		token: null as any,
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
		},
		[mutations.SET_SURVEY_ID](state, surveyId: string) {
			state.surveyId = surveyId;
		},
		[mutations.SET_CLIENT_ID](state, clientId: string) {
			state.clientId = clientId;
		},
		[mutations.SET_TOKEN](state, token: string) {
			state.token = token;
		}
	},
	actions: {
		async [actions.LOAD_SETTINGS]({commit}, settings: RunSettings) {
			commit(mutations.SET_CLIENT_ID, (Cookies.get('clientId')));
			commit(mutations.SET_TOKEN, settings.token);
			commit(mutations.SET_SURVEY_ID, settings.surveyId);
		},
		async [actions.LOAD_SURVEY]({commit, state}) {
			let getSurvey = new GetSurvey();
			getSurvey.surveyId = state.surveyId;
			getSurvey.token = state.token;

			let survey = await SurveyApi.getSurvey(getSurvey);
			commit(mutations.SET_SURVEY, survey);

			let runRequest = new RunRequest();
			runRequest.surveyId = survey.getId();
			runRequest.clientId = state.clientId;
			runRequest.token = state.token;

			await EventsApi.run(runRequest);
		},
		async [actions.NEXT_PAGE]({commit, state}) {
			let pages = state.survey.getPagesByStep();
			var currentPage = state.survey.getPages()[state.pageId];
			let setStep = currentPage.getStep() + 1;
			if (!(setStep in pages)) {
				return;
			}

			let newPage = pages[setStep];
			let nextPageRequest = new NextPageRequest();
			nextPageRequest.clientId = state.clientId;
			nextPageRequest.surveyId = state.survey.getId();
			nextPageRequest.pageId = newPage.getId();
			nextPageRequest.token = state.token;
			await EventsApi.nextPage(nextPageRequest);

			commit(mutations.SET_PAGE, newPage);
		},
		async [actions.PREV_PAGE]({commit, state}) {
			let pages = state.survey.getPagesByStep();
			var currentPage = state.survey.getPages()[state.pageId];
			let setStep = currentPage.getStep() - 1;
			if (!(setStep in pages)) {
				return;
			}

			let newPage = pages[setStep];
			let prevPageRequest = new PrevPageRequest();
			prevPageRequest.clientId = state.clientId;
			prevPageRequest.surveyId = state.survey.getId();
			prevPageRequest.pageId = newPage.getId();
			prevPageRequest.token = state.token;
			await EventsApi.prevPage(prevPageRequest);

			commit(mutations.SET_PAGE, newPage);
		},
		async [actions.OPTIONS_LIST_SELECT]({commit, state}, data: any) {
			let request = new OptionsListSelectRequest();
			request.clientId = state.clientId;
			request.surveyId = state.survey.getId();
			request.blockId = data.blockId;
			request.optionId = data.optionId;
			request.checked = data.checked as boolean;
			request.token = state.token;

			await EventsApi.optionsListSelect(request);
		},
		async [actions.OPTION_SELECT]({commit, state}, data: any) {
			let request = new OptionSelectRequest();
			request.clientId = state.clientId;
			request.surveyId = state.survey.getId();
			request.blockId = data.blockId;
			request.checked = data.checked as boolean;
			request.token = state.token;

			await EventsApi.optionSelect(request);
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
		}
	}
});

export {store};