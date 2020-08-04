import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {HeaderBlockEdit} from "./HeaderBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {HeaderBlock} from "../../controls/HeaderBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectService} from "../../../services/SelectService";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {StyleEdit} from "../../StyleEdit";
import {styleRenderer} from "../../../services/StyleRenderer";

@Component({
	template: `
        <div ref="selectable" :class="bem('header-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderHeaderStyle()" v-component-drag v-component-drop-target>
        <HeaderBlock :block="block" :resolver="resolver" />
        <HeaderBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData" />
        <StyleEdit v-if="editing && (isFrameResize || isFrameMargin || isFramePadding)" :block="block" :blockStyle="block.getStyle()['style']" />
        <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()" />
        <BlockResizeFrame v-if="selected" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
        <BlockOriginalFrame v-if="selected && (isFrameMargin || isFramePadding)" :block="block" :mode="resizeMode" />
        </div>
	`,
	components: {
		HeaderBlock,
		HeaderBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockOriginalFrame,
		StyleEdit
	}
})
export class HeaderBlockWrapper extends BaseBlock implements Draggable {
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

	public renderHeaderStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}