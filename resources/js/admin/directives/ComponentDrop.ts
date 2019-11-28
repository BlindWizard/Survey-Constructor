import {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";

const ComponentDrop: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		let rows: HTMLElement[] = [];
		Array.from(el.getElementsByClassName('block')).forEach((el: Element) => {
			rows.push(el as HTMLElement);
		});

		dragDropService.handleTarget(el, rows);
	},
};

export {ComponentDrop};