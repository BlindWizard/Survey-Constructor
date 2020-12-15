import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {ButtonBlockEdit} from "./ButtonBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectService} from "../../../services/SelectService";
import {ButtonBlock} from "../../controls/ButtonBlock";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {styleRenderer} from "../../../services/StyleRenderer";
import {StyleEdit} from "../../StyleEdit";
import {ActionsEdit} from "../../ActionsEdit";
import {BlockResizeFrameBackground} from "../../BlockResizeFrameBackground";

@Component({
	template: `
        <div ref="selectable" :class="bem('button-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderButtonStyle()" v-component-drag v-component-drop-target>
            <button :class="bem('button').is('primary').classes()">
                <span :class="bem('button').el('label').classes()">{{ block.getData()['text'] }}</span>
            </button>
            <ButtonBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding || isFrameMove)" :block="block" :blockStyle="block.getStyle()['style']"/>
            <ActionsEdit v-if="selected" :block="block"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
            <BlockResizeFrameBackground v-if="selected" :block="block" :mode="resizeMode" />
            <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)"  :block="block" :mode="resizeMode" />
        </div>
    `,
	components: {
		ButtonBlock,
		ButtonBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockResizeFrameBackground,
		BlockOriginalFrame,
		StyleEdit,
		ActionsEdit
	}
})
export class ButtonBlockWrapper extends BaseBlock implements Draggable {
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

	public renderButtonStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}