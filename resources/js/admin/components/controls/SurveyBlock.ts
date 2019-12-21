import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../../models/Survey";
import {OptionsListBlock} from "./OptionsListBlock";
import {OptionsListBlockWrapper} from "../editables/OptionsListBlockWrapper";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
		<div :class="bem('survey-block').classes()">
            <component :key="block.getId()" v-for="block in survey.blocks" :is="resolver.resolveComponentClass(block.getType()).name" :block="block"/>
        </div>
	`,
	components: {
		OptionsListBlock: OptionsListBlock,
		OptionsListBlockWrapper: OptionsListBlockWrapper
	}
})
export class SurveyBlock extends Vue {
	@Prop(Survey) readonly survey: Survey;
	@Prop(ComponentsResolver) readonly  resolver: ComponentsResolver;
}