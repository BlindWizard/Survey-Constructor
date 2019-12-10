import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Survey} from "../../models/Survey";
import {OptionsListBlock} from "./OptionsListBlock";
import {BlockContract} from "../../contracts/BlockContract";
import {BlockTypes} from "../../contracts/BlockTypes";

@Component({
	template: `
		<div :class="bem('survey-block').classes()">
			<div :class="bem('survey-block').el('header').classes()">
				{{ survey.title }}
			</div>
			<div :class="bem('survey-block').el('body').classes()">
				<component :key="block.getPosition()" v-for="block in survey.blocks" :is="resolveComponent(block)" :block="block"/>
			</div>
		</div>
	`,
	components: {
		OptionsListBlock: OptionsListBlock
	}
})
export class SurveyBlock extends Vue {
	@Prop(Survey) readonly survey: Survey;

	public resolveComponent(block: BlockContract): string
	{
		switch (block.getType()) {
			case BlockTypes.OPTIONS_LIST:
				return 'OptionsListBlock';
			default:
				throw new Error('Undefined block type');
		}
	}
}