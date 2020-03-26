import Component from "vue-class-component";
import Vue from "vue";
import {PageBlock} from "./PageBlock";
import {ComponentsResolver} from "../../admin/services/ComponentsResolver";
import {PageContract} from "../../admin/contracts/PageContract";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../../admin/api/requests/GetSurvey";

@Component({
	template: `
        <PageBlock v-if="null !== page" :page="page" :resolver="resolver"/>
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
			let request = new GetSurvey();
			request.surveyId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

			this.$store.dispatch(actions.LOAD_SURVEY, request);
		}
	}

	get page(): PageContract|null
	{
		return this.$store.getters[getters.CURRENT_PAGE];
	}
}
