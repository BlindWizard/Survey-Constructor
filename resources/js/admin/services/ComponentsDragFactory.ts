import Vue, {VNode} from 'vue'
import {OptionsList} from "../components/controls/OptionsList";

class ComponentsDragFactory
{
	private container: HTMLElement;

	constructor()
	{
		this.container = this.createContainer();
	}

	public create(type:string): Vue
	{
		switch (type) {
			case 'options-list':
				return this.createOptionsList();
			default:
				throw new Error('Undefined component');
		}
	}

	private createOptionsList(): Vue
	{
		var ComponentClass = Vue.extend(OptionsList);
		var instance = new ComponentClass();
		instance.$mount();

		this.container.appendChild(instance.$el);

		return instance;
	}

	private createContainer(): HTMLElement
	{
		let container = document.getElementById('drag-container');
		if (null === container) {
			container = document.createElement('div');
			container.id = 'drag-container';
			container.classList.add('drag-container');
			document.body.append(container);
		}

		return container;
	}
}

const componentsDragFactory = new ComponentsDragFactory();
export {componentsDragFactory};