import Component from "vue-class-component";
import Vue from "vue";
import {SurveyCreateButton} from "./SurveyCreateButton";

@Component({
	template: `
		<div :class="bem('survey-list').add('grid-container').classes()">
			<div class="grid-x grid-margin-x">
				<SurveyCreateButton/>
			</div>
		</div>
	`,
	components: {
		SurveyCreateButton: SurveyCreateButton,
	}
})
export class SurveysList extends Vue {}