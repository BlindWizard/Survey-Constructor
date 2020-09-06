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
import {BlocksStatistics} from "../models/BlocksStatistics";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";
import {StatisticAction} from "../models/StatisticAction";
import {Container} from "../models/Container";
import {Page} from "../models/Page";
import {DeleteSurvey} from "../api/requests/DeleteSurvey";
import {SurveyContract} from "../contracts/SurveyContract";
import {ResizeBlockData} from "../api/requests/ResizeBlockData";
import {ResizeModes} from "../contracts/ResizeModes";
import {selectService} from "../services/SelectService";
import {SaveBlockStyle} from "../api/requests/SaveBlockStyle";
import {ChangeSizeMeasureData} from "../api/requests/ChangeSizeMeasureData";
import {BlockStyle} from "../models/BlockStyle";
import {Rectangle} from "../models/Rectangle";
import {ChangeSlotsCount} from "../api/requests/ChangeSlotsCount";
import {SaveSlotStyle} from "../api/requests/SaveSlotStyle";
import {AddBlockAction} from "../api/requests/AddBlockAction";
import {SaveBlockActions} from "../api/requests/SaveBlockActions";
import {BlockAction} from "../models/BlockAction";
const uuidv4 = require('uuid/v4');

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		csrf: '',
		token: null as string|null,
		locale: null as any,
		section: null as string|null,
		editing: false as boolean,
		resizing: false as boolean,
		defaultBlockData: [],
		actionsTypes: null as any,
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
		[mutations.SET_RESIZING](state, resizing: boolean) {
			state.resizing = resizing;
		},
		[mutations.SET_DEFAULT_BLOCK_DATA](state, data) {
			state.defaultBlockData = data;
		},
		[mutations.SET_ACTIONS_TYPES](state, data) {
			state.actionsTypes = data;
		},
		[mutations.SET_SURVEYS](state, surveys) {
			state.surveys = surveys;
		},
		[mutations.DELETE_SURVEY](state, request: DeleteSurvey) {
			let surveys = state.surveys.filter((survey: SurveyContract) => {
				return survey.getId() !== request.surveyId;
			});

			Vue.set(state, 'surveys', surveys);
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

			if (pages[actionData.block.getParentId()]) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				blocks.splice(actionData.position, 0, actionData.block);

				for (let i = 0; i < blocks.length; i++) {
					blocks[i].setPosition(i);
				}

				page.setBlocks(blocks);
			}
			else {
				let container = page.getContainerBySlotId(actionData.block.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				let containerBlocks: BlockContract[] = container.getBlocksInOrder(actionData.block.getParentId());
				containerBlocks.splice(actionData.position, 0, actionData.block);

				for (let i = 0; i < containerBlocks.length; i++) {
					containerBlocks[i].setPosition(i);
				}

				container = ComponentsFactory.cloneElement(container) as Container;
				container.setBlocks(actionData.block.getParentId(), containerBlocks);

				while (true) {
					let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		},
		[mutations.SAVE_ELEMENT_DATA](state, request: SaveBlockData) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			targetBlock.setData(request.data);

			if (pages[targetBlock.getParentId()]) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				let targetBlock = page.getBlocks()[request.blockId];

				blocks[targetBlock.getPosition()] = ComponentsFactory.cloneElement(targetBlock);
				page.setBlocks(blocks);
			}
			else {
				let container = page.getContainerBySlotId(targetBlock.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				container.children[targetBlock.getParentId()][targetBlock.getId()] = ComponentsFactory.cloneElement(targetBlock);

				while (true) {
					let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		},
		[mutations.CHANGE_ELEMENT_POSITION](state, request: ReorderElement) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			if (request.parentBlockId === targetBlock.getParentId()) {
				let container: PageContract|Container|null = null;
				let blocks: BlockContract[] = [];
				if (pages[request.parentBlockId]) {
					container = pages[request.parentBlockId];
					blocks = page.getBlocksInOrder();
				}
				else {
					container = page.getContainerBySlotId(request.parentBlockId);
					if (null === container) {
						throw new Error('Container not found');
					}

					blocks = (container as Container).getBlocksInOrder(request.parentBlockId);
				}

				blocks.splice(targetBlock.getPosition(), 1);
				blocks.splice(request.position, 0, targetBlock);
				targetBlock.setParentId(request.parentBlockId);

				for (let i = 0; i < blocks.length; i++) {
					blocks[i].setPosition(i);
				}

				if (container instanceof Page) {
					container.setBlocks(blocks);
				}
				else if (container instanceof Container) {
					container.setBlocks(request.parentBlockId, blocks);

					while (true) {
						let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
						if (null === upperContainer) {
							break;
						}

						upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

						container = upperContainer;
					}

					blocks = page.getBlocks();
					blocks[container.getId()] = ComponentsFactory.cloneElement(container);
					let plain = [];
					for (let blockId of Object.keys(blocks)) {
						plain.push(blocks[blockId]);
					}

					page.setBlocks(plain);
				}
			}

			if (request.parentBlockId !== targetBlock.getParentId()) {
				//delete
				let container: PageContract|Container|null = null;
				if (pages[targetBlock.getParentId()]) {
					container = pages[targetBlock.getParentId()] as PageContract;
					container.deleteBlock(targetBlock.getId());
				}
				else {
					container = page.getContainerBySlotId(targetBlock.getParentId());
					if (null === container) {
						throw new Error('Container not found');
					}

					container.deleteBlock(targetBlock.getId());
				}

				//add
				if (pages[request.parentBlockId]) {
					let blocks: BlockContract[] = page.getBlocksInOrder();
					blocks.splice(request.position, 0, targetBlock);
					targetBlock.setParentId(request.parentBlockId);

					for (let i = 0; i < blocks.length; i++) {
						blocks[i].setPosition(i);
					}

					page.setBlocks(blocks);
				}
				else {
					let container = page.getContainerBySlotId(request.parentBlockId);
					if (null === container) {
						throw new Error('Container not found');
					}

					let containerBlocks: BlockContract[] = container.getBlocksInOrder(request.parentBlockId);
					containerBlocks.splice(request.position, 0, targetBlock);
					targetBlock.setParentId(request.parentBlockId);

					for (let i = 0; i < containerBlocks.length; i++) {
						containerBlocks[i].setPosition(i);
					}

					container = ComponentsFactory.cloneElement(container) as Container;
					container.setBlocks(request.parentBlockId, containerBlocks);

					while (true) {
						let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
						if (null === upperContainer) {
							break;
						}

						upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

						container = upperContainer;
					}

					let blocks: BlockContract[] = page.getBlocks();
					blocks[container.getId()] = ComponentsFactory.cloneElement(container);
					let plain = [];
					for (let blockId of Object.keys(blocks)) {
						plain.push(blocks[blockId]);
					}

					page.setBlocks(plain);
				}
			}
		},
		[mutations.DELETE_ELEMENT](state, blockId: string) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock: BlockContract|null = page.getBlockById(blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			let container: PageContract|Container|null = null;
			if (pages[targetBlock.getParentId()]) {
				container = pages[targetBlock.getParentId()];
				(container as PageContract).deleteBlock(blockId);
			}
			else {
				container = page.getContainerBySlotId(targetBlock.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				container.deleteBlock(targetBlock.getId());

				while (true) {
					let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		},
		[mutations.SAVE_ELEMENT_STYLE](state, request: SaveBlockStyle) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			targetBlock.setStyle(request.style);

			if (pages[targetBlock.getParentId()]) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				let targetBlock = page.getBlocks()[request.blockId];

				blocks[targetBlock.getPosition()] = ComponentsFactory.cloneElement(targetBlock);
				page.setBlocks(blocks);
			}
			else {
				let container = page.getContainerBySlotId(targetBlock.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				container.children[targetBlock.getParentId()][targetBlock.getId()] = ComponentsFactory.cloneElement(targetBlock);

				while (true) {
					let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		},
		[mutations.SET_SLOT_STYLE](state, request: SaveSlotStyle) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			targetBlock.getStyle()['slotsStyle'][request.slotId].width = request.width;
		},
		[mutations.RESIZE_ELEMENT](state, request: ResizeBlockData) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;
			let targetBlock: BlockContract|null = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			let element = selectService.getSelected();
			if (null === element) {
				throw new Error('No selected element');
			}

			switch (request.mode) {
				case ResizeModes.RESIZE:
					if (null !== request.slotId) {
						let parentWidth = element.$el.clientWidth;

						let originalStyle = request.originalStyle['slotsStyle'][request.slotId];
						let slots = targetBlock.getData()['slots'];
						let prevSlot = slots[slots.indexOf(request.slotId) - 1];

						let targetStyle = targetBlock.getStyle()['slotsStyle'][request.slotId];
						let prevSlotStyle = targetBlock.getStyle()['slotsStyle'][prevSlot];

						let slotWidth = (parentWidth * originalStyle.width / 100);
						let offset = originalStyle.width * ((-request.offset.left + request.offset.right) / slotWidth);

						let slotNewWidth = originalStyle.width + offset;
						let prevSlotNewWidth = request.originalStyle['slotsStyle'][prevSlot].width - offset;
						if ((slotNewWidth >= 0 && prevSlotNewWidth <= 100) && (slotNewWidth <= 100 && prevSlotNewWidth >= 0)) {
							targetStyle.width = slotNewWidth;
							prevSlotStyle.width = prevSlotNewWidth;
						}
					}
					else {
						let originalStyle = request.originalStyle['style'];
						let targetStyle = targetBlock.getStyle()['style'];

						if ('px' === targetStyle.sizeMeasure) {
							targetStyle.width = ('auto' !== originalStyle.width ? originalStyle.width - request.offset.left + request.offset.right : 'auto');
							targetStyle.height = ('auto' !== originalStyle.height ? originalStyle.height + request.offset.top + request.offset.bottom : 'auto');
						}

						if ('%' === targetStyle.sizeMeasure) {
							let parentWidth = (element.$el.parentElement as HTMLElement).clientWidth;

							let width = (parentWidth * originalStyle.width / 100);
							let offset = originalStyle.width * ((-request.offset.left + request.offset.right) / width);

							targetStyle.width = originalStyle.width + offset;
							if (targetStyle.width > 100) {
								targetStyle.width = 100;
							}

							targetStyle.height = 'auto';
						}
					}

					break;

				case ResizeModes.MARGIN:
					{
						let targetStyle = targetBlock.getStyle()['style'];
						let originalStyle = request.originalStyle['style'];

						if (request.offset.top) {
							targetStyle.margin.top = originalStyle.margin.top - request.offset.top;
						}

						if (request.offset.right) {
							targetStyle.margin.right = originalStyle.margin.right + request.offset.right;
						}

						if (request.offset.bottom) {
							targetStyle.margin.bottom = originalStyle.margin.bottom + request.offset.bottom;
						}

						if (request.offset.left) {
							targetStyle.margin.left = originalStyle.margin.left - request.offset.left;
						}
					}

					break;

				case ResizeModes.PADDING:
					{
						let targetStyle = targetBlock.getStyle()['style'];
						let originalStyle = request.originalStyle['style'];

						if (request.offset.top) {
							targetStyle.padding.top = originalStyle.padding.top + request.offset.top;
							if (targetStyle.padding.top < 0) {
								targetStyle.padding.top = 0;
							}
						}

						if (request.offset.right) {
							targetStyle.padding.right = originalStyle.padding.right - request.offset.right;
							if (targetStyle.padding.right < 0) {
								targetStyle.padding.right = 0;
							}
						}

						if (request.offset.bottom) {
							targetStyle.padding.bottom = originalStyle.padding.bottom - request.offset.bottom;
							if (targetStyle.padding.bottom < 0) {
								targetStyle.padding.bottom = 0;
							}
						}

						if (request.offset.left) {
							targetStyle.padding.left = originalStyle.padding.left + request.offset.left;
							if (targetStyle.padding.left < 0) {
								targetStyle.padding.left = 0;
							}
						}
					}

					break;
				default:
					return;
			}


			if (pages[targetBlock.getParentId()]) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				let targetBlock = page.getBlocks()[request.blockId];

				blocks[targetBlock.getPosition()] = ComponentsFactory.cloneElement(targetBlock);
				page.setBlocks(blocks);
			}
			else {
				let container = page.getContainerBySlotId(targetBlock.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				container.children[targetBlock.getParentId()][targetBlock.getId()] = ComponentsFactory.cloneElement(targetBlock);

				while (true) {
					let upperContainer: Container|null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		},
		[mutations.CHANGE_SIZE_MEASURE](state, request: ChangeSizeMeasureData) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;
			let targetBlock: BlockContract|null = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			let element = selectService.getSelected();
			if (null === element) {
				throw new Error('No selected element');
			}

			if ('%' === request.measure) {
				targetBlock.getStyle()['style'].width = 100;
				targetBlock.getStyle()['style'].height = 'auto';
			}
			else {
				targetBlock.getStyle()['style'].width = element.$el.clientWidth;
				targetBlock.getStyle()['style'].height = element.$el.clientHeight;
			}

			targetBlock.getStyle()['style'].sizeMeasure = request.measure;
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
		},
		[mutations.ADD_ELEMENT_ACTION] (state, request: AddBlockAction) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			let actions = targetBlock.getActions();
			let action = new BlockAction();
			action.id = request.id;
			action.type = request.type;
			actions.push(action);
			targetBlock.setActions(actions);

			if (pages[targetBlock.getParentId()]) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				let targetBlock = page.getBlocks()[request.blockId];

				blocks[targetBlock.getPosition()] = ComponentsFactory.cloneElement(targetBlock);
				page.setBlocks(blocks);
			} else {
				let container = page.getContainerBySlotId(targetBlock.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				container.children[targetBlock.getParentId()][targetBlock.getId()] = ComponentsFactory.cloneElement(targetBlock);

				while (true) {
					let upperContainer: Container | null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		},
		[mutations.SAVE_ELEMENT_ACTIONS] (state, request: SaveBlockActions) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;

			let targetBlock = page.getBlockById(request.blockId);
			if (null === targetBlock) {
				throw new Error('Block not found');
			}

			targetBlock.setActions(request.actions);

			if (pages[targetBlock.getParentId()]) {
				let blocks: BlockContract[] = page.getBlocksInOrder();
				let targetBlock = page.getBlocks()[request.blockId];

				blocks[targetBlock.getPosition()] = ComponentsFactory.cloneElement(targetBlock);
				page.setBlocks(blocks);
			} else {
				let container = page.getContainerBySlotId(targetBlock.getParentId());
				if (null === container) {
					throw new Error('Container not found');
				}

				container.children[targetBlock.getParentId()][targetBlock.getId()] = ComponentsFactory.cloneElement(targetBlock);

				while (true) {
					let upperContainer: Container | null = page.getContainerBySlotId(container.getParentId());
					if (null === upperContainer) {
						break;
					}

					upperContainer.children[container.getParentId()][container.getId()] = ComponentsFactory.cloneElement(container);

					container = upperContainer;
				}

				let blocks: BlockContract[] = page.getBlocks();
				blocks[container.getId()] = ComponentsFactory.cloneElement(container);
				let plain = [];
				for (let blockId of Object.keys(blocks)) {
					plain.push(blocks[blockId]);
				}

				page.setBlocks(plain);
			}
		}
	},
	actions: {
		[actions.SET_EDITING]({commit}, editing: boolean) {
			commit(mutations.SET_EDITING, editing);
		},
		[actions.SET_RESIZING]({commit}, resizing: boolean) {
			commit(mutations.SET_RESIZING, resizing);
		},
		[actions.LOAD_SETTINGS]({commit}, setting: Settings) {
			commit(mutations.SET_CSRF, setting.csrf);
			commit(mutations.SET_LOCALE, setting.locale);
			commit(mutations.SET_TOKEN, setting.token);
			commit(mutations.SET_DEFAULT_BLOCK_DATA, setting.defaultBlockData);
			commit(mutations.SET_ACTIONS_TYPES, setting.actionsTypes);
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
		async [actions.DELETE_SURVEY]({commit}, request: DeleteSurvey) {
			commit(mutations.DELETE_SURVEY, request);
			await SurveyApi.deleteSurvey(request);
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
			block.setParentId(request.parentBlockId || request.pageId);
			commit(mutations.ADD_ELEMENT, {block, position: request.position || 0});

			request.blockId = block.getId();
			block = await BlockApi.createElement(request);
			let newData: SaveBlockData = new SaveBlockData();
			newData.blockId = block.getId();
			newData.data = block.getData();
			commit(mutations.SAVE_ELEMENT_DATA, newData);

			let newStyle: SaveBlockStyle = new SaveBlockStyle();
			newStyle.blockId = block.getId();
			newStyle.style = block.getStyle();
			commit(mutations.SAVE_ELEMENT_STYLE, newStyle);

			let reorderData: ReorderElement = new ReorderElement();
			reorderData.blockId = block.getId();
			reorderData.position = block.getPosition();
			reorderData.parentBlockId = block.getParentId();
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
		async [actions.RESIZE_ELEMENT]({commit, state}, request: ResizeBlockData) {
			commit(mutations.RESIZE_ELEMENT, request);
		},
		async [actions.CHANGE_SLOTS_COUNT]({dispatch, commit, state}, request: ChangeSlotsCount) {
			let pages = state.survey.pages;
			let page = pages[state.pageId] as PageContract;
			let block: BlockContract|null = page.getBlockById(request.blockId);
			if (null === block) {
				throw new Error('Block not found');
			}

			let targetBlock: BlockContract = ComponentsFactory.cloneElement(block);
			let targetStyle = targetBlock.getStyle()

			let offsetSum = 0;
			let newSlotsCount = request.count;
			let oldSlotsCount = targetBlock.getData()['slots'].length as number;
			if (newSlotsCount > oldSlotsCount) {
				let newSlot: string|null = null;
				let newSlots = [];
				for (let i = 0; i < newSlotsCount - oldSlotsCount; i++) {
					newSlot = uuidv4() as string;
					targetBlock.getData()['slots'].push(newSlot);
					targetBlock.getData()['children'][newSlot] = {};
					targetStyle['slotsStyle'][newSlot] = new BlockStyle();
					targetStyle['slotsStyle'][newSlot].sizeMeasure = '%';
					targetStyle['slotsStyle'][newSlot].width = 0.01;
					targetStyle['slotsStyle'][newSlot].margin = new Rectangle();
					targetStyle['slotsStyle'][newSlot].padding = new Rectangle();

					newSlots.push(newSlot);
					offsetSum += 0.01;
				}

				if (null !== newSlot) {
					let prevSlot = targetBlock.getData()['slots'][targetBlock.getData()['slots'].indexOf(newSlot) - 1];

					//@TODO-02.08.2020-Чучманский Aндрей Improve reactive update
					let slotRequest = new SaveSlotStyle();

					slotRequest.blockId = targetBlock.getId();
					slotRequest.slotId = prevSlot;
					slotRequest.width = (targetStyle['slotsStyle'][prevSlot].width as number - offsetSum);
					commit(mutations.SET_SLOT_STYLE, slotRequest);
				}
			}
			else {
				for (let i = 0; i < oldSlotsCount - newSlotsCount; i++) {
					let deleteSlot: string = targetBlock.getData()['slots'].pop() as string;

					offsetSum += targetStyle['slotsStyle'][deleteSlot].width;

					delete targetBlock.getData()['children'][deleteSlot];
					delete targetStyle['slotsStyle'][deleteSlot];
				}

				for (let slotId of targetBlock.getData()['slots']) {
					targetStyle['slotsStyle'][slotId].width += (offsetSum / targetBlock.getData()['slots'].length);
				}
			}

			let dataRequest = new SaveBlockData();
			dataRequest.blockId = targetBlock.getId();
			dataRequest.data = targetBlock.getData();
			dispatch(actions.SAVE_ELEMENT_DATA, dataRequest);

			let styleRequest = new SaveBlockStyle();
			styleRequest.blockId = targetBlock.getId();
			styleRequest.style = targetStyle;
			dispatch(actions.SAVE_STYLE, styleRequest);
		},
		async [actions.CHANGE_SIZE_MEASURE]({commit, state}, request: ChangeSizeMeasureData) {
			commit(mutations.CHANGE_SIZE_MEASURE, request);
		},
		async [actions.SAVE_STYLE]({commit, state}, request: SaveBlockStyle) {
			commit(mutations.SAVE_ELEMENT_STYLE, request);
			await BlockApi.saveStyle(request);
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
		},
		async [actions.ADD_ACTION]({commit}, request: AddBlockAction) {
			commit(mutations.ADD_ELEMENT_ACTION, request);
			await BlockApi.addAction(request);
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
		[getters.RESIZING](state): boolean {
			return state.resizing;
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
		[getters.ACTIONS_TYPES](state): string[] {
			return state.actionsTypes;
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