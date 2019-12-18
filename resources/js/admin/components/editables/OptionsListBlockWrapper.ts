import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";
import {OptionsListBlock} from "../controls/OptionsListBlock";
import {BlockEditMenu} from "../BlockEditMenu";
import {OptionsListBlockEdit} from "./OptionsListBlockEdit";
import {EditingModes} from '../../contracts/EditingModes';

@Component({
	template: `
        <div :class="bem('options-list-wrapper').classes()" v-component-drag>
            <OptionsListBlock v-if="!editing" :block="block" />
            <OptionsListBlockEdit v-if="editing" :block="block" />
            <BlockEditMenu :onEdit="toggleEdit" :mode="getMenuMode()"/>
        </div>
	`,
	components: {
		OptionsListBlock,
		OptionsListBlockEdit,
		BlockEditMenu,
	}
})
export class OptionsListBlockWrapper extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;

	private editing: boolean = false;

	public toggleEdit()
	{
		this.editing = !this.editing;
	}

	public getMenuMode()
	{
		return this.editing ? EditingModes.SAVE : EditingModes.EDIT;
	}
}