import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";

@Component({
	template: `
        <div :class="bem('statistics-report').add('grid-container fluid').classes()">
            <div class="grid-x">
                <div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
                    <div :class="bem('statistics-report').el('header').classes()">
                        <label>
                            Token
                            <select v-model="tokenId" :class="bem('statistics-report').el('token-selector-element').classes()">
                                <option v-for="(tokenValue, token) in tokensSelector" :value="token">{{ tokenValue }}</option>
                            </select>
                        </label>
                    </div>
                    <div v-if="tokenStatistics">
                        <div v-for="blockStatistics in tokenStatistics.blockStatistics" :class="bem('statistics-report').el('block-statistics').classes()">
                            <div :class="bem('statistics-report').el('block-header').classes()">
                                {{ blockStatistics.blockLabel }}
                            </div>
                            <div :class="bem('statistics-report').el('block-data').classes()">
                                <div v-for="optionStatistics in blockStatistics.options" class="grid-container fluid">
                                    <div class="grid-x">
                                        <div :class="bem('statistics-report').el('block-option').add('cell small-6').classes()">
                                            {{ optionStatistics.label }}
                                        </div>
                                        <div :class="bem('statistics-report').el('block-option-count').add('cell small-6').classes()">
                                            {{ optionStatistics.count }}
                                        </div>
                                    </div>
                                    <div :class="bem('statistics-report').el('samples-list').classes()">
                                        <button v-for="sampleId in optionStatistics.samples"
                                                :class="bem('button').is('rounded').add('primary').classes()"
                                                @click="openRun(sampleId)"
                                        >
                                            {{ sampleId }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class StatisticsReport extends Vue {
	@Prop(String) readonly surveyId: string;
	private tokenId: string|null = null;

	public mounted(){
		if (null === this.surveyStatistics) {
			let request = new GetSurveyStatistics();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, request).then(() => {
				if (null !== this.surveyStatistics) {
					for (let statistics of this.surveyStatistics) {
						this.tokenId = statistics.tokenId;
						break;
					}
				}
			});
		}
		else {
			for (let statistics of this.surveyStatistics) {
				this.tokenId = statistics.tokenId;
				break;
			}
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

	public openRun(sampleId: string) {
		let request = new GetStatisticsSample();
		request.surveyId = this.surveyId;
		request.sampleId = sampleId;

		this.$store.dispatch(actions.LOAD_STATISTICS_SAMPLE, request).then(() => {
			this.$router.push({name: 'statistics-sample', params: {surveyId: this.surveyId, sampleId: sampleId}});
		});
	}
}
