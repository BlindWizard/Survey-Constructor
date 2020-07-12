import {store} from "../stores/store";
import {getters} from "../stores/types";
import {bem} from "../../common/bem-helper";
import {selectDispatcher} from "./SelectDispatcher";

class DragDropService
{
	private dragState: boolean = false;
	private dragElement: HTMLElement|null = null;
	private dragContainer: HTMLElement;
	private activeTarget: HTMLElement|null = null;
	private defaultTarget: HTMLElement|null = null;
	private targets: HTMLElement[] = [];
	private dropTargets: HTMLElement[] = [];
	private placeholder: HTMLElement|null = null;

	constructor()
	{
		this.dragContainer = this.createDragContainer();

		document.addEventListener('selectstart', (e: Event) => {
			if (this.getDragState()) {
				e.preventDefault();
			}
		});

		this.drag = this.drag.bind(this);
	}

	public handleTarget(target: HTMLElement): void
	{
		this.targets.push(target);

		target.addEventListener('mousemove', (e: MouseEvent) => {
			if (!this.getDragState() || null === this.placeholder) {
				return;
			}

			let targets = [];
			let possibleTargets = document.elementsFromPoint(e.x, e.y) as HTMLElement[];
			for (let i = 0; i < possibleTargets.length; i++) {
				let el: HTMLElement = possibleTargets[i];
				if (-1 !== this.targets.indexOf(el)) {
					targets.push(el);
				}
			}

			for(let i = 0; i < targets.length; i++) {
				let el: HTMLElement = targets[i];
				var zoneRect = el.getBoundingClientRect();

				if ((e.y > zoneRect.top - (zoneRect.height * 0.2) && e.y < zoneRect.bottom - (zoneRect.height * 0.2)) || i === targets.length - 1) {
					this.setActiveTarget(el);
					break;
				}
			}

			var dropPlace: HTMLElement|null = null;
			let target: HTMLElement|null = null;
			for(let i = 0; i < possibleTargets.length; i++) {
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

			if (null === target || null === this.activeTarget) {
				return;
			}

			if (this.placeholder === target) {
				return;
			}

			var rect = target.getBoundingClientRect();

			if (e.y < rect.top + target.offsetHeight / 2) {
				dropPlace = target;
			} else if (e.y > rect.top + target.offsetHeight / 2) {
				dropPlace = target.nextElementSibling as HTMLElement;
			} else {
				dropPlace = null;
			}

			if (dropPlace === this.placeholder) {
				return;
			}

			if (null === dropPlace) {
				this.activeTarget.insertBefore(this.placeholder as Node, null);
			}
			else if (dropPlace.parentNode === this.activeTarget) {
				this.activeTarget.insertBefore(this.placeholder as Node, dropPlace as Node);
			}
		});

		target.addEventListener('mouseleave', () => {
			if (!this.getDragState()) {
				return;
			}
		});
	}

	public handleDropTarget(el: HTMLElement): void
	{
		if (-1 === this.dropTargets.indexOf(el)) {
			this.dropTargets.push(el);
		}
	}

	public handleDrag(dragElement: HTMLElement): void
	{
		this.dragElement = dragElement;
		this.createPlaceholder();

		document.addEventListener('mousemove', this.drag);

		document.body.classList.add(bem('dragging').classes());
		selectDispatcher.unselectAll();
	}

	public drag(e: MouseEvent): void
	{
		if (null === this.dragElement) {
			return;
		}

		this.dragElement.style.left = (e.pageX - this.dragElement.offsetWidth / 2) + 'px';
		this.dragElement.style.top = (e.pageY - this.dragElement.offsetHeight / 2) + 'px';
	}

	public setDragState(state: boolean): void
	{
		this.dragState = state;
		this.activeTarget = this.defaultTarget;

		if (!this.dragState) {
			if (null !== this.placeholder) {
				this.placeholder.remove();
				this.placeholder = null;
			}

			if (null !== this.dragElement) {
				this.dragElement = null;
				document.removeEventListener('mousemove', this.drag);
			}

			if (null !== this.dragContainer) {
				this.dragContainer.innerHTML = '';
			}

			document.body.classList.remove(bem('dragging').classes());
		}
	}

	public getDragState(): boolean
	{
		return this.dragState;
	}

	public getDragContainer(): HTMLElement
	{
		return this.dragContainer;
	}

	public getActiveTarget(): HTMLElement|null
	{
		return this.activeTarget;
	}

	public getPlaceholder(): HTMLElement|null
	{
		return this.placeholder;
	}

	public getDropBlockId(): string
	{
		if (null === this.activeTarget) {
			throw new Error('No drop zone');
		}

		return this.activeTarget.getAttribute('data-drop-id') as string;
	}

	public getDropPosition(e: MouseEvent): number|null
	{
		if (null === this.placeholder || null === this.activeTarget) {
			return null;
		}

		var containerBounds = this.activeTarget.getBoundingClientRect();
		var isDropInContainer = (e.x >= containerBounds.left && e.x <= containerBounds.right && e.y >=containerBounds.top && e.y <= containerBounds.bottom);
		if (!isDropInContainer) {
			return null;
		}

		let elements:HTMLElement[] = Array.from(this.activeTarget.children) as HTMLElement[];
		if (null !== this.dragElement) {
			elements = elements.filter((element: HTMLElement) => {
				return element !== this.dragElement;
			});
		}

		return elements.indexOf(this.placeholder);
	}

	public setActiveTarget(target: HTMLElement): void {
		if (null !== this.activeTarget) {
			this.activeTarget.classList.remove('drop-active');
		}

		target.classList.add('drop-active');

		let recreatePlaceholder = this.activeTarget !== target;
		this.activeTarget = target;

		if (null !== this.placeholder && recreatePlaceholder) {
			this.placeholder.remove();
			this.placeholder = null;

			this.createPlaceholder();
		}
	}

	public setDefaultTarget(target: HTMLElement): void {
		this.defaultTarget = target;
	}

	private createDragContainer(): HTMLElement
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

	private createPlaceholder(): void
	{
		if (null !== this.placeholder || null === this.activeTarget) {
			return;
		}

		let placeholder = document.createElement('div');
		placeholder.classList.add(bem('placeholder').classes());
		placeholder.innerHTML = '<span class="' + bem('placeholder').el('label').classes() + '">' + store.getters[getters.LOCALE].dropPlaceholderLabel + '</span>';

		if (this.activeTarget.lastChild) {
			this.activeTarget.insertBefore(placeholder, this.activeTarget.lastChild.nextSibling);
		}
		else {
			this.activeTarget.insertBefore(placeholder, this.activeTarget.firstChild);
		}

		this.placeholder = placeholder;
	}
}

const dragDropService = new DragDropService();
export {dragDropService};