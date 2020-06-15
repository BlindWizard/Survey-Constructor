import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsListBlock} from "./OptionsListBlock";
import {OptionsListBlockWrapper} from "../editables/options-list/OptionsListBlockWrapper";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {OptionBlock} from "./OptionBlock";
import {OptionBlockWrapper} from "../editables/option/OptionBlockWrapper";
import {HeaderBlockWrapper} from "../editables/header/HeaderBlockWrapper";
import {HeaderBlock} from "./HeaderBlock";
import {TextBlock} from "./TextBlock";
import {TextBlockWrapper} from "../editables/text/TextBlockWrapper";
import {Page} from "../../models/Page";
import {PageContract} from "../../contracts/PageContract";
import {TextFieldBlock} from "./TextFieldBlock";
import {TextFieldBlockWrapper} from "../editables/text-field/TextFieldBlockWrapper";
import {ContainerBlockWrapper} from "../editables/container/ContainerBlockWrapper";
import {ContainerBlock} from "./ContainerBlock";

@Component({
	template: `
        <div :class="bem('survey-block').classes()">
            <component :key="block.getId()" v-for="block in page.getBlocksInOrder()" :is="resolver.resolveComponentClass(block.getType()).name" :block="block" :resolver="resolver"/>
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
	}
})
export class PageBlock extends Vue {
	@Prop(Page) readonly page: PageContract;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;
}