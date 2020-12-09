import {BlockTypes} from "../contracts/BlockTypes";
import {OptionsListBlockWrapper} from "../components/editables/options-list/OptionsListBlockWrapper";
import {OptionsListBlock} from "../components/controls/OptionsListBlock";
import {VueConstructor} from "vue";
import {OptionBlockWrapper} from "../components/editables/option/OptionBlockWrapper";
import {HeaderBlock} from "../components/controls/HeaderBlock";
import {HeaderBlockWrapper} from "../components/editables/header/HeaderBlockWrapper";
import {OptionBlock} from "../components/controls/OptionBlock";
import {TextBlock} from "../components/controls/TextBlock";
import {TextBlockWrapper} from "../components/editables/text/TextBlockWrapper";
import {BaseBlock} from "../components/editables/BaseBlock";
import {actions} from "../../client/stores/types";
import {TextFieldBlockWrapper} from "../components/editables/text-field/TextFieldBlockWrapper";
import {TextFieldBlock} from "../components/controls/TextFieldBlock";
import {ContainerBlockWrapper} from "../components/editables/container/ContainerBlockWrapper";
import {ContainerBlock} from "../components/controls/ContainerBlock";
import {ImageBlockWrapper} from "../components/editables/image/ImageBlockWrapper";
import {ImageBlock} from "../components/controls/ImageBlock";
import {ButtonBlockWrapper} from "../components/editables/button/ButtonBlockWrapper";
import {ButtonBlock} from "../components/controls/ButtonBlock";
import {DelimiterBlockWrapper} from "../components/editables/delimiter/DelimiterBlockWrapper";
import {DelimiterBlock} from "../components/controls/DelimiterBlock";
import {BlockAction} from "../models/BlockAction";
import {ActionTypes} from "../contracts/ActionTypes";
import {ActionHandles} from "../contracts/ActionHandles";
import {getters} from "../stores/types";
import {SurveyData} from "../models/SurveyData";
import {VariableData} from "../models/VariableData";

export class ComponentsResolver {
	protected editable: boolean = false;

	public resolveComponentClass(type: string): VueConstructor
	{
		switch (type) {
			case BlockTypes.CONTAINER:
				return this.editable ? ContainerBlockWrapper : ContainerBlock;
			case BlockTypes.OPTIONS_LIST:
				return this.editable ? OptionsListBlockWrapper : OptionsListBlock;
			case BlockTypes.OPTION:
				return this.editable ? OptionBlockWrapper : OptionBlock;
			case BlockTypes.HEADER:
				return this.editable ? HeaderBlockWrapper : HeaderBlock;
			case BlockTypes.TEXT:
				return this.editable ? TextBlockWrapper : TextBlock;
			case BlockTypes.TEXT_FIELD:
				return this.editable ? TextFieldBlockWrapper : TextFieldBlock;
			case BlockTypes.IMAGE:
				return this.editable ? ImageBlockWrapper : ImageBlock;
			case BlockTypes.BUTTON:
				return this.editable ? ButtonBlockWrapper : ButtonBlock;
			case BlockTypes.DELIMITER:
				return this.editable ? DelimiterBlockWrapper : DelimiterBlock;
			default:
				throw new Error('Undefined block type');
		}
	}

	public resolveComponentHandler(type: string): Function|null {
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return (component: BaseBlock, event: MouseEvent) => {
					let data = {
						blockId: component.block.getId(),
						optionId: (event.target as HTMLElement).getAttribute('value'),
						checked: (event.target as any).checked,
					};

					component.$store.dispatch(actions.OPTIONS_LIST_SELECT, data);
				};
			case BlockTypes.OPTION:
				return (component: BaseBlock, event: MouseEvent) => {
					let data = {
						blockId: component.block.getId(),
						checked: (event.target as any).checked,
					};

					component.$store.dispatch(actions.OPTION_SELECT, data);
				};
			case BlockTypes.TEXT_FIELD:
				return (component: BaseBlock, event: KeyboardEvent) => {
					let data = {
						blockId: component.block.getId(),
						text: (event.target as any).value,
					};

					component.$store.dispatch(actions.ENTER_TEXT, data);
				};
			case BlockTypes.BUTTON:
				return (component: BaseBlock) => {
					component.block.getActions().forEach((action: BlockAction) => {
						let allow = true;
						for (let condition of action.conditions) {
							if (condition.empty()) {
								continue;
							}

							let survey = component.$store.getters[getters.SURVEY];
							let value = null;
							for (let dataId of Object.keys(survey.getDataset())) {
								let dataset: SurveyData = survey.getDataset()[dataId];

								if (dataset.data) {
									for (let variable of dataset.data) {
										if (variable.id === condition.expected) {
											value = variable.value;
											break;
										}
									}
								}

								if (null !== value) {
									break;
								}
							}

							if (null !== value) {
								switch (condition.comparison) {
									case 'eq':
										if (condition.got !== value) {
											allow = false;
										}
										break;
									case 'lt':
										if (condition.got < value) {
											allow = false;
										}
										break;
									case 'gt':
										if (condition.got > value) {
											allow = false;
										}
										break;
									default:
								}
							}
						}

						if (allow && action.type === ActionTypes.TYPE_CLICK) {
							if (action.handle === ActionHandles.TYPE_GO_TO_PAGE) {
								component.$store.dispatch(actions.SET_PAGE, (action.data as any).pageId);
							}

							if (action.handle === ActionHandles.TYPE_CHANGE_VALUE) {
								let survey = component.$store.getters[getters.SURVEY];
								let value = null;
								for (let dataId of Object.keys(survey.getDataset())) {
									let dataset: SurveyData = survey.getDataset()[dataId];

									if (dataset.data) {
										for (let variable of dataset.data) {
											if (variable.id === (action.data as any).variable) {
												value = variable;
												break;
											}
										}
									}

									if (null !== value) {
										break;
									}
								}

								if (null === value) {
									return;
								}

								let newVariable = new VariableData();
								newVariable.id = value.id;
								newVariable.name = value.name;
								switch ((action.data as any).change) {
									case 'increment':
										newVariable.value = Number(value.value) + 1;

										break;
									case 'decrement':
										newVariable.value = Number(value.value) - 1;

										break;
								}

								component.$store.dispatch(actions.CHANGE_DATA, newVariable);
							}
						}
					});
				};
			case BlockTypes.CONTAINER:
			case BlockTypes.HEADER:
			case BlockTypes.TEXT:
			case BlockTypes.IMAGE:
			case BlockTypes.DELIMITER:
				return null;
			default:
				throw new Error('Undefined block type');
		}
	}

	public setEditable(editable: boolean = true): ComponentsResolver
	{
		this.editable = editable;
		return this;
	}

	public isEditable(): boolean
	{
		return this.editable;
	}
}