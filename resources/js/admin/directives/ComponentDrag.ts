import Vue, {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {actions, getters} from "../stores/types";
import {CreateElement} from "../api/requests/CreateElement";
import {bem} from "../../common/bem-helper";
import {ReorderElement} from "../api/requests/ReorderElement";
import {BaseBlock} from "../components/editables/BaseBlock";

let dragElement: BaseBlock|null = null;
let spawned = false;
let newElement = false;
let threshold = 0;

const ComponentDrag: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		el.onmousedown = (e: MouseEvent) => {
			if (e.which !== 1) {
				return;
			}

			if (!binding.modifiers['create']) {
				dragElement = vnode.context as BaseBlock;
				newElement = false;

				if (dragElement.draggable()) {
					dragDropService.setDragState(true);
				}
			}
			else {
				newElement = true;
				dragDropService.setDragState(true);
			}
		};

		el.ondragstart = (e: Event) => {
			if (dragDropService.getDragState()) {
				e.preventDefault();
			}
		};

		el.onmousemove = (e: MouseEvent) => {
			if (!dragDropService.getDragState()) {
				return;
			}

			threshold += Math.abs(e.movementX) + Math.abs(e.movementY);
			if (threshold < 10) {
				return;
			}

			if (newElement && !spawned) {
				dragElement = ComponentsFactory.create(binding.value, dragDropService.getContainer());
				dragElement.$el.classList.add(bem('draggable').classes());
				spawned = true;
			}

			threshold = 0;

			if (!dragElement) {
				return;
			}

			dragElement.$el.classList.add(bem('draggable').classes());
			(dragElement.$el as HTMLElement).style.left = e.x + 'px';
			(dragElement.$el as HTMLElement).style.top = e.y + 'px';

			dragDropService.handleDrag(dragElement.$el as HTMLElement);
		};

		document.addEventListener('mouseup', (e: MouseEvent) => {
			if (!dragDropService.getDragState()) {
				return;
			}

			if (!dragElement) {
				dragDropService.setDragState(false);
				return;
			}

			let position = dragDropService.getDropPosition(e);

			if (newElement) {
				if (null !== position) {
					let $store = (vnode.context as Vue).$store;

					let request = new CreateElement();
					request.surveyId = $store.getters[getters.SURVEY].id;
					request.type = dragElement.getType();
					request.position = position;

					$store.dispatch(actions.ADD_ELEMENT, request);
				}

				dragElement.$destroy();
				dragElement.$el.remove();
				dragElement = null;
				spawned = false;
			}
			else {
				if (null !== position) {
					let $store = (vnode.context as Vue).$store;

					let request = new ReorderElement();
					request.blockId = dragElement.$props.block.id;
					request.position = position;

					$store.dispatch(actions.REORDER_ELEMENT, request);
				}

				dragElement.$el.classList.remove(bem('draggable').classes());
				(dragElement.$el as HTMLElement).removeAttribute('style');

				dragElement = null;
			}

			dragDropService.setDragState(false);
			threshold = 0;
		});
	},
};

export {ComponentDrag};