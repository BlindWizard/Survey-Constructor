import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsListBlock} from "./OptionsListBlock";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {OptionBlock} from "./OptionBlock";
import {HeaderBlock} from "./HeaderBlock";
import {TextBlock} from "./TextBlock";
import {Page} from "../../models/Page";
import {PageContract} from "../../contracts/PageContract";
import {TextFieldBlock} from "./TextFieldBlock";
import {ContainerBlock} from "./ContainerBlock";

@Component({
	template: `
        <div :class="bem('survey-block').classes()">
            <component :key="block.getId()" v-for="block in page.getBlocksInOrder()" :is="resolver.resolveComponentClass(block.getType()).name" :block="block" :resolver="resolver"/>
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
export class PageBlock extends Vue {
	@Prop(Page) readonly page: PageContract;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;
}