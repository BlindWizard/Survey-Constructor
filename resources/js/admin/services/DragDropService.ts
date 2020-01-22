import {store} from "../stores/store";
import {getters} from "../stores/types";
import {bem} from "../../common/bem-helper";

class DragDropService
{
	private dragState: boolean = false;
	private dragElement: HTMLElement|null = null;
	private container: HTMLElement;
	private target: HTMLElement;
	private dropTargets: HTMLElement[] = [];
	private placeholder: HTMLElement|null = null;

	constructor()
	{
		this.container = this.createContainer();

		document.addEventListener('selectstart', (e: Event) => {
			if (this.getDragState()) {
				e.preventDefault();
			}
		});

		this.drag = this.drag.bind(this);
	}

	public handleTarget(target: HTMLElement)
	{
		this.target = target;

		this.target.addEventListener('mousemove', (e: MouseEvent) => {
			if (!this.getDragState() || null === this.placeholder) {
				return;
			}

			var dropPlace: HTMLElement|null = null;
			let possibleTargets = document.elementsFromPoint(e.x, e.y) as HTMLElement[];
			let target: HTMLElement|null = null;
			for(let i = 0; i < possibleTargets.length - 1; i++) {
				let el: HTMLElement = possibleTargets[i];

				if (-1 !== this.dropTargets.indexOf(el)) {
					target = el;
					break;
				}

				if (el === this.placeholder) {
					target = this.placeholder as HTMLElement;
					break;
				}
			}

			if (null === target) {
				return;
			}

			if (this.placeholder === target) {
				return;
			}

			var rect = target.getBoundingClientRect();

			if (e.y < rect.top + target.offsetHeight / 2) {
				dropPlace = target;
			} else {
				dropPlace = target.nextElementSibling as HTMLElement;
			}

			if (dropPlace === this.placeholder) {
				return;
			}

			this.target.insertBefore(this.placeholder as Node, dropPlace as Node);
		});

		this.target.addEventListener('mouseleave', () => {
			if (!this.getDragState()) {
				return;
			}


		});
	}

	public handleDropTarget(el: HTMLElement)
	{
		if (-1 === this.dropTargets.indexOf(el)) {
			this.dropTargets.push(el);
		}
	}

	public handleDrag(dragElement: HTMLElement)
	{
		this.dragElement = dragElement;
		this.createPlaceholder();

		document.addEventListener('mousemove', this.drag);
	}

	public drag(e: MouseEvent)
	{
		if (null === this.dragElement) {
			return;
		}

		this.dragElement.style.left = e.x + 'px';
		this.dragElement.style.top = e.y + 'px';
	}

	public setDragState(state: boolean)
	{
		this.dragState = state;

		if (!this.dragState) {
			if (null !== this.placeholder) {
				this.placeholder.remove();
				this.placeholder = null;
			}

			if (null !== this.dragElement) {
				this.dragElement = null;
				document.removeEventListener('mousemove', this.drag);
			}
		}
	}

	public getDragState(): boolean
	{
		return this.dragState;
	}

	public getContainer(): HTMLElement
	{
		return this.container;
	}

	public getDropPosition(e: MouseEvent): number|null
	{
		if (null === this.placeholder) {
			return null;
		}

		var containerBounds = this.target.getBoundingClientRect();
		var isDropInContainer = (e.x >= containerBounds.left && e.x <= containerBounds.right && e.y >=containerBounds.top && e.y <= containerBounds.bottom);
		if (!isDropInContainer) {
			return null;
		}

		let elements:HTMLElement[] = Array.from(this.target.children) as HTMLElement[];
		if (null !== this.dragElement) {
			elements = elements.filter((element: HTMLElement) => {
				return element !== this.dragElement;
			});
		}

		return elements.indexOf(this.placeholder);
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

	private createPlaceholder()
	{
		if (null !== this.placeholder) {
			return;
		}

		let placeholder = document.createElement('div');
		placeholder.classList.add(bem('placeholder').classes());
		placeholder.innerHTML = '<span class="' + bem('placeholder').el('label').classes() + '">' + store.getters[getters.LOCALE].dropPlaceholderLabel + '</span>';

		if (this.target.lastChild) {
			this.target.insertBefore(placeholder, this.target.lastChild.nextSibling);
		}
		else {
			this.target.insertBefore(placeholder, this.target.firstChild);
		}

		this.placeholder = placeholder;
	}
}

const dragDropService = new DragDropService();
export {dragDropService};