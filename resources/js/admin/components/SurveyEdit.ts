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

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <ComponentsMenu />
                <div class="grid-y grid-padding-y medium-8">
	                <ScreensPager/>
	                <Viewport v-if="null !== page">
	                    <PageBlockWrapper :page="page" />
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
		if (null === this.page) {
			let request = new GetSurvey();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY, request);
		}
	}

	get page(): Page|null {
		return this.$store.getters[getters.PAGE];
	}
}