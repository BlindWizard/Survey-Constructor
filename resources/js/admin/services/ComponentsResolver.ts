import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {OptionsListBlockWrapper} from "../components/editables/OptionsListBlockWrapper";
import {OptionsListBlock} from "../components/controls/OptionsListBlock";
import Vue, {VueConstructor} from "vue";

export class ComponentsResolver {
	protected editable: boolean = false;

	public resolveComponent(type: string): string
	{
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return 'OptionsListBlock' + (this.editable ? 'Wrapper' : '');
			default:
				throw new Error('Undefined block type');
		}
	}

	public resolveComponentClass(type: string): VueConstructor
	{
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return this.editable ? OptionsListBlockWrapper : OptionsListBlock;
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