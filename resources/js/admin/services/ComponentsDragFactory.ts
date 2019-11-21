import Vue, {VNode} from 'vue'
import {OptionsList} from "../components/controls/OptionsList";

class ComponentsDragFactory
{
	public create(type:string, parent: VNode): Vue
	{
		switch (type) {
			case 'options-list':
				return this.createOptionsList(parent);
			default:
				throw new Error('Undefined component');
		}
	}

	private createOptionsList(parent: VNode): Vue
	{
		var ComponentClass = Vue.extend(OptionsList);
		var instance = new ComponentClass();
		instance.$mount();

		let container = parent.elm as HTMLElement;
		container.appendChild(instance.$el);

		return instance;
	}
}

const componentsDragFactory = new ComponentsDragFactory();
export {componentsDragFactory};