import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../../models/Survey";
import {OptionsList} from "./OptionsList";

@Component({
	template: `
		<div :class="bem('survey-block').classes()">
			<div :class="bem('survey-block').el('header').classes()">
				{{ survey.title }}
			</div>
			<OptionsList />
		</div>
	`,
	components: {
		OptionsList
	}
})
export class SurveyBlock extends Vue {
	@Prop(Survey) readonly survey: Survey;
}