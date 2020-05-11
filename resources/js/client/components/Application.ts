import Component from "vue-class-component";
import Vue from "vue";
import {PageBlock} from "./PageBlock";
import {ComponentsResolver} from "../../admin/services/ComponentsResolver";
import {PageContract} from "../../admin/contracts/PageContract";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../../admin/api/requests/GetSurvey";

@Component({
	template: `
        <div>
            <PageBlock v-if="null !== page" :page="page" :resolver="resolver" />
        </div>
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

	public mounted() {
		if (null === this.page) {
			this.$store.dispatch(actions.LOAD_SURVEY);
		}
	}

	get page(): PageContract|null
	{
		return this.$store.getters[getters.CURRENT_PAGE];
	}
}
