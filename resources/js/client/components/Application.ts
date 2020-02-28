import Component from "vue-class-component";
import Vue from "vue";
import {PageBlock} from "./PageBlock";
import {ComponentsResolver} from "../../admin/services/ComponentsResolver";
import {PageContract} from "../../admin/contracts/PageContract";
import {getters} from "../stores/types";

@Component({
	template: `
        <PageBlock :page="page" :resolver="resolver"/>
	`,
	components: {
		PageBlock,
	}
})
export class Application extends Vue {
	get resolver(): ComponentsResolver
	{
		return new ComponentsResolver();
	}

	get page(): PageContract
	{
		return this.$store.getters[getters.CURRENT_PAGE];
	}
}
