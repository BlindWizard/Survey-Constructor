import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {ButtonBlockEdit} from "./ButtonBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectService} from "../../../services/SelectService";
import {ButtonBlock} from "../../controls/ButtonBlock";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {styleRenderer} from "../../../services/StyleRenderer";
import {StyleEdit} from "../../StyleEdit";

@Component({
	template: `
        <div ref="selectable" :class="bem('button-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderButtonStyle()" v-component-drag v-component-drop-target>
            <ButtonBlock :block="block" :resolver="resolver"/>
            <ButtonBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding)" :block="block" :blockStyle="this.block.getStyle()['style']"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
            <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)"  :block="block" :mode="resizeMode" />
        </div>
    `,
	components: {
		ButtonBlock,
		ButtonBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockOriginalFrame,
		StyleEdit
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