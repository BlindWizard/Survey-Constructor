import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<div class="grid-container" :class="bem('new-surway').classes()">
			<div class="grid-x grid-margin-x">
				Новый
			</div>
		</div>
	`,
})
export class SurveyEdit extends Vue {}