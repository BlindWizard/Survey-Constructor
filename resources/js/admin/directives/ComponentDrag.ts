import Vue, {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";
import {ComponentsFactory} from "../services/ComponentsFactory";

let dragElement: Vue|null = null;
let treshhold = 0;

const ComponentDrag: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		el.onmousedown = (e: MouseEvent) => {
			if (e.which !== 1) {
				return;
			}

			dragDropService.setDragState(true);
		};

		el.ondragstart = (e: Event) => {
			if (dragDropService.getDragState()) {
				e.preventDefault();
			}
		};

		document.addEventListener('selectstart', (e: Event) => {
			if (dragDropService.getDragState()) {
				e.preventDefault();
			}
		});

		document.addEventListener('mouseup', () => {
			if (dragDropService.getDragState()) {
				dragDropService.setDragState(false);

				console.log(dragDropService.getLastTarget());
				if (null !== dragElement) {
					dragElement.$destroy();
					dragElement = null;
				}

				treshhold = 0;
			}
		});

		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (!dragDropService.getDragState()) {
				return;
			}

			if (null === dragElement) {
				treshhold += e.movementX + e.movementY;
				if (treshhold < 10) {
					return;
				}

				dragElement = ComponentsFactory.create('options-list', dragDropService.getContainer());
				(dragElement.$el as HTMLElement).style.left = e.x + 'px';
				(dragElement.$el as HTMLElement).style.top = e.y + 'px';
			}
			else {
				treshhold = 0;
			}

			dragDropService.handleDrag(dragElement.$el as HTMLElement);
		});
	},
};

export {ComponentDrag};