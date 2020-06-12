import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../models/Survey";
import {actions} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";

@Component({
	template: `
        <div :class="bem('survey-preview').add('cell large-3 medium-6').classes()" v-on:click.stop="openSurvey()">
            <div :class="bem('survey-preview').el('wrapper').classes()">
                <div :class="bem('survey-preview').el('inner').classes()">
                    <div>
                        <h4>{{ survey.title }}</h4>
                        <div :class="bem('survey-preview').el('statistics').classes()">
                            <p :class="bem('survey-preview').el('statistics-item').classes()">Runs: {{ survey.statistics.runsCount }}</p>
                            <p :class="bem('survey-preview').el('statistics-item').classes()">Completed: {{ survey.statistics.completesCount }}</p>
                            <p :class="bem('survey-preview').el('statistics-item').classes()">Last update: {{ survey.statistics.lastUpdated || 'Never' }}</p>
                            <p>
                                <button :class="bem('button').is('rounded').classes()" v-on:click.stop="openStats()">
                                    <span :class="bem('button').el('label').classes()">Statistics</span>
                                </button>
                            </p>
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

	public openStats() {
		let request = new GetSurveyStatistics();
		request.surveyId = this.survey.id;

		this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, request).then(() => {
			this.$router.push({name: 'survey-statistics', params: {surveyId: this.survey.id}});
		});
	}
}
