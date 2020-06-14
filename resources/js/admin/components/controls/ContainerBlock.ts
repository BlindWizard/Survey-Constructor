import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Container} from "../../models/Container";
import {BlockContract} from "../../contracts/BlockContract";

@Component({
	template: `
        <div :class="bem('container').classes()">
            <div class="grid-container full">
                <div class="grid-x">
                    <div :key="slotNumber" v-for="slotNumber in block.slotsCount" class="cell small-6" v-component-drop="block.getId()">
                        <component :key="block.getId()" v-if="null !== getBlockForSlot(slotNumber)" :is="resolver.resolveComponentClass(getBlockForSlot(slotNumber).getType()).name" :block="getBlockForSlot(slotNumber)" />
                    </div>
                </div>
            </div>
        </div>
	`,
})
export class ContainerBlock extends Vue {
	@Prop(Container) readonly block: Container;
	@Prop(Function) readonly handler: Function|null;

	private handle(event: Event) {
		if (!this.handler) {
			return;
		}

		this.handler(this, event);
	}

	public getBlockForSlot(slotNumber: number): BlockContract|null
	{
		return this.block.getBlocksInOrder()[slotNumber] || null;
	}
}