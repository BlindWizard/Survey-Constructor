import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {SurveyContract} from "../contracts/SurveyContract";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";

@Component({
	template: `
        <div :class="bem('components-menu').classes()">
        </div>
    `,
})
export class StatisticsReport extends Vue {
	@Prop(String) readonly surveyId: string;

	public mounted() {
		if (null === this.surveyStatistics) {
			let request = new GetSurveyStatistics();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, request);
		}
	}

	get surveyStatistics(): SurveyContract|null {
		return this.$store.getters[getters.SURVEY];
	}
}
