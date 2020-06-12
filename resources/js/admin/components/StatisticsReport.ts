import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {GetSurveyStatistics} from "../api/requests/GetSurveyStatistics";
import {BlocksStatistics} from "../models/BlocksStatistics";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";
import {StatisticsFilter} from "./StatisticsFilter";
import {OptionStatistics} from "../models/OptionStatistics";
import {BlockStatistics} from "../models/BlockStatistics";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="grid-y grid-padding-y medium-2 dark">
                    <StatisticsFilter :tokenId="tokenId"
                                      :selectToken="selectToken"
                                      :tokens="tokensSelector"
                                      :dateFrom="dateFrom"
                                      :dateTo="dateTo"
                                      :selectDateFrom="selectDateFrom"
                                      :selectDateTo="selectDateTo"
                                      :options="filterOptions"
                                      :removeFilterOption="removeFilterOption"
                    />
                </div>
                <div class="cell medium-10">
                    <div :class="bem('statistics-report').classes()">
                        <div v-if="tokenStatistics">
                            <div v-for="blockStatistics in tokenStatistics.blockStatistics" :class="bem('statistics-report').el('block-statistics').classes()">
                                <div :class="bem('statistics-report').el('block-header').classes()">
                                    {{ blockStatistics.blockLabel }}
                                </div>
                                <div :class="bem('statistics-report').el('block-data').classes()">
                                    <div v-for="(optionStatistics, i) in blockStatistics.options" class="grid-container full">
                                        <div class="grid-x">
                                            <div :class="bem('statistics-report').el('block-option').add('cell small-6').classes()">
                                                <div>
                                                    {{ optionStatistics.label }} 
                                                    <span :class="bem('statistics-report').el('block-option-filter').is(isActiveFilterOption(blockStatistics, optionStatistics) ? 'active' : '').add('fi-filter').classes()"
                                                          @click="addFilterOption(blockStatistics, optionStatistics)">
                                                    </span>
                                                </div>
                                            </div>
                                            <div :class="bem('statistics-report').el('block-option-count').add('cell small-6').classes()">
                                                {{ optionStatistics.count }}
                                            </div>
                                        </div>
                                        <div v-show="spoilers[blockStatistics.blockId + '-' + i]" :class="bem('statistics-report').el('samples-list').classes()">
                                            <button v-for="sampleId in optionStatistics.samples"
                                                    :class="bem('button').is('rounded').add('primary').classes()"
                                                    @click="openRun(sampleId)"
                                            >
                                                {{ sampleId }}
                                            </button>
                                        </div>
                                        <span :class="bem('statistics-report').el('block-option-label').classes()" @click="toggleRunsSection(blockStatistics.blockId + '-' + i)">
                                            {{ (spoilers[blockStatistics.blockId + '-' + i]) ? 'Hide' : 'Show samples' }}
                                        </span>
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
	private dateFrom: string|null = null;
	private dateTo: string|null = null;
	private filterOptions: Object = {};

	private spoilers: Object = {};

	public mounted() {
		if (null === this.surveyStatistics) {
			this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, this.request).then(() => {
				if (null !== this.surveyStatistics) {
					for (let statistics of this.surveyStatistics) {
						this.tokenId = statistics.tokenId;
						this.dateFrom = statistics.startDate;
						this.dateTo = statistics.lastDate;
						break;
					}
				}
			});
		}
		else {
			for (let statistics of this.surveyStatistics) {
				this.tokenId = statistics.tokenId;
				this.dateFrom = statistics.startDate;
				this.dateTo = statistics.lastDate;
				break;
			}
		}

		this.$store.dispatch(actions.SET_SECTION, 'Statistics');
	}

	public selectToken(event: Event) {
		this.tokenId = (event.target as any).value;
	}

	public selectDateFrom(event: Event) {
		this.dateFrom = (event.target as HTMLInputElement).value;

		this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, this.request);
	}

	public selectDateTo(event: Event) {
		this.dateTo = (event.target as HTMLInputElement).value;

		this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, this.request);
	}

	public isActiveFilterOption(blockStatistics: BlockStatistics, optionStatistics: OptionStatistics): boolean {
		if (!this.filterOptions[blockStatistics.blockId]) {
			return false;
		}

		if (!this.filterOptions[blockStatistics.blockId][optionStatistics.optionId]) {
			return false;
		}

		return true;
	}

	public addFilterOption(blockStatistics: BlockStatistics, optionStatistics: OptionStatistics) {
		let items = {};
		if (this.filterOptions[blockStatistics.blockId]) {
			items = this.filterOptions[blockStatistics.blockId];
		}

		items[optionStatistics.optionId] = {'block': blockStatistics, 'option': optionStatistics};

		Vue.set(this.filterOptions, blockStatistics.blockId, items);

		this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, this.request);
	}

	public removeFilterOption(blockStatistics: BlockStatistics, optionStatistics: OptionStatistics) {
		let items = {};
		if (this.filterOptions[blockStatistics.blockId]) {
			items = this.filterOptions[blockStatistics.blockId];
		}

		delete items[optionStatistics.optionId];

		if (Object.keys(items).length > 0) {
			Vue.set(this.filterOptions, blockStatistics.blockId, items);
		}
		else {
			Vue.delete(this.filterOptions, blockStatistics.blockId);
		}

		this.$store.dispatch(actions.LOAD_SURVEY_STATISTICS, this.request);
	}

	public toggleRunsSection(key: string) {
		Vue.set(this.spoilers, key, !this.spoilers[key]);
	}

	get request(): GetSurveyStatistics {
		let filterOptions = {};
		for (let blockId of Object.keys(this.filterOptions)) {
			filterOptions[blockId] = [];
			for (let optionId of Object.keys(this.filterOptions[blockId])) {
				filterOptions[blockId].push(optionId);
			}
		}

		let request = new GetSurveyStatistics();
		request.surveyId = this.surveyId;
		request.dateFrom = this.dateFrom;
		request.dateTo = this.dateTo;
		request.options = filterOptions;

		return request;
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
