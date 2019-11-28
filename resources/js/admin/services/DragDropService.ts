class DragDropService
{
	private dragState: boolean = false;
	private dragElement: HTMLElement|null = null;
	private container: HTMLElement;
	private target: HTMLElement;
	private placeholder: HTMLElement|null = null;

	constructor()
	{
		this.container = this.createContainer();
	}

	public handleTarget(target: HTMLElement, rows: HTMLElement[])
	{
		this.target = target;

		rows.forEach((row: HTMLElement) => {
			row.addEventListener('mouseover', (e: MouseEvent) => {
				if (!this.getDragState()) {
					return;
				}

				let dropTarget = row;
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

		this.target.insertBefore(placeholder, this.target.lastChild.nextSibling);

		this.placeholder = placeholder;
	}
}

const dragDropService = new DragDropService();
export {dragDropService};