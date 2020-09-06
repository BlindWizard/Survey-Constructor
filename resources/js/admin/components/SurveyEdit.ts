import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Viewport} from "./Viewport";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";
import {ComponentsMenu} from "./ComponentsMenu";
import {PageBlockWrapper} from "./editables/PageBlockWrapper";
import {ScreensPager} from "./ScreensPager";
import {PageContract} from "../contracts/PageContract";
import {SurveyContract} from "../contracts/SurveyContract";
import {Sections} from "../contracts/Sections";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="grid-y grid-padding-y medium-2 dark">
                    <ComponentsMenu v-if="!editing" />
                    <portal-target v-if="editing" name="edit-block"></portal-target>
                    <portal-target v-if="resizing" name="resize-block"></portal-target>
                    <portal-target v-if="editing && !resizing" name="actions-block"></portal-target>
                    <a v-if="token && !editing" :href="runUrl" target="_blank">
                        <button :class="bem('button').is('run').classes()">
                            <span :class="bem('button').el('label').classes()">Run Survey!</span>
                        </button>
                    </a>
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

		this.$store.dispatch(actions.SET_SECTION, Sections.EDITOR);
	}

	get survey(): SurveyContract|null {
		return this.$store.getters[getters.SURVEY];
	}

	get token(): string {
		return this.$store.getters[getters.TOKEN];
	}

	get page(): PageContract|null {
		return this.$store.getters[getters.CURRENT_PAGE];
	}

	get runUrl() {
		return '/run/' + this.surveyId + '?token=' + this.token;
	}

	get editing(): boolean {
		return this.$store.getters[getters.EDITING];
	}

	get resizing(): boolean {
		return this.$store.getters[getters.RESIZING];
	}
}