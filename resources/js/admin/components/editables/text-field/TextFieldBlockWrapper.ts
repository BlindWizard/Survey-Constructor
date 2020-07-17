import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {TextFieldBlock} from "../../controls/TextFieldBlock";
import {TextFieldBlockEdit} from "./TextFieldBlockEdit";
import {selectService} from "../../../services/SelectService";

@Component({
	template: `
        <div ref="selectable" :class="bem('text-field-wrapper').classes()" v-component-drag v-component-drop-target>
            <TextFieldBlock :block="block"/>
            <TextFieldBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit"  :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :blockId="block.getId()"/>
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
		selectService.handleElement(this);
	}
}