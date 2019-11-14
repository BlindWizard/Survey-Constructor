import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Viewport} from "./Viewport";
import {actions, getters} from "../stores/types";
import {Survey} from "../models/Survey";

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
		this.$store.dispatch(actions.GET_SURVEY, this.surveyId);
	}

	get survey(): Survey {
		return this.$store.getters[getters.SURVEY];
	}
}