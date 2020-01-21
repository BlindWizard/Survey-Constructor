import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {OptionBlockEdit} from "./OptionBlockEdit";
import {EditingModes} from '../../../contracts/EditingModes';
import {actions} from "../../../stores/types";
import {SaveBlockData} from "../../../api/requests/SaveBlockData";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {BaseComponent} from "../BaseComponent";
import {Option} from "../../../models/Option";
import {OptionBlock} from "../../controls/OptionBlock";

@Component({
	template: `
        <div :class="bem('option-wrapper').classes()" v-component-drag v-component-drop-target>
            <OptionBlock v-if="!editing" :block="block"/>
            <OptionBlockEdit v-if="editing" :block="blockData"/>
            <BlockEditMenu :onEdit="toggleEdit" :onSave="saveData" :onDelete="deleteElement" :mode="getMenuMode()"/>
        </div>
	`,
	components: {
		OptionBlock,
		OptionBlockEdit,
		BlockEditMenu,
	}
})
export class OptionBlockWrapper extends BaseComponent implements Draggable {
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

	public getType(): string
	{
		return this.block.getType();
	}
}