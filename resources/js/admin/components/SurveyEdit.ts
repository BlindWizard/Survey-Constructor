import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Viewport} from "./Viewport";
import {actions, getters} from "../stores/types";
import {Survey} from "../models/Survey";
import {GetSurvey} from "../api/requests/GetSurvey";

@Component({
	template: `
		<div :class="bem('new-surway').add('grid-container').classes()">
			<div class="grid-x grid-margin-x">
				<Viewport v-if="null !== survey">
					{{ survey.title }}
				</Viewport>
			</div>
		</div>
	`,
	components: {
		Viewport
	}
})
export class SurveyEdit extends Vue {
	@Prop(String) readonly surveyId: string;

	public mounted() {
		if (null === this.survey) {
			let request = new GetSurvey();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY, request);
		}
	}

	get survey(): Survey|null {
		return this.$store.getters[getters.SURVEY];
	}
}