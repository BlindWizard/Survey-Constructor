import {BaseBlock} from "../components/editables/BaseBlock";
import {store} from "../stores/store";
import {actions} from "../stores/types";

class SelectService {
	private selected: BaseBlock|null = null;
	private elements: BaseBlock[] = [];

	constructor() {
		this.handleClick = this.handleClick.bind(this);

		this.enable();
	}

	public enable() {
		document.addEventListener('click', this.handleClick);
	}

	public disable() {
		document.removeEventListener('click', this.handleClick);
	}

	public handleClick(e: MouseEvent) {
		this.selected = null;

		let possibleTargets = document.elementsFromPoint(e.x, e.y) as HTMLElement[];
		targets:
			for (let el of possibleTargets) {
				if (el.classList.contains('block-resize-frame')) {
					continue;
				}

				if (el.classList.contains('reveal-overlay')) {
					return;
				}

				if (el.classList.contains('edit-modal') || el.closest('.edit-modal')) {
					return;
				}

				for (let element of this.elements) {
					if (this.selected && element !== this.selected) {
						element.toggleSelect(false);
						element.toggleEdit(false);
					}

					var clickOnThis = (el === element.$refs.selectable);
					if (clickOnThis) {
						this.selected = element;
						element.toggleSelect(true);
						element.toggleEdit(true);
						element.resizeMode = null;

						break targets;
					}
				}
			}

		for (let element of this.elements) {
			if (element !== this.selected) {
				element.toggleSelect(false);
				element.toggleEdit(false);
			}
		}

		store.dispatch(actions.SET_EDITING, null !== this.selected);
	}

	public getSelected(): BaseBlock|null
	{
		return this.selected;
	}

	public handleElement(component: BaseBlock): void
	{
		this.elements.push(component);
	}
}

const selectService = new SelectService();
export {selectService};