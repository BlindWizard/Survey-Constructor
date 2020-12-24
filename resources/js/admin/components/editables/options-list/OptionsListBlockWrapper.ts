import Component from "vue-class-component";
import {OptionsListBlock} from "../../controls/OptionsListBlock";
import {BlockEditMenu} from "../../BlockEditMenu";
import {OptionsListBlockEdit} from "./OptionsListBlockEdit";
import {BaseBlock} from "../BaseBlock";
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
        <div ref="selectable" :class="bem('options-list-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderOptionsListStyle()" v-component-drag v-component-drop-target>
            <OptionsListBlock :block="block" :resolver="resolver"/>
            <OptionsListBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding || isFrameMove)" :block="block" :blockStyle="block.getStyle()['style']"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" :parentElement="$el.parentElement"/>
            <BlockResizeFrameBackground v-if="selected" :block="block" :mode="resizeMode" :parentElement="$el.parentElement"/>
            <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)"  :block="block" :mode="resizeMode" />
        </div>
	`,
	components: {
		OptionsListBlock,
		OptionsListBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockResizeFrameBackground,
		BlockOriginalFrame,
		StyleEdit
	}
})
export class OptionsListBlockWrapper extends BaseBlock implements Draggable {
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

	public renderOptionsListStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}