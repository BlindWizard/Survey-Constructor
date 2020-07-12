import {BaseBlock} from "../components/editables/BaseBlock";
import {bem} from "../../common/bem-helper";

class SelectDispatcher {
	private selected: BaseBlock|null = null;
	private elements: BaseBlock[] = [];

	constructor() {
		document.addEventListener('click', (e: MouseEvent) => {
			this.selected = null;

			let possibleTargets = document.elementsFromPoint(e.x, e.y) as HTMLElement[];
			targets:
				for (let el of possibleTargets) {
					if (el.classList.contains((bem('block-resize-frame').classes()))) {
						continue;
					}

					if (el.classList.contains('reveal-overlay')) {
						return;
					}

					for (let element of this.elements) {
						if (this.selected && element !== this.selected) {
							element.toggleSelect(false);
						}

						var clickOnThis = (el === element.$refs.selectable);
						if (clickOnThis) {
							this.selected = element;
							element.toggleSelect(true);

							break targets;
						}
					}
				}

			for (let element of this.elements) {
				if (element !== this.selected) {
					element.toggleSelect(false);
				}
			}
		});
	}

	public handleElement(component: BaseBlock): void
	{
		this.elements.push(component);
	}

	public unselectAll(): void
	{
		for (let element of this.elements) {
			element.toggleSelect(false);
		}
	}
}

const selectDispatcher = new SelectDispatcher();
export {selectDispatcher};