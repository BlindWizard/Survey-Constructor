import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {SurveyBlock} from "./controls/SurveyBlock";
import {Survey} from "../models/Survey";

@Component({
	template: `
		<SurveyBlock :survey="survey" v-component-drop="bem('survey-block').el('body').classes()" />
	`,
	components: {
		SurveyBlock
	}
})
export class SurveyBlockEditable extends Vue {
	@Prop(Survey) readonly survey: Survey;
}