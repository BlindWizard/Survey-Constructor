import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {selectDispatcher} from "../../../services/SelectDispatcher";
import {ImageBlock} from "../../controls/ImageBlock";
import {ImageBlockEdit} from "./ImageBlockEdit";

@Component({
	template: `
        <div ref="selectable" :class="bem('text-wrapper').classes()" v-component-drag v-component-drop-target>
            <ImageBlock :block="block"/>
            <ImageBlockEdit v-if="editing" :block="blockData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected && !editing"/>
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
		selectDispatcher.handleElement(this);
	}
}