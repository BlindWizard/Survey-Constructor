import Vue from 'vue';
import {Application} from './components/Application';
import {store} from "./stores/store";
import {actions} from "./stores/types";
import {errorHandler} from "./handlers";
import {settings} from "./settings";
import {BemMixin} from "../common/vue-bem-mixin";
import VueRouter from "vue-router";
import {routes} from "./routes";
import {axios} from "../common/axios";

Vue.mixin(BemMixin);
Vue.use(VueRouter);

window.onerror = errorHandler;
axios.interceptors.response.use(
	response => response,
	(error: any) => {
		if (errorHandler) {
			errorHandler(error);
		}
		else {
			Promise.reject(error);
		}
	}
);

const router = new VueRouter({
	mode: 'history',
	routes
});

new Vue({
	el: '#app',
	template: '<application/>',
	components: {
		Application
	},
	store,
	router,
});

store.dispatch(actions.LOAD_SETTINGS, settings);
