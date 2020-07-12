import {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";

const ComponentDrop: DirectiveOptions = {
	inserted: (el, binding, vnode) => {
		dragDropService.handleTarget(el);

		if (binding.modifiers['default']) {
			dragDropService.setDefaultTarget(el);
		}

		el.setAttribute('data-drop-id', binding.value);
	},
	update: (el, binding, vnode) => {
		el.setAttribute('data-drop-id', binding.value);
	},
};

export {ComponentDrop};