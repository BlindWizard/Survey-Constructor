import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {selectService} from "../../../services/SelectService";
import {ImageBlock} from "../../controls/ImageBlock";
import {ImageBlockEdit} from "./ImageBlockEdit";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {styleRenderer} from "../../../services/StyleRenderer";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {StyleEdit} from "../../StyleEdit";

@Component({
	template: `
        <div ref="selectable" :class="bem('image-wrapper').add(this.selected ? 'selected' : '').is(!block.getData()['imageId'] ? 'no-image' : '').classes()" :style="renderImageStyle()" v-component-drag v-component-drop-target>
            <ImageBlock :block="block" :resolver="resolver" />
            <ImageBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData" />
            <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding)" :block="block" :blockStyle="block.getStyle()['style']"/>
            <BlockEditMenu v-if="selected && block.getData()['imageId']" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()" />
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
            <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)"  :block="block" :mode="resizeMode" />
        </div>
	`,
	components: {
		ImageBlock,
		ImageBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockOriginalFrame,
		StyleEdit
	}
})
export class ImageBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectService.handleElement(this);
	}

	public getResizeDirection(): string|null
	{
		if (!this.block.getData()['imageId']) {
			return null;
		}

		if (this.resizeMode !== ResizeModes.SELECT) {
			return ResizeDirection.ALL;
		}

		return null;
	}

	public renderImageStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}