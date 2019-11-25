import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../../models/Survey";

@Component({
	template: `
		<div :class="bem('survey-block').classes()">
			<div :class="bem('survey-block').el('header').classes()">
				{{ survey.title }}
			</div>
			<div class="block">Блок 1</div>
			<div class="block">Блок 2</div>
		</div>
	`,
})
export class SurveyBlock extends Vue {
	@Prop(Survey) readonly survey: Survey;
}