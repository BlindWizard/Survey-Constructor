import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Container} from "../../models/Container";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {OptionsListBlock} from "./OptionsListBlock";
import {OptionBlock} from "./OptionBlock";
import {HeaderBlock} from "./HeaderBlock";
import {TextBlock} from "./TextBlock";
import {TextFieldBlock} from "./TextFieldBlock";
import {styleRenderer} from "../../services/StyleRenderer";

@Component({
	template: `
        <div :class="bem('container').classes()">
            <div class="grid-container full">
                <div class="grid-x">
                    <div :key="slotId" v-for="slotId in block.slots" class="cell" :style="renderSlotStyle(slotId)">
                        <component :key="innerBlock.getId()" v-if="block.getBlocksInOrder(slotId).length > 0" v-for="innerBlock in block.getBlocksInOrder(slotId)" :is="resolver.resolveComponentClass(innerBlock.getType()).name" :block="innerBlock" :resolver="resolver"/>
                    </div>
                </div>
            </div>
        </div>
	`,
	components: {
		ContainerBlock,
		OptionsListBlock,
		OptionBlock,
		HeaderBlock,
		TextBlock,
		TextFieldBlock,
	}
})
export class ContainerBlock extends Vue {
	public name: string = 'ContainerBlock';

	@Prop(Container) readonly block: Container;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;
	@Prop(Function) readonly handler: Function|null;

	public renderSlotStyle(slotId: string)
	{
		return styleRenderer.render(this.block.getStyle()['slotsStyle'][slotId]);
	}
}