import Vue from 'vue'
import {OptionsList} from "../components/controls/OptionsList";

class ComponentsDragFactory
{
	private dragState: boolean = false;
	private container: HTMLElement;
	private target: HTMLElement;
	private placeholder: HTMLElement|null;

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

	public setTarget(target: HTMLElement)
	{
		this.target = target;

		Array.from(this.target.getElementsByClassName('block')).forEach((el: HTMLElement) => {
			el.addEventListener('mouseover', (e: MouseEvent) => {
				if (!componentsDragFactory.getDragState()) {
					return;
				}

				let dropTarget = e.target as HTMLElement;
				var rect = dropTarget.getBoundingClientRect();

				if (e.y < rect.top + dropTarget.offsetHeight / 2) {
					dropTarget.parentElement.insertBefore(this.placeholder, dropTarget);
				}
				else {
					dropTarget.parentElement.insertBefore(this.placeholder, dropTarget.nextSibling);
				}
			});
		});
	}

	public setDragState(state: boolean)
	{
		this.dragState = state;

		if (state) {
			this.placeholder = document.createElement('div');
			this.placeholder.classList.add('placeholder');
			this.placeholder.style.background = 'yellow';
			this.placeholder.style.height = '20px';

			this.target.insertBefore(this.placeholder, this.target.lastChild.nextSibling);
		}
		else if (null !== this.placeholder) {
			this.placeholder.remove();
		}
	}

	public getDragState(): boolean
	{
		return this.dragState;
	}

	private createOptionsList(): Vue
	{
		let ComponentClass = Vue.extend(OptionsList);
		let instance = new ComponentClass();
		instance.$mount();

		this.container.appendChild(instance.$el);

		return instance;
	}

	private createContainer(): HTMLElement
	{
		let container: HTMLElement|null = document.getElementById('drag-container');
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