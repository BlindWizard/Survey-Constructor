import {DirectiveOptions} from 'vue'

type BindingPayload = {
	label: string
	enabled: boolean
}

const ComponentDragAndDrop: DirectiveOptions = {
	bind: (el, binding) => {
		console.log(el, binding);
	},
};

export {ComponentDragAndDrop};