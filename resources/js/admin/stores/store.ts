import Vue from "vue";
import Vuex from 'vuex';
import {actions, getters, mutations} from "./types";
import {Settings} from "../settings";
import {TemplateApi} from "../api/template.api";
import {SurveyApi} from "../api/survey.api";
import {CreateSurvey} from "../api/requests/CreateSurvey";
import {GetSurvey} from "../api/requests/GetSurvey";
import {CreateElement} from "../api/requests/CreateElement";
import {Locale} from "../models/Locale";
import {BlockTypes} from "../contracts/BlockTypes";
import {Survey} from "../models/Survey";
import {Template} from "../models/Template";
import {BlockContract} from "../contracts/BlockContract";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {BlockApi} from "../api/block.api";
import {ReorderElement} from "../api/requests/ReorderElement";
import {SaveBlockData} from "../api/requests/SaveBlockData";
import {PageApi} from "../api/page.api";
import {PageContract} from "../contracts/PageContract";
import {ApiToken} from "../models/ApiToken";
import {SettingsApi} from "../api/settings.api";
import {CreateToken} from "../api/requests/CreateToken";
import {DeleteToken} from "../api/requests/DeleteToken";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";
import {StatisticsApi} from "../api/statistics.api";
import {StatisticsReport} from "../components/StatisticsReport";
import {SurveyStatistics} from "../models/SurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";
import {StatisticAction} from "../models/StatisticAction";
import {Container} from "../models/Container";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: '',
		token: null as string|null,
		locale: null as any,
		section: null as string|null,
		editing: false as boolean,
		defaultBlockData: [],
		survey: null as any,
		pageId: null as any,
		surveys: null as any,
		templates: null as any,
		tokens: null as any,
		statistics: null as any,
		sample: null as any,
	},
	mutations: {
		[mutations.SET_CSRF](state, token) {
			state.csrf = token;
		},
		[mutations.SET_LOCALE](state, locale: Locale) {
			state.locale = locale;
		},
		[mutations.SET_TOKEN](state, token: string|null) {
			state.token = token;
		},
		[mutations.SET_SECTION](state, section: string|null) {
			state.section = section;
		},
		[mutations.SET_EDITING](state, editing: boolean) {
			state.editing = editing;
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
		[mutations.SET_ACTIVE_SURVEY](state, survey: Survey) {
			state.survey = survey;
		},
		[mutations.SET_ACTIVE_PAGE](state, pageId: string) {
			state.pageId = pageId;
		},
		[mutations.ADD_ELEMENT](state, actionData: any) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			if (null === actionData.parentBlockId) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				blocks.splice(actionData.position, 0, actionData.block);

				for (let i = 0; i < blocks.length; i++) {
					blocks[i].setPosition(i);
				}

				page.setBlocks(blocks);
			}
			else {
				let container: Container = page.getBlocks()[actionData.parentBlockId] || null;
				if (null === container) {
					throw new Error('Container not found');
				}

				let blocks: BlockContract[] = container.getBlocksInOrder();
				blocks.splice(actionData.position, 0, actionData.block);

				for (let i = 0; i < blocks.length; i++) {
					blocks[i].setPosition(i);
				}

				container.setBlocks(blocks);
			}

			pages[page.getId()] = page;
		},
		[mutations.CHANGE_ELEMENT_POSITION](state, request: ReorderElement) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;
			let targetBlock: BlockContract = page.getBlocks()[request.blockId];
			let blocks: BlockContract[] = page.getBlocksInOrder();

			let oldPosition = blocks.indexOf(targetBlock);
			blocks.splice(oldPosition, 1);
			blocks.splice(request.position, 0, targetBlock);

			for (let i = 0; i < blocks.length; i++) {
				blocks[i].setPosition(i);
			}

			page.setBlocks(blocks);
			pages[page.getId()] = page;
		},
		[mutations.SAVE_ELEMENT_DATA](state, request: SaveBlockData) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;
			let targetBlock: BlockContract = page.getBlocks()[request.blockId];
			let blocks: BlockContract[] = page.getBlocksInOrder();

			targetBlock.setData(request.data);

			page.setBlocks(blocks);
			pages[page.getId()] = page;
		},
		[mutations.DELETE_ELEMENT](state, blockId: string) {
			let page: PageContract = state.survey.pages[state.pageId];
			Vue.delete(page.getBlocks(), blockId);
		},
		[mutations.ADD_PAGE](state, page: PageContract) {
			let pages = state.survey.pages;
			Vue.set(pages, page.getId(), page);
		},
		[mutations.DELETE_PAGE](state, pageId: string) {
			Vue.delete(state.survey.pages, pageId);

			let pageIds: string[] = Object.keys(state.survey.getPages());
			pageIds.forEach((reorderPageId: string, key: number) => {
				state.survey.getPages()[reorderPageId].setStep(key);
			});
		},
		[mutations.SET_TOKENS](state, tokens: ApiToken[]) {
			state.tokens = tokens;
		},
		[mutations.ADD_TOKEN](state, token: ApiToken) {
			state.tokens.push(token);
		},
		[mutations.SET_SURVEY_STATISTICS] (state, data: BlocksStatistics[]) {
			state.statistics = data;
		},
		[mutations.SET_STATISTICS_SAMPLE] (state, data: StatisticAction[]) {
			state.sample = data;
		}
	},
	actions: {
		[actions.SET_EDITING]({commit}, editing: boolean) {
			commit(mutations.SET_EDITING, editing);
		},
		[actions.LOAD_SETTINGS]({commit}, setting: Settings) {
			commit(mutations.SET_CSRF, setting.csrf);
			commit(mutations.SET_LOCALE, setting.locale);
			commit(mutations.SET_TOKEN, setting.token);
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
			let survey: Survey = await SurveyApi.getSurvey(request);

			commit(mutations.SET_ACTIVE_SURVEY, survey);
			for (let pageId of Object.keys(survey.getPages())) {
				commit(mutations.SET_ACTIVE_PAGE, pageId);
				break;
			}
		},
		async [actions.ADD_ELEMENT]({commit, state}, request: CreateElement) {
			if (null === state.survey) {
				throw new Error('Survey can\'t be modified');
			}

			let block: BlockContract = ComponentsFactory.getDefaultData(request.type);
			commit(mutations.ADD_ELEMENT, {block, position: request.position || 0});
			request.blockId = block.getId();
			block = await BlockApi.createElement(request);

			let newData: SaveBlockData = new SaveBlockData();
			newData.blockId = block.getId();
			newData.data = block.getData();
			commit(mutations.SAVE_ELEMENT_DATA, newData);

			let reorderData: ReorderElement = new ReorderElement();
			reorderData.blockId = block.getId();
			reorderData.position = block.getPosition();
			reorderData.parentBlockId = request.parentBlockId;
			commit(mutations.CHANGE_ELEMENT_POSITION, reorderData);
		},
		async [actions.REORDER_ELEMENT]({commit, state}, request: ReorderElement) {
			if (null === state.survey) {
				throw new Error('Survey can\'t be modified');
			}

			commit(mutations.CHANGE_ELEMENT_POSITION, request);
			await BlockApi.reoderElement(request);
		},
		async [actions.SAVE_ELEMENT_DATA]({commit, state}, request: SaveBlockData) {
			commit(mutations.SAVE_ELEMENT_DATA, request);
			await BlockApi.saveData(request);
		},
		async [actions.DELETE_ELEMENT]({commit, state}, blockId: string) {
			commit(mutations.DELETE_ELEMENT, blockId);
			await BlockApi.deleteElement(blockId);
		},
		async [actions.ADD_PAGE]({commit, state}) {
			let page = await PageApi.add(state.survey.id);
			let select: boolean = (0 === state.survey.getPagesByStep().length);

			commit(mutations.ADD_PAGE, page);

			if (select) {
				commit(mutations.SET_ACTIVE_PAGE, page.getId());
			}
		},
		async [actions.DELETE_PAGE]({commit, state}, pageId: string) {
			let pageIds: string[] = Object.keys(state.survey.getPages());
			if (pageId === state.pageId && pageIds.length > 1) {
				if (0 !== pageIds.indexOf(pageId)) {
					commit(mutations.SET_ACTIVE_PAGE, pageIds[pageIds.indexOf(pageId) - 1])
				}
				else {
					commit(mutations.SET_ACTIVE_PAGE, pageIds[pageIds.indexOf(pageId) + 1])
				}
			}

			commit(mutations.DELETE_PAGE, pageId);

			await PageApi.delete(pageId);
		},
		async [actions.SET_ACTIVE_PAGE]({commit, state}, pageId: string) {
			if (-1 === Object.keys(state.survey.pages).indexOf(pageId)) {
				throw new Error('Page not found');
			}

			commit(mutations.SET_ACTIVE_PAGE, pageId);
		},
		async [actions.LOAD_TOKENS]({commit}) {
			let tokens: ApiToken[] = await SettingsApi.getTokens();
			commit(mutations.SET_TOKENS, tokens);
		},
		async [actions.ADD_TOKEN]({commit, state}, request: CreateToken) {
			let token:ApiToken = await SettingsApi.addToken(request);

			commit(mutations.ADD_TOKEN, token);
		},
		async [actions.DELETE_TOKEN]({commit, state}, request: DeleteToken) {
			await SettingsApi.deleteToken(request);
			let tokens: ApiToken[] = state.tokens;
			tokens = tokens.filter(token => token.id !== request.id);

			commit(mutations.SET_TOKENS, tokens);
		},
		async [actions.LOAD_SURVEY_STATISTICS]({commit}, request: GetSurveyStatistics) {
			let data = await StatisticsApi.getSurveyStatistics(request);
			commit(mutations.SET_SURVEY_STATISTICS, data);
		},
		async [actions.LOAD_STATISTICS_SAMPLE]({commit}, request: GetStatisticsSample) {
			let data = await StatisticsApi.getStatisticsSample(request);
			commit(mutations.SET_STATISTICS_SAMPLE, data);
		},
		async [actions.SET_SECTION]({commit}, section: string|null) {
			commit(mutations.SET_SECTION, section);
		}
	},
	getters: {
		[getters.CSRF](state): string {
			return state.csrf;
		},
		[getters.TOKEN](state): string|null {
			return state.token;
		},
		[getters.LOCALE](state): Locale {
			return state.locale;
		},
		[getters.SECTION](state): string|null {
			return state.section;
		},
		[getters.EDITING](state): boolean {
			return state.editing;
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
		[getters.CURRENT_PAGE](state): PageContract|null {
			return state.survey.pages[state.pageId] || null;
		},
		[getters.PAGE_BY_STEP](state): Function {
			return (step: Number): PageContract|null => {
				let pages = state.survey.getPagesByStep();

				return pages[step.toString()] || null;
			}
		},
		[getters.PAGES](state): PageContract[] {
			return state.survey.getPagesByStep();
		},
		[getters.ELEMENT_DEFAULT_DATA](state): Function {
			return (type: string): BlockContract => {
				if (!(<any>Object).values(BlockTypes).includes(type)) {
					throw new Error('Undefined block type');
				}

				let data:any = state.defaultBlockData[type] || null;
				if (null === data) {
					throw new Error('No default data for block ' + type);
				}

				return state.defaultBlockData[type] as BlockContract;
			};
		},
		[getters.TOKENS](state): ApiToken[] {
			return state.tokens;
		},
		[getters.SURVEY_STATISTICS](state): BlocksStatistics[] {
			return state.statistics;
		},
		[getters.STATISTICS_SAMPLE](state): null {
			return state.sample;
		}
	}
});

export {store};