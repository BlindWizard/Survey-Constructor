import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../models/Survey";
import {actions} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";

@Component({
	template: `
		<div :class="bem('create-block').add('cell medium-3 small-6').classes()" @click="openSurvey()">
			<div :class="bem('create-block').el('wrapper').classes()">
				<div :class="bem('create-block').el('inner').classes()">
					{{ survey.title }}
				</div>
			</div>
		</div>
	`,
})
export class SurveyPreview extends Vue {
	@Prop(Survey) readonly survey: Survey;


	public openSurvey() {
		let request = new GetSurvey();
		request.surveyId = this.survey.id;

		this.$store.dispatch(actions.LOAD_SURVEY, request).then(() => {
			this.$router.push({name: 'survey', params: {surveyId: this.survey.id}});
		});
	}
}
