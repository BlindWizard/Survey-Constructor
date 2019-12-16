import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {SurveyBlock} from "../controls/SurveyBlock";
import {Survey} from "../../models/Survey";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
		<SurveyBlock :survey="survey" v-component-drop="bem('survey-block').el('body').classes()" :resolver="resolver"/>
	`,
	components: {
		SurveyBlock
	}
})
export class SurveyBlockEditable extends Vue {
	@Prop(Survey) readonly survey: Survey;

	get resolver(): ComponentsResolver
	{
		return (new ComponentsResolver()).setEditable(true);
	}
}