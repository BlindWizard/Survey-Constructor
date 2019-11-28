class DragDropService
{
	private dragState: boolean = false;
	private dragElement: HTMLElement|null;
	private container: HTMLElement;
	private target: HTMLElement;
	private placeholder: HTMLElement|null;

	constructor()
	{
		this.container = this.createContainer();
	}

	public handleTarget(target: HTMLElement, rows: HTMLElement[])
	{
		this.target = target;

		rows.forEach((row) => {
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

		if (this.dragState) {
			if (!this.placeholder) {
				this.placeholder = this.createPlaceholder();
			}

			this.target.insertBefore(this.placeholder, this.target.lastChild.nextSibling);
		}
		else {
			if (this.placeholder) {
				this.placeholder.remove();
			}

			if (this.dragElement) {
				this.dragElement.remove();
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

	private createPlaceholder(): HTMLElement
	{
		let placeholder = document.createElement('div');
		placeholder.classList.add('placeholder');
		placeholder.style.background = 'yellow';
		placeholder.style.height = '20px';

		return placeholder;
	}
}

const dragDropService = new DragDropService();
export {dragDropService};