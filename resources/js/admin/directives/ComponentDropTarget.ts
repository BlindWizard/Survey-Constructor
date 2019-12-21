import {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";

const ComponentDropTarget: DirectiveOptions = {
	inserted: (el, binding, vnode) => {
		dragDropService.handleDropTarget(el);
	},
};

export {ComponentDropTarget};