import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {selectService} from "../../../services/SelectService";
import {ImageBlock} from "../../controls/ImageBlock";
import {ImageBlockEdit} from "./ImageBlockEdit";

@Component({
	template: `
        <div ref="selectable" :class="bem('image-wrapper').classes()" v-component-drag v-component-drop-target>
            <ImageBlock :block="block"/>
            <ImageBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :blockId="block.getId()"/>
        </div>
	`,
	components: {
		ImageBlock,
		ImageBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class ImageBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectService.handleElement(this);
	}
}