import Vue from 'vue'
import {OptionsListBlockWrapper} from "../components/editables/OptionsListBlockWrapper";
import {BlockTypes} from "../contracts/BlockTypes";
import {store} from "../stores/store";

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
		let ComponentClass = Vue.extend(OptionsListBlockWrapper);
		let instance = new ComponentClass({store});
		instance.$mount();

		container.appendChild(instance.$el);

		return instance;
	}
}