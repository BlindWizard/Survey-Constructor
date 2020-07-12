import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Template} from "../models/Template";
import {actions} from "../stores/types";
import {CreateSurvey} from "../api/requests/CreateSurvey";

@Component({
	template: `
        <div :class="bem('survey-preview').add('cell large-3 medium-6').classes()" @click="createSurvey()">
            <div :class="bem('survey-preview').el('wrapper').classes()">
                <div :class="bem('survey-preview').el('inner').classes()">
                    {{ template.title }}
                </div>
            </div>
        </div>
	`,
})
export class TemplatePreview extends Vue {
	@Prop(Template) readonly template: Template;

	public createSurvey() {
		let request = new CreateSurvey();
		request.templateId = this.template.id;

		this.$store.dispatch(actions.CREATE_SURVEY, request).then((surveyId) => {
			this.$router.push({name: 'survey', params: {surveyId: surveyId}});
		});
	}
}
