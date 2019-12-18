import {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";
import {bem} from "../../common/bem-helper";

const ComponentDrop: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		let rows: HTMLElement[] = [];
		let drop = el.querySelector('.' + binding.value) as HTMLElement|null;

		if (null === drop) {
			throw new Error('Wrong drop target');
		}

		Array.from(drop.children).forEach((el: Element) => {
			if (el.classList.contains(bem('options-list-wrapper').classes())) {
				rows.push(el as HTMLElement);
			}
		});

		dragDropService.handleTarget(drop, rows);
	},
};

export {ComponentDrop};