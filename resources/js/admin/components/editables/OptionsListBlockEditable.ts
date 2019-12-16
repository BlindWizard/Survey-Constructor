import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";
import {OptionsListBlock} from "../controls/OptionsListBlock";
import {BlockEditMenu} from "../BlockEditMenu";
import {OptionsListBlockEdit} from "./OptionsListBlockEdit";

@Component({
	template: `
		<div :class="bem('options-list-wrapper').classes()">
			<OptionsListBlock v-if="!editing" :block="block" v-component-drag/>
			<OptionsListBlockEdit v-if="editing" :block="block"/>
			<BlockEditMenu :onEdit="toggleEdit"/>
		</div>
		
	`,
	components: {
		OptionsListBlock,
		OptionsListBlockEdit,
		BlockEditMenu,
	}
})
export class OptionsListBlockEditable extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;

	private editing: boolean = false;

	public toggleEdit()
	{
		this.editing = !this.editing;
	}
}