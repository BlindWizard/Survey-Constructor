import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsListBlock} from "../../admin/components/controls/OptionsListBlock";
import {OptionBlock} from "../../admin/components/controls/OptionBlock";
import {HeaderBlock} from "../../admin/components/controls/HeaderBlock";
import {TextBlock} from "../../admin/components/controls/TextBlock";
import {Page} from "../../admin/models/Page";
import {PageContract} from "../../admin/contracts/PageContract";
import {ComponentsResolver} from "../../admin/services/ComponentsResolver";

@Component({
	template: `
        <div :class="bem('survey-block').classes()">
            <component :key="block.getId()" v-for="block in page.getBlocksInOrder()" :is="resolver.resolveComponentClass(block.getType()).name" :block="block" />
        </div>
	`,
	components: {
		OptionsListBlock,
		OptionBlock,
		HeaderBlock,
		TextBlock,
	}
})
export class PageBlock extends Vue {
	@Prop(Page) readonly page: PageContract;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;
}