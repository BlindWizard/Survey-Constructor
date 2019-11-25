import Vue, {DirectiveOptions} from 'vue'
import {componentsDragFactory} from "../services/ComponentsDragFactory";

let dragElement: Vue|null = null;
let treshhold = 0;

const ComponentDrag: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		el.onmousedown = (e: MouseEvent) => {
			if (e.which !== 1) {
				return;
			}

			componentsDragFactory.setDragState(true);
		};

		el.ondragstart = (e: Event) => {
			if (componentsDragFactory.getDragState()) {
				e.preventDefault();
			}
		};

		document.addEventListener('selectstart', (e: Event) => {
			if (componentsDragFactory.getDragState()) {
				e.preventDefault();
			}
		});

		document.addEventListener('mouseup', () => {
			if (null !== dragElement) {
				dragElement.$destroy();
				dragElement.$el.remove();
			}

			if (componentsDragFactory.getDragState()) {
				componentsDragFactory.setDragState(false);
				dragElement = null;
				treshhold = 0;
			}
		});

		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (!componentsDragFactory.getDragState()) {
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

export {ComponentDrag};