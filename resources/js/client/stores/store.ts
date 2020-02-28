import Vue from "vue";
import Vuex from 'vuex';
import {getters} from "./types";
import {PageContract} from "../../admin/contracts/PageContract";
import {Page} from "../../admin/models/Page";

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		pageId: null as any,
		pages: null as any,
	},
	getters: {
		[getters.CURRENT_PAGE](): PageContract {
			return new Page();
		},
	}
});

export {store};