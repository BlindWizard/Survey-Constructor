import Vue from 'vue'
import {OptionsListBlockEditable} from "../components/editables/OptionsListBlockEditable";
import {BlockTypes} from "../contracts/BlockTypes";

export class ComponentsFactory
{
	public static create(type: string, container: HTMLElement): Vue
	{
		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				return this.createOptionsList(container);
			default:
				throw new Error('Undefined component');
		}
	}

	private static createOptionsList(container: HTMLElement): Vue
	{
		let ComponentClass = Vue.extend(OptionsListBlockEditable);
		let instance = new ComponentClass();
		instance.$mount();

		container.appendChild(instance.$el);

		return instance;
	}
}