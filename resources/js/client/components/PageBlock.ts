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
import {ScreensPager} from "./ScreensPager";
import {TextFieldBlock} from "../../admin/components/controls/TextFieldBlock";
import {ContainerBlock} from "../../admin/components/controls/ContainerBlock";
import {ImageBlock} from "../../admin/components/controls/ImageBlock";
import {ButtonBlock} from "../../admin/components/controls/ButtonBlock";

@Component({
	template: `
        <div :class="bem('survey-block').classes()">
            <component :key="block.getId()"
                       v-for="block in page.getBlocksInOrder()"
                       :block="block"
                       :is="resolver.resolveComponentClass(block.getType()).name"
                       :handler="resolver.resolveComponentHandler(block.getType())"
                       :resolver="resolver"
            />
            <ScreensPager />
        </div>
	`,
	components: {
		ContainerBlock,
		OptionsListBlock,
		OptionBlock,
		HeaderBlock,
		TextBlock,
		TextFieldBlock,
		ImageBlock,
		ScreensPager,
		ButtonBlock
	}
})
export class PageBlock extends Vue {
	@Prop(Page) readonly page: PageContract;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;
}