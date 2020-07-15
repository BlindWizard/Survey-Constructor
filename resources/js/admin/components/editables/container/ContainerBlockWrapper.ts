import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
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

@Component({
	template: `
        <div ref="selectable" :class="bem('container-wrapper').add(this.selected ? 'selected' : '').classes()" v-component-drag v-component-drop-target>
            <div :class="bem('container').classes()">
                <div class="grid-container full">
                    <div class="grid-x">
                        <div :key="slotId" v-for="slotId in block.slots" :class="'cell small-' + (12 / block.slots.length) + ' '+ bem('container').el('slot').is(0 === block.getBlocksInOrder(slotId).length ? 'empty' : '').classes()" v-component-drop="slotId">
                            <component :key="innerBlock.getId()" v-if="block.getBlocksInOrder(slotId).length > 0" v-for="innerBlock in block.getBlocksInOrder(slotId)" :is="resolver.resolveComponentClass(innerBlock.getType()).name" :block="innerBlock" :resolver="resolver" />
                            <BlockResizeFrame v-if="selected && isFrameResize" :mode="resizeMode" :direction="getSlotResizeDirection(slotId)" />
                        </div>
                    </div>
                </div>
            </div>
            <ContainerBlockEdit v-if="editing" :block="block" :onUpdate="changeData" :onSave="saveData" />
            <BlockEditMenu v-if="selected || editing" :onSelectMode="selectFrameMode" :onDelete="deleteElement" :mode="getMenuMode()" />
            <BlockResizeFrame v-if="selected && !isFrameResize" :mode="resizeMode" />
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
		ContainerBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
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

	public getSlotResizeDirection(slotId: string): string
	{
		if (this.resizeMode !== ResizeModes.RESIZE) {
			return ResizeDirection.ALL;
		}

		if (this.block.slots.indexOf(slotId) === this.block.slots.length - 1) {
			return ResizeDirection.LEFT;
		}
		else {
			return ResizeDirection.RIGHT
		}
	}
}