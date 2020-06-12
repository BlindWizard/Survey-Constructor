import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {OptionBlockEdit} from "./OptionBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {OptionBlock} from "../../controls/OptionBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";

@Component({
	template: `
        <div ref="selectable" :class="bem('option-wrapper').classes()" v-component-drag v-component-drop-target>
            <OptionBlock :block="block"/>
            <OptionBlockEdit v-if="editing" :block="blockData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected && !editing"/>
        </div>
	`,
	components: {
		OptionBlock,
		OptionBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class OptionBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		this.bindSelecting(bem('option-wrapper').classes());
	}
}