import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {SurveyContract} from "../contracts/SurveyContract";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";

@Component({
	template: `
        <div :class="bem('statistics-report').classes()">
            <div>
                <select v-model="tokenId">
                    <option v-for="(tokenValue, token) in tokensSelector" :value="token">{{ tokenValue }}</option>
                </select>
            </div>
            <div v-if="tokenStatistics">
                <div v-for="blockStatistics in tokenStatistics.blockStatistics">
                    <div>{{ blockStatistics.blockLabel }}</div>
                    <div>{{ blockStatistics.valueLabel }}</div>
                    <div>{{ blockStatistics.count }}</div>
                </div>
            </div>
        </div>
    `,
})
export class StatisticsReport extends Vue {
	@Prop(String) readonly surveyId: string;
	private tokenId: string|null = null;

	public mounted() {
		if (null === this.surveyStatistics) {
			let request = new GetSurveyStatistics();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, request). then(() => {
				if (null !== this.surveyStatistics) {
					for (let statistics of this.surveyStatistics) {
						this.tokenId = statistics.tokenId;
						break;
					}
				}
			});
		}
	}

	get tokensSelector(): Object {
		if (null === this.surveyStatistics) {
			return {};
		}

		let data: Object = {};
		this.surveyStatistics.forEach((blocksStatistics: BlocksStatistics) => {
			data[blocksStatistics.tokenId] = blocksStatistics.tokenLabel;
		});

		return data;
	}

	get tokenStatistics(): BlocksStatistics|null {
		if (null === this.surveyStatistics) {
			return null;
		}

		for (let statistics of this.surveyStatistics) {
			if (statistics.tokenId === this.tokenId) {
				return statistics;
			}
		}
		return null;
	}

	get surveyStatistics(): BlocksStatistics[]|null {
		return this.$store.getters[getters.SURVEY_STATISTICS];
	}
}
