import Vue, {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {actions, getters} from "../stores/types";
import {AddElement} from "../api/requests/AddElement";
import {bem} from "../../common/bem-helper";

let dragElement: Vue|null = null;
let threshold = 0;

const ComponentDrag: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		console.log(binding);
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

		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (!dragDropService.getDragState()) {
				return;
			}

			threshold += e.movementX + e.movementY;
			if (threshold < 10) {
				return;
			}

			if (binding.modifiers['create']) {
				if (null === dragElement) {
					dragElement = ComponentsFactory.create(binding.value, dragDropService.getContainer());
					dragElement.$el.classList.add(bem('draggable').classes());
					(dragElement.$el as HTMLElement).style.left = e.x + 'px';
					(dragElement.$el as HTMLElement).style.top = e.y + 'px';

					dragDropService.handleDrag(dragElement.$el as HTMLElement);
				}
			}
		});

		document.addEventListener('mouseup', () => {
			console.log(threshold);
			if (dragDropService.getDragState()) {
				dragDropService.setDragState(false);

				let $store = (vnode.context as Vue).$store;
				let request = new AddElement();
				request.surveyId = $store.getters[getters.SURVEY].id;
				request.type = binding.value;

				let drop = dragDropService.getLastTarget();
				console.log(drop);
				if (null !== drop) {
					request.position = (null !== drop.parentElement ? Array.from(drop.parentElement.children).indexOf(drop) : null);
					(vnode.context as Vue).$store.dispatch(actions.ADD_ELEMENT, request);
				}

				if (null !== dragElement) {
					dragElement.$destroy();
					dragElement = null;
				}

				threshold = 0;
			}
		});
	},
};

export {ComponentDrag};