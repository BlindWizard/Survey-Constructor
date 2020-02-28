import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Viewport} from "./Viewport";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";
import {ComponentsMenu} from "./ComponentsMenu";
import {PageBlockWrapper} from "./editables/PageBlockWrapper";
import {ScreensPager} from "./ScreensPager";
import {Page} from "../models/Page";
import {Survey} from "../models/Survey";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="grid-y grid-padding-y medium-2">
                    <ComponentsMenu/>
                    <a :href="'/run/' + surveyId"><button class="button rounded">Run</button></a>
                </div>
                <div v-if="null !== survey" class="grid-y grid-padding-y medium-10">
                    <ScreensPager/>
                    <Viewport>
                        <PageBlockWrapper v-if="null !== page" :page="page"/>
                    </Viewport>
                </div>
            </div>
        </div>
	`,
	components: {
		Viewport,
		ComponentsMenu,
		PageBlockWrapper,
		ScreensPager
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

	get page(): Page|null {
		return this.$store.getters[getters.CURRENT_PAGE];
	}
}