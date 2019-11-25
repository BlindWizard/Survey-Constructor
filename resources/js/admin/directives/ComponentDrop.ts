import Vue, {DirectiveOptions} from 'vue'
import {componentsDragFactory} from "../services/ComponentsDragFactory";

let placeholder = null;
let dropTarget = null;
const ComponentDrop: DirectiveOptions = {
	bind: (el, binding, vnode) => {
		Array.from(el.getElementsByClassName('block')).forEach((el: HTMLElement) => {
			el.addEventListener('mouseover', (e: MouseEvent) => {
				if (!componentsDragFactory.getDragState()) {
					return;
				}

				let DropTarget = e.target as HTMLElement;

				if (dropTarget !== DropTarget) {
					Array.from(el.parentElement.getElementsByClassName('placeholder')).forEach((el: HTMLElement) => {
						el.remove();
					});

					dropTarget = DropTarget;

					let placeholder = document.createElement('div');
					placeholder.classList.add('placeholder');
					placeholder.style.background = 'yellow';
					placeholder.style.height = '20px';

					if (false) {
						dropTarget.parentElement.insertBefore(placeholder, dropTarget);
					}
					else {
						dropTarget.parentElement.insertBefore(placeholder, dropTarget.nextSibling);
					}
				}
			});
		});
	},
};

export {ComponentDrop};