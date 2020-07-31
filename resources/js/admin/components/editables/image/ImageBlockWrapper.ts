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
import {ImageResizeEdit} from "./ImageResizeEdit";
import {styleRenderer} from "../../../services/StyleRenderer";

@Component({
	template: `
        <div ref="selectable" :class="bem('image-wrapper').is(!block.getData()['imageId'] ? 'no-image' : '').classes()" :style="renderImageStyle()" v-component-drag v-component-drop-target>
            <ImageBlock :block="block" :resolver="resolver" />
            <ImageBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData" />
            <ImageResizeEdit :block="block" :blockStyle="this.block.getStyle()['style']"/>
            <BlockEditMenu v-if="selected && block.getData()['imageId']" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()" />
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
        </div>
	`,
	components: {
		ImageBlock,
		ImageBlockEdit,
		ImageResizeEdit,
		BlockEditMenu,
		BlockResizeFrame
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