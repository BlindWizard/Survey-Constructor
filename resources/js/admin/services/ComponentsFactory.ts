import Vue from 'vue'
import {OptionsListBlock} from "../components/controls/OptionsListBlock";
import {OptionsListBlockEditable} from "../components/editables/OptionsListBlockEditable";

export class ComponentsFactory
{
	public static create(type: string, container: HTMLElement): Vue
	{
		switch (type) {
			case 'options-list':
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