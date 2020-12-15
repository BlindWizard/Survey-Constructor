import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {TextFieldBlock} from "../../controls/TextFieldBlock";
import {TextFieldBlockEdit} from "./TextFieldBlockEdit";
import {selectService} from "../../../services/SelectService";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {styleRenderer} from "../../../services/StyleRenderer";
import {StyleEdit} from "../../StyleEdit";
import {BlockResizeFrameBackground} from "../../BlockResizeFrameBackground";

@Component({
	template: `
        <div ref="selectable" :class="bem('text-field-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderTextStyle()" v-component-drag v-component-drop-target>
            <TextFieldBlock :block="block" :resolver="resolver" />
            <TextFieldBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding || isFrameMove)" :block="block" :blockStyle="this.block.getStyle()['style']"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit"  :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
            <BlockResizeFrameBackground v-if="selected" :block="block" :mode="resizeMode" />
            <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)"  :block="block" :mode="resizeMode" />
        </div>
    `,
	components: {
		TextFieldBlock,
		TextFieldBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockResizeFrameBackground,
		BlockOriginalFrame,
		StyleEdit
	}
})
export class TextFieldBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectService.handleElement(this);
	}

	public getResizeDirection(): string|null
	{
		if (this.resizeMode !== ResizeModes.SELECT) {
			return ResizeDirection.ALL;
		}

		return null;
	}

	public renderTextStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}