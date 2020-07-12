import {BaseBlock} from "../components/editables/BaseBlock";
import {store} from "../stores/store";
import {actions} from "../stores/types";

class SelectDispatcher {
	private selected: BaseBlock|null = null;
	private elements: BaseBlock[] = [];

	constructor() {
		document.addEventListener('click', (e: MouseEvent) => {
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

					if (el.classList.contains('edit-modal')) {
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
		});
	}

	public handleElement(component: BaseBlock): void
	{
		this.elements.push(component);
	}
}

const selectDispatcher = new SelectDispatcher();
export {selectDispatcher};