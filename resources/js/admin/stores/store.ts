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
import {BlockTypes} from "../contracts/BlockTypes";
import {Survey} from "../models/Survey";
import {Template} from "../models/Template";
import {BlockContract} from "../contracts/BlockContract";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {dragDropService} from "../services/DragDropService";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: '',
		locale: new Locale(),
		defaultBlockData: [],
		survey: new Survey(),
		surveys: null,
		templates: null,
	},
	mutations: {
		[mutations.SET_CSRF](state, token) {
			state.csrf = token;
		},
		[mutations.SET_LOCALE](state, locale: Locale) {
			state.locale = locale;
		},
		[mutations.SET_DEFAULT_BLOCK_DATA](state, data) {
			state.defaultBlockData = data;
		},
		[mutations.SET_SURVEYS](state, surveys) {
			state.surveys = surveys;
		},
		[mutations.SET_TEMPLATES](state, templates) {
			state.templates = templates;
		},
		[mutations.SET_ACTIVE_SURVEY](state, survey) {
			state.survey = survey;
		},
		[mutations.ADD_ELEMENT](state, block: BlockContract) {
			let blocks: BlockContract[] = (state.survey as Survey).blocks;
			blocks.splice(block.getPosition(), 0, block);
			Vue.set(state.survey, 'blocks', blocks);
		}
	},
	actions: {
		[actions.LOAD_SETTINGS]({commit}, setting: Settings) {
			commit(mutations.SET_CSRF, setting.csrf);
			commit(mutations.SET_LOCALE, setting.locale);
			commit(mutations.SET_DEFAULT_BLOCK_DATA, setting.defaultBlockData);
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
		async [actions.ADD_ELEMENT]({commit, state}, request: AddElement) {
			let block: BlockContract = ComponentsFactory.getDefaultData(request.type);
			block.setPosition(request.position || 0);

			commit(mutations.ADD_ELEMENT, block);
			//await SurveyApi.addElement(request);
		},
		async [actions.REORDER_ELEMENT]({commit}) {
			console.log('reorder');
		}
	},
	getters: {
		[getters.CSRF](state): string {
			return state.csrf;
		},
		[getters.LOCALE](state): Locale {
			return state.locale;
		},
		[getters.SURVEYS](state): Survey[]|null {
			return state.surveys;
		},
		[getters.TEMPLATES](state): Template[]|null {
			return state.templates;
		},
		[getters.SURVEY](state): Survey|null {
			return state.survey;
		},
		[getters.ELEMENT_DEFAULT_DATA](state): Function {
			return (type: string): BlockContract => {
				if (!(<any>Object).values(BlockTypes).includes(type)) {
					throw new Error('Undefined block type');
				}

				return state.defaultBlockData[type] as BlockContract;
			};
		},
	}
});

export {store};