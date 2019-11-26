import Vue, {DirectiveOptions} from 'vue'
import {componentsDragFactory} from "../services/ComponentsDragFactory";

let placeholder = null;
let dropTarget = null;
const ComponentDrop: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		componentsDragFactory.setTarget(el);
	},
};

export {ComponentDrop};