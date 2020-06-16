import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {Page} from "../../models/Page";
import {ContainerBlockWrapper} from "./container/ContainerBlockWrapper";
import {OptionsListBlockWrapper} from "./options-list/OptionsListBlockWrapper";
import {OptionBlockWrapper} from "./option/OptionBlockWrapper";
import {HeaderBlockWrapper} from "./header/HeaderBlockWrapper";
import {TextBlockWrapper} from "./text/TextBlockWrapper";
import {TextFieldBlockWrapper} from "./text-field/TextFieldBlockWrapper";

@Component({
	template: `
        <div :class="bem('survey-block').classes()" v-component-drop.default>
            <component :key="block.getId()" v-for="block in page.getBlocksInOrder()" :is="resolver.resolveComponentClass(block.getType()).name" :block="block" :resolver="resolver"/>
        </div>`,
	components: {
		ContainerBlockWrapper,
		OptionsListBlockWrapper,
		OptionBlockWrapper,
		HeaderBlockWrapper,
		TextBlockWrapper,
		TextFieldBlockWrapper,
	}
})
export class PageBlockWrapper extends Vue {
	@Prop(Page) readonly page: Page;

	get resolver(): ComponentsResolver
	{
		return (new ComponentsResolver()).setEditable();
	}
}