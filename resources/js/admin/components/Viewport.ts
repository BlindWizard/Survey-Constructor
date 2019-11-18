import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<div :class="bem('viewport').add('cell medium-8').classes()">
			<div class="cell">
				<slot/>
			</div>
		</div>
	`,
})
export class Viewport extends Vue {}
