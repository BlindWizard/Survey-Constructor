import Vue, {DirectiveOptions} from 'vue'
import {componentsDragFactory} from "../services/ComponentsDragFactory";

let dragState = false;
let dragElement: Vue|null = null;
let treshhold = 0;

const ComponentDragAndDrop: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		el.onmousedown = (e: MouseEvent) => {
			if (e.which !== 1) {
				return;
			}

			dragState = true;
		};

		el.ondragstart = () => {
			return false;
		};

		document.addEventListener('mouseup', () => {
			if (null !== dragElement) {
				dragElement.$destroy();
				dragElement.$el.remove();
			}

			if (dragState) {
				dragState = false;
				dragElement = null;
				treshhold = 0;
			}
		});

		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (!dragState) {
				return;
			}

			if (null === dragElement) {
				treshhold += e.movementX + e.movementY;
				if (treshhold < 10) {
					return;
				}

				dragElement = componentsDragFactory.create('options-list');
			}
			else {
				treshhold = 0;
			}

			let el = dragElement.$el as HTMLElement;
			el.style.left = e.x + 'px';
			el.style.top = e.y + 'px';
		});
	},
};

export {ComponentDragAndDrop};