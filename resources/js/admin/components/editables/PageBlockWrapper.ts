import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {PageBlock} from "../controls/PageBlock";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {Page} from "../../models/Page";

@Component({
	template: `
		<PageBlock :page="page" v-component-drop.default :resolver="resolver"/>
	`,
	components: {
		PageBlock
	}
})
export class PageBlockWrapper extends Vue {
	@Prop(Page) readonly page: Page;

	get resolver(): ComponentsResolver
	{
		return (new ComponentsResolver()).setEditable();
	}
}