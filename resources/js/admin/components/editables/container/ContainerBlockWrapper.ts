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

@Component({
	template: `
        <div ref="selectable" :class="bem('container-wrapper').classes()" v-component-drag>
            <div :class="bem('container').classes()">
                <div class="grid-container full">
                    <div class="grid-x">
                        <div :key="slotId" v-for="slotId in block.slots" :class="'cell small-4 ' + (0 === block.getBlocksInOrder(slotId).length ? bem('container').el('slot').is('empty').classes() : '')" v-component-drop="slotId">
                            <h4 v-if="0 === block.getBlocksInOrder(slotId).length">Slot</h4>
                            <component :key="innerBlock.getId()" v-if="block.getBlocksInOrder(slotId).length > 0" v-for="innerBlock in block.getBlocksInOrder(slotId)" :is="resolver.resolveComponentClass(innerBlock.getType()).name" :block="innerBlock" :resolver="resolver"/>
                        </div>
                    </div>
                </div>
            </div>
            <ContainerBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected || editing" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected || editing"/>
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
		this.bindSelecting(bem('container-wrapper').classes());
	}
}