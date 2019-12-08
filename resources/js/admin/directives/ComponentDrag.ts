import Vue, {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {actions, getters} from "../stores/types";
import {AddElement} from "../api/requests/AddElement";
import {bem} from "../../common/bem-helper";

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

				let $store = (vnode.context as Vue).$store;
				let request = new AddElement();
				request.surveyId = $store.getters[getters.SURVEY].id;
				request.type = binding.value;

				let drop = dragDropService.getLastTarget();

				request.position = (null !== drop && null !== drop.parentElement ? Array.from(drop.parentElement.children).indexOf(drop) : null);

				(vnode.context as Vue).$store.dispatch(actions.ADD_ELEMENT, request);

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

				dragElement = ComponentsFactory.create(binding.value, dragDropService.getContainer());
				dragElement.$el.classList.add(bem('draggable').classes());
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