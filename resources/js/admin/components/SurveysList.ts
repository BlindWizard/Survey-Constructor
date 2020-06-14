import Component from "vue-class-component";
import Vue from "vue";
import {SurveyCreateButton} from "./SurveyCreateButton";
import {actions, getters} from "../stores/types";
import {Survey} from "../models/Survey";
import {SurveyPreview} from "./SurveyPreview";
import {Sections} from "../contracts/Sections";

@Component({
	template: `
        <div v-if="null !== surveys" :class="bem('survey-list').add('grid-container full').classes()">
            <div class="grid-x">
                <div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
                    <div class="grid-container full">
                        <div class="grid-x grid-margin-x">
                            <SurveyPreview :key="i" v-for="(survey, i) in surveys" :survey="survey" />
                            <SurveyCreateButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`,
	components: {
		SurveyCreateButton,
		SurveyPreview,
	}
})
export class SurveysList extends Vue {
	public mounted() {
		if (null === this.surveys) {
			this.$store.dispatch(actions.LOAD_SURVEYS);
		}

		this.$store.dispatch(actions.SET_SECTION, Sections.HOME);
	}

	get surveys(): Survey[]|null {
		return this.$store.getters[getters.SURVEYS];
	}
}