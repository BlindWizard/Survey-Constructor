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

export class ComponentsResolver {
	protected editable: boolean = false;

	public resolveComponent(type: string): string
	{
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return 'OptionsListBlock' + (this.editable ? 'Wrapper' : '');
			case BlockTypes.OPTION:
				return 'OptionBlock' + (this.editable ? 'Wrapper' : '');
			case BlockTypes.HEADER:
				return 'HeaderBlock' + (this.editable ? 'Wrapper' : '');
			case BlockTypes.TEXT:
				return 'TextBlock' + (this.editable ? 'Wrapper' : '');
			default:
				throw new Error('Undefined block type');
		}
	}

	public resolveComponentClass(type: string): VueConstructor
	{
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return this.editable ? OptionsListBlockWrapper : OptionsListBlock;
			case BlockTypes.OPTION:
				return this.editable ? OptionBlockWrapper : OptionBlock;
			case BlockTypes.HEADER:
				return this.editable ? HeaderBlockWrapper : HeaderBlock;
			case BlockTypes.TEXT:
				return this.editable ? TextBlockWrapper : TextBlock;
			default:
				throw new Error('Undefined block type');
		}
	}

	public resolveComponentHandler(type: string): Function {
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return (component: BaseBlock, event: MouseEvent) => {
					let data = {
						blockId: component.block.getId(),
						optionId: (event.target as HTMLElement).getAttribute('value')
					};

					component.$store.dispatch(actions.OPTIONS_LIST_SELECT, data);
				};
			case BlockTypes.OPTION:
				return (component: BaseBlock, event: MouseEvent) => {
					let data = {
						blockId: component.block.getId(),
					};

					component.$store.dispatch(actions.OPTION_SELECT, data);
				};
			case BlockTypes.HEADER:
			case BlockTypes.TEXT:
				return () => {
				};
			default:
				throw new Error('Undefined block type');
		}
	}

	public setEditable(editable: boolean = true): ComponentsResolver
	{
		this.editable = editable;
		return this;
	}
}