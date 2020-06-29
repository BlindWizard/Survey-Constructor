import Vue, {DirectiveOptions} from 'vue'
import {dragDropService} from "../services/DragDropService";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {actions, getters} from "../stores/types";
import {CreateElement} from "../api/requests/CreateElement";
import {bem} from "../../common/bem-helper";
import {ReorderElement} from "../api/requests/ReorderElement";
import {BaseBlock} from "../components/editables/BaseBlock";

let dragElement: BaseBlock;
let handler: HTMLElement|null = null;
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
					handler = dragElement.$el.cloneNode(true) as HTMLElement;
					handler.classList.add(bem('draggable').classes());
					dragDropService.setDragState(true);
					e.stopPropagation();
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

			threshold = 0;

			if (newElement && !spawned) {
				dragElement = ComponentsFactory.create(binding.value, dragDropService.getDragContainer());
				dragElement.toggleSelect(false);
				handler = dragElement.$el.cloneNode(true) as HTMLElement;
				handler.classList.add(bem('draggable').classes());
				spawned = true;
			}

			if (!handler) {
				return;
			}

			(dragElement.$el as HTMLElement).style.display = 'none';

			handler.style.left = e.x + 'px';
			handler.style.top = e.y + 'px';

			dragDropService.getDragContainer().appendChild(handler);
			dragDropService.handleDrag(handler as HTMLElement);
		};

		document.addEventListener('mouseup', (e: MouseEvent) => {
			if (!dragDropService.getDragState()) {
				return;
			}

			if (!handler) {
				return;
			}

			let blockId = dragDropService.getDropBlockId();
			let position = dragDropService.getDropPosition(e);

			dragDropService.setDragState(false);

			if (newElement) {
				if (null !== position) {
					let $store = (vnode.context as Vue).$store;

					let request = new CreateElement();
					request.pageId = $store.getters[getters.CURRENT_PAGE].id;
					request.type = dragElement.getType();
					request.position = position;
					request.parentBlockId = blockId;

					$store.dispatch(actions.ADD_ELEMENT, request);
				}

				dragElement.$destroy();
				dragElement.$el.remove();
				spawned = false;
			}
			else {
				let $store = (vnode.context as Vue).$store;
				let request = new ReorderElement();
				request.blockId = dragElement.$props.block.id;
				request.parentBlockId = blockId;

				if (null !== position) {
					request.position = dragElement.$props.block.parentId === request.parentBlockId && position > dragElement.$props.block.position
						? position - 1
						: position;
				}
				else {
					request.position = dragElement.$props.block.position;
				}

				dragElement.$el.classList.remove(bem('draggable').classes());
				(dragElement.$el as HTMLElement).removeAttribute('style');

				$store.dispatch(actions.REORDER_ELEMENT, request);
			}

			handler.remove();
			handler = null;
		});
	},
};

export {ComponentDrag};