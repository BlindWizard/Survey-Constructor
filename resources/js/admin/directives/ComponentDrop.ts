import {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";

const ComponentDrop: DirectiveOptions = {
	inserted: (el, binding, vnode) => {
		dragDropService.handleTarget(el);
	},
};

export {ComponentDrop};