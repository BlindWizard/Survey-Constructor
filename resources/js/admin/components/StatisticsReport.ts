import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";
import {StatisticsFilter} from "./StatisticsFilter";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="grid-y grid-padding-y medium-2 dark">
                    <StatisticsFilter :tokenId="tokenId" :selectToken="selectToken" :tokens="tokensSelector" />
                </div>
                <div class="cell medium-10">
                    <div :class="bem('statistics-report').classes()">
                        <div :class="bem('statistics-report').el('header').classes()">
                           
                        </div>
                        <div v-if="tokenStatistics">
                            <div v-for="blockStatistics in tokenStatistics.blockStatistics" :class="bem('statistics-report').el('block-statistics').classes()">
                                <div :class="bem('statistics-report').el('block-header').classes()">
                                    {{ blockStatistics.blockLabel }}
                                </div>
                                <div :class="bem('statistics-report').el('block-data').classes()">
                                    <div v-for="(optionStatistics, i) in blockStatistics.options" class="grid-container full">
                                        <div class="grid-x">
                                            <div :class="bem('statistics-report').el('block-option').add('cell small-6').classes()">
                                                <span :class="bem('statistics-report').el('block-option-label').classes()" @click="toggleRunsSection(blockStatistics.blockId + '-' + i)">
                                                    {{ optionStatistics.label }} {{ (opened[blockStatistics.blockId  + '-' + i]) ? '-' : '+' }}

                                                </span>
                                            </div>
                                            <div :class="bem('statistics-report').el('block-option-count').add('cell small-6').classes()">
                                                {{ optionStatistics.count }}
                                            </div>
                                        </div>
                                        <div v-show="opened[blockStatistics.blockId + '-' + i]" :class="bem('statistics-report').el('samples-list').classes()">
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
        </div>
    `,
	components: {
		StatisticsFilter
	}
})
export class StatisticsReport extends Vue {
	@Prop(String) readonly surveyId: string;
	private tokenId: string|null = null;
	private opened: Object = {};

	public mounted() {
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

		this.$store.dispatch(actions.SET_SECTION, 'Statistics');
	}

	public selectToken(event: Event) {
		this.tokenId = (event.target as any).value;
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

	public toggleRunsSection(key: string) {
		Vue.set(this.opened, key, !this.opened[key]);
	}
}
