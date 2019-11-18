import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<ul :class="bem('survey-edit-menu').add('medium-2 vertical menu').classes()">
			<li :class="bem('survey-edit-menu').el('item').classes()">
				<a :class="bem('survey-edit-menu').el('link').classes()">Radio List</a>
			</li>
		</ul>
	`,
})
export class SurveyEditMenu extends Vue {}
