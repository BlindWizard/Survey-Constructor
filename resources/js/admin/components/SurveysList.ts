import Component from "vue-class-component";
import Vue from "vue";
import {SurveyCreate} from "./SurveyCreate";

@Component({
	template: `
		<div class="grid-container" :class="bem('survey-list').classes()">
			<div class="grid-x grid-margin-x">
				<SurveyCreate/>
			</div>
		</div>
	`,
	components: {
		SurveyCreate: SurveyCreate,
	}
})
export class SurveysList extends Vue {}