import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";

@Component({
	template: `
        <div :class="bem('statistics-sample').add('grid-container fluid').classes()">
	        <div v-for="action in statisticsSample">
		        {{ action.actionLabel }} - {{ action.blockLabel }} {{ action.timestamp }}
	        </div>
        </div>
    `,
})
export class StatisticsSample extends Vue {
	@Prop(String) readonly surveyId: string;
	@Prop(String) readonly sampleId: string;

	public mounted() {
		if (null === this.statisticsSample) {
			let request = new GetStatisticsSample();
			request.surveyId = this.surveyId;
			request.sampleId = this.sampleId;

			this.$store.dispatch(actions.LOAD_STATISTICS_SAMPLE, request).then(() => {
			});
		}
	}

	get statisticsSample(): null {
		return this.$store.getters[getters.STATISTICS_SAMPLE];
	}
}
