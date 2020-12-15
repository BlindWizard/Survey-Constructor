import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {ContainerBlock} from "../../controls/ContainerBlock";
import {ContainerBlockEdit} from "./ContainerBlockEdit";
import {Prop} from "vue-property-decorator";
import {ComponentsResolver} from "../../../services/ComponentsResolver";
import {OptionsListBlock} from "../../controls/OptionsListBlock";
import {OptionsListBlockWrapper} from "../options-list/OptionsListBlockWrapper";
import {OptionBlock} from "../../controls/OptionBlock";
import {OptionBlockWrapper} from "../option/OptionBlockWrapper";
import {HeaderBlock} from "../../controls/HeaderBlock";
import {HeaderBlockWrapper} from "../header/HeaderBlockWrapper";
import {TextBlock} from "../../controls/TextBlock";
import {TextBlockWrapper} from "../text/TextBlockWrapper";
import {TextFieldBlock} from "../../controls/TextFieldBlock";
import {TextFieldBlockWrapper} from "../text-field/TextFieldBlockWrapper";
import {Container} from "../../../models/Container";
import {selectService} from "../../../services/SelectService";
import {ImageBlock} from "../../controls/ImageBlock";
import {ImageBlockWrapper} from "../image/ImageBlockWrapper";
import {ResizeModes} from "../../../contracts/ResizeModes";
import {ResizeDirection} from "../../../contracts/ResizeDirection";
import {styleRenderer} from "../../../services/StyleRenderer";
import {DelimiterBlock} from "../../controls/DelimiterBlock";
import {DelimiterBlockWrapper} from "../delimiter/DelimiterBlockWrapper";
import {ButtonBlockWrapper} from "../button/ButtonBlockWrapper";
import {ButtonBlock} from "../../controls/ButtonBlock";
import {BlockOriginalFrame} from "../../BlockOriginalFrame";
import {StyleEdit} from "../../StyleEdit";
import {BlockResizeFrameBackground} from "../../BlockResizeFrameBackground";

@Component({
	template: `
        <div ref="selectable" :class="bem('container-wrapper').add(this.selected ? 'selected' : '').classes()" :style="renderContainerStyle()" v-component-drag v-component-drop-target>
            <div :class="bem('container').classes()">
                <div class="grid-container full">
                    <div class="grid-x">
                        <div :key="slotId" v-for="slotId in block.slots" 
                             :class="'cell ' + bem('container').el('slot').is(0 === block.getBlocksInOrder(slotId).length ? 'empty' : '').classes()" 
                             :style="renderSlotStyle(slotId)"
                             v-component-drop="slotId"
                        >
                            <component :key="innerBlock.getId()" v-if="block.getBlocksInOrder(slotId).length > 0" v-for="innerBlock in block.getBlocksInOrder(slotId)" :is="resolver.resolveComponentClass(innerBlock.getType()).name" :block="innerBlock" :resolver="resolver" />
                            <BlockResizeFrame v-if="selected && isFrameResize" :block="block" :slotId="slotId" :mode="resizeMode" :direction="getSlotResizeDirection(slotId)" />
                        </div>
                    </div>
                </div>
            </div>
            <ContainerBlockEdit v-if="editing" :block="block" :onUpdate="changeData" :onSave="saveData" />
            <StyleEdit v-if="editing && !isFrameResize && (isFrameMargin || isFramePadding || isFrameMove)" :block="block" :blockStyle="block.getStyle()['style']" />
            <BlockEditMenu v-if="selected || editing" :onSelectMode="selectFrameMode" :onDelete="deleteElement" :mode="getMenuMode()" />
            <BlockResizeFrame v-if="selected && !isFrameResize" :block="block" :mode="resizeMode" :direction="getResizeDirection()" />
            <BlockResizeFrameBackground v-if="selected && !isFrameResize" :block="block" :mode="resizeMode" />
            <BlockOriginalFrame v-if="selected && !isFrameResize && (isFrameMargin || isFramePadding || isFrameMove)" :block="block" :mode="resizeMode" />
        </div>
	`,
	components: {
		ContainerBlock,
		ContainerBlockWrapper,
		OptionsListBlock,
		OptionsListBlockWrapper,
		OptionBlock,
		OptionBlockWrapper,
		HeaderBlock,
		HeaderBlockWrapper,
		TextBlock,
		TextBlockWrapper,
		TextFieldBlock,
		TextFieldBlockWrapper,
		ImageBlock,
		ImageBlockWrapper,
		ButtonBlock,
		ButtonBlockWrapper,
		ContainerBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
		BlockResizeFrameBackground,
		DelimiterBlock,
		DelimiterBlockWrapper,
		BlockOriginalFrame,
		StyleEdit,
	}
})
export class ContainerBlockWrapper extends BaseBlock implements Draggable {
	public name: string = 'ContainerBlockWrapper';

	@Prop(Container) readonly block: Container;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

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

	public getSlotResizeDirection(slotId: string): string|null
	{
		if (this.resizeMode !== ResizeModes.RESIZE) {
			return ResizeDirection.ALL;
		}

		if (this.block.slots.indexOf(slotId) !== 0) {
			return ResizeDirection.LEFT;
		}

		return null;
	}

	public renderContainerStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}

	public renderSlotStyle(slotId: string): string
	{
		let style = this.block.getStyle()['slotsStyle'][slotId] || null;
		if (!style) {
			return '';
		}

		return styleRenderer.render(style);
	}
}