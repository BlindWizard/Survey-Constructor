import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../models/Survey";
import {actions} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";

@Component({
	template: `
        <div :class="bem('survey-preview').add('cell large-3 medium-6').classes()" @click="openSurvey()">
            <div :class="bem('survey-preview').el('wrapper').classes()">
                <div :class="bem('survey-preview').el('inner').classes()">
                    <div>
                        {{ survey.title }}
                        <div :class="bem('survey-preview').el('statistics').classes()">
                            <p :class="bem('survey-preview').el('statistics-item').classes()">Runs: {{ survey.statistics.runsCount }}</p>
                            <p :class="bem('survey-preview').el('statistics-item').classes()">Completed: {{ survey.statistics.completesCount }}</p>
                            <p :class="bem('survey-preview').el('statistics-item').classes()">Last update: {{ survey.statistics.lastUpdated || 'Never' }}</p>
                        </div>
                    </div>
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
