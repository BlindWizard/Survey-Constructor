import Component from "vue-class-component";
import Vue from "vue";
import {SurveyCreateButton} from "./SurveyCreateButton";
import {actions, getters} from "../stores/types";
import {Survey} from "../models/Survey";
import {SurveyPreview} from "./SurveyPreview";

@Component({
	template: `
		<div  v-if="null !== surveys" :class="bem('survey-list').add('grid-container').classes()">
			<div class="grid-x grid-margin-x">
				<SurveyPreview :key="i" v-for="(survey, i) in surveys" :survey="survey"/>
				<SurveyCreateButton/>
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
	}

	get surveys(): Survey[]|null {
		return this.$store.getters[getters.SURVEYS];
	}
}