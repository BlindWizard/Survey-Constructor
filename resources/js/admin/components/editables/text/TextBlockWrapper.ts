import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../../models/Text";
import {BlockEditMenu} from "../../BlockEditMenu";
import {TextBlock} from "../../controls/TextBlock";
import {TextBlockEdit} from "./TextBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {SaveBlockData} from "../../../api/requests/SaveBlockData";
import {actions} from "../../../stores/types";
import {EditingModes} from "../../../contracts/EditingModes";

@Component({
	template: `
        <div :class="bem('text-wrapper').classes()" v-component-drag v-component-drop-target>
            <TextBlock v-if="!editing" :block="block"/>
            <TextBlockEdit v-if="editing" :block="blockData"/>
            <BlockEditMenu :onEdit="toggleEdit" :onSave="saveData" :onDelete="deleteElement" :mode="getMenuMode()"/>
        </div>
    `,
	components: {
		TextBlock,
		TextBlockEdit,
		BlockEditMenu,
	}
})
export class TextBlockWrapper extends BaseBlock implements Draggable {
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