import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Prop} from "vue-property-decorator";
import {GetStatisticsSample} from "../api/requests/GetStatisticsSample";
import {Sections} from "../contracts/Sections";
import {SectionsFactory} from "../services/SectionsFactory";

@Component({
	template: `
        <div :class="bem('statistics-sample').add('grid-container fluid').classes()">
            <div class="grid-x grid-padding-x">
                <div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
                    <h4>Sample {{ sampleId }}</h4>
                    <div :class="bem('statistics-sample').el('item').classes()" v-for="(action, i) in statisticsSample">
                        <div :class="bem('statistics-sample').el('timeline').classes()">
                            <div :class="bem('statistics-sample').el('counter').classes()">{{ i }}</div>
                            <div :class="bem('statistics-sample').el('timestamp').classes()">{{ action.timestamp }}</div>
                        </div><!--
                     --><div :class="bem('statistics-sample').el('data').classes()">
                            <div :class="bem('statistics-sample').el('action').classes()">{{ action.actionLabel }}</div>
                            <div :class="bem('statistics-sample').el('block').classes()">{{ action.blockLabel }}</div>
                        </div>
                    </div>
                </div>
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

			this.$store.dispatch(actions.LOAD_STATISTICS_SAMPLE, request);
		}

		this.$store.dispatch(actions.SET_SECTION, SectionsFactory.get(Sections.STATISTICS_SAMPLE));
	}

	get statisticsSample(): null {
		return this.$store.getters[getters.STATISTICS_SAMPLE];
	}
}
