import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<div :class="bem('viewport').add('cell').classes()">
			<slot></slot>
		</div>
	`,
})
export class Viewport extends Vue {}
