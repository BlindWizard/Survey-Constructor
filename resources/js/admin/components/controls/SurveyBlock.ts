import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../../models/Survey";
import {OptionsListBlock} from "./OptionsListBlock";
import {OptionsListBlockWrapper} from "../editables/options-list/OptionsListBlockWrapper";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {OptionBlock} from "./OptionBlock";
import {OptionBlockWrapper} from "../editables/option/OptionBlockWrapper";
import {HeaderBlockWrapper} from "../editables/header/HeaderBlockWrapper";
import {HeaderBlock} from "./HeaderBlock";
import {TextBlock} from "./TextBlock";
import {TextBlockWrapper} from "../editables/text/TextBlockWrapper";

@Component({
	template: `
        <div :class="bem('survey-block').classes()">
            <component :key="block.getId()" v-for="block in survey.blocks" :is="resolver.resolveComponentClass(block.getType()).name" :block="block" />
        </div>
	`,
	components: {
		OptionsListBlock,
		OptionsListBlockWrapper,
		OptionBlock,
		OptionBlockWrapper,
		HeaderBlock,
		HeaderBlockWrapper,
		TextBlock,
		TextBlockWrapper,
	}
})
export class SurveyBlock extends Vue {
	@Prop(Survey) readonly survey: Survey;
	@Prop(ComponentsResolver) readonly  resolver: ComponentsResolver;
}