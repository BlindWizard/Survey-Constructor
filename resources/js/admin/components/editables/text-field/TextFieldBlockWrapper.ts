import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {TextFieldBlock} from "../../controls/TextFieldBlock";
import {TextFieldBlockEdit} from "./TextFieldBlockEdit";

@Component({
	template: `
        <div ref="selectable" :class="bem('text-field-wrapper').classes()" v-component-drag v-component-drop-target>
            <TextFieldBlock :block="block"/>
            <TextFieldBlockEdit v-if="editing" :block="blockData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit"  :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected && !editing"/>
        </div>
    `,
	components: {
		TextFieldBlock,
		TextFieldBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class TextFieldBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		this.bindSelecting(bem('text-field-wrapper').classes());
	}
}