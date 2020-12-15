import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {OptionBlockEdit} from "./OptionBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {OptionBlock} from "../../controls/OptionBlock";
import {Draggable} from "../../../contracts/Draggable";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectService} from "../../../services/SelectService";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {styleRenderer} from "../../../services/StyleRenderer";
import {StyleEdit} from "../../StyleEdit";
import {BlockResizeFrameBackground} from "../../BlockResizeFrameBackground";

@Component({
	template: `
        <div ref="selectable" :class="bem('option-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderOptionStyle()" v-component-drag v-component-drop-target>
            <OptionBlock :block="block" :resolver="resolver"/>
            <OptionBlockEdit v-if="editing" :block="blockData" :onSave="saveData"/>
            <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding || isFrameMove)" :block="block" :blockStyle="block.getStyle()['style']"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
            <BlockResizeFrameBackground v-if="selected" :block="block" :mode="resizeMode" />
            <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)"  :block="block" :mode="resizeMode" />
        </div>
	`,
	components: {
		OptionBlock,
		OptionBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockResizeFrameBackground,
		BlockOriginalFrame,
		StyleEdit
	}
})
export class OptionBlockWrapper extends BaseBlock implements Draggable {
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

	public renderOptionStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}