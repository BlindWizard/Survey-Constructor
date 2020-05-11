import Vue from 'vue';
import {Application} from './components/Application';
import {BemMixin} from "../common/vue-bem-mixin";
import VueRouter from "vue-router";
import {store} from "./stores/store";
import "../../../resources/sass/app.scss";
import {RunSettings} from "./models/RunSettings";
import {actions} from "./stores/types";

Vue.mixin(BemMixin);
Vue.use(VueRouter);

const run = (settings: RunSettings): Promise<Vue> => {
	return store.dispatch(actions.LOAD_SETTINGS, settings).then(() => {
		return new Vue({
			template: '<application/>',
			components: {
				Application
			},
			store,
		});
	});
}

export {run};
