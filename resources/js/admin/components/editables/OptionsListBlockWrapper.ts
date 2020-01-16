import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";
import {OptionsListBlock} from "../controls/OptionsListBlock";
import {BlockEditMenu} from "../BlockEditMenu";
import {OptionsListBlockEdit} from "./OptionsListBlockEdit";
import {EditingModes} from '../../contracts/EditingModes';
import {actions} from "../../stores/types";
import {SaveBlockData} from "../../api/requests/SaveBlockData";
import {ComponentsFactory} from "../../services/ComponentsFactory";

@Component({
	template: `
        <div :class="bem('options-list-wrapper').classes()" v-component-drag v-component-drop-target>
            <OptionsListBlock v-if="!editing" :block="block" />
            <OptionsListBlockEdit v-if="editing" :block="blockData" />
            <BlockEditMenu :onEdit="toggleEdit" :onSave="saveData" :onDelete="deleteElement" :mode="getMenuMode()"/>
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
	private blockData: OptionsList;
	private editing: boolean = false;

	public created()
	{
		this.blockData = ComponentsFactory.createElementFromData(this.block.getType(), this.block.getData());
	}

	public toggleEdit()
	{
		this.editing = !this.editing;
	}

	public saveData()
	{
		let request = new SaveBlockData();
		request.blockId = this.block.getId();
		request.data = this.blockData.getData();

		this.$store.dispatch(actions.SAVE_ELEMENT_DATA, request);
		this.toggleEdit();
	}

	public deleteElement()
	{
		this.$store.dispatch(actions.DELETE_ELEMENT, this.block.getId());
	}

	public getMenuMode(): string
	{
		return this.editing ? EditingModes.SAVE : EditingModes.EDIT;
	}
}