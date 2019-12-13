class DragDropService
{
	private dragState: boolean = false;
	private dragElement: HTMLElement|null = null;
	private container: HTMLElement;
	private target: HTMLElement;
	private placeholder: HTMLElement|null = null;
	private dropPlace: HTMLElement|null = null;

	constructor()
	{
		this.container = this.createContainer();

		document.addEventListener('selectstart', (e: Event) => {
			if (this.getDragState()) {
				e.preventDefault();
			}
		});
	}

	public handleTarget(target: HTMLElement, rows: HTMLElement[])
	{
		this.target = target;

		this.target.addEventListener('mousemove', (e: MouseEvent) => {
			if (!this.getDragState()) {
				return;
			}

			let possibleTargets = document.elementsFromPoint(e.x, e.y) as HTMLElement[];
			let row: HTMLElement|null = null;
			for(let i = 0; i < possibleTargets.length - 1; i++) {
				let el: HTMLElement = possibleTargets[i];

				if (-1 !== rows.indexOf(el)) {
					row = el;
					break;
				}

				if (el === this.placeholder) {
					row = this.placeholder as HTMLElement;
					break;
				}
			}

			if (null === row) {
				this.dropPlace = null;
				return;
			}

			if (this.placeholder !== row) {
				var rect = row.getBoundingClientRect();

				if (e.y < rect.top + row.offsetHeight / 2) {
					this.dropPlace = row;
				} else {
					this.dropPlace = row.nextElementSibling as HTMLElement;
				}

				if (this.dropPlace === this.placeholder) {
					return;
				}

				this.target.insertBefore(this.placeholder as Node, this.dropPlace as Node);
			}
			else {
				this.dropPlace = row;
			}
		});

		this.target.addEventListener('mouseleave', (e: MouseEvent) => {
			if (!this.getDragState()) {
				return;
			}

			this.dropPlace = null;
			console.log('out', this.target, this.dropPlace);
		});
	}

	public handleDrag(dragElement: HTMLElement)
	{
		this.dragElement = dragElement;
		this.createPlaceholder();

		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (!this.getDragState()) {
				return;
			}

			dragElement.style.left = e.x + 'px';
			dragElement.style.top = e.y + 'px';
		});
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
				this.dragElement.remove();
				this.dragElement = null;
			}

			this.dropPlace = null;
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

	public getLastTarget(): HTMLElement|null
	{
		return this.dropPlace;
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
		placeholder.classList.add('placeholder');
		placeholder.style.background = 'yellow';
		placeholder.style.height = '20px';

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