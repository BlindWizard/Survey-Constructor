import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {TextBlock} from "../../controls/TextBlock";
import {TextBlockEdit} from "./TextBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectService} from "../../../services/SelectService";

@Component({
	template: `
        <div ref="selectable" :class="bem('text-wrapper').classes()" v-component-drag v-component-drop-target>
            <TextBlock :block="block"/>
            <TextBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :blockId="block.getId()"/>
        </div>
    `,
	components: {
		TextBlock,
		TextBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class TextBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectService.handleElement(this);
	}
}