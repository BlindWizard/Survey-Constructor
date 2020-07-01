import Vue from 'vue';
import PortalVue from 'portal-vue'
import {Application} from './components/Application';
import {store} from "./stores/store";
import {actions} from "./stores/types";
import {errorHandler} from "./handlers";
import {settings} from "./settings";
import {BemMixin} from "../common/vue-bem-mixin";
import VueRouter from "vue-router";
import {routes} from "./routes";
import {axios} from "../common/axios";
import {ComponentDrag} from "./directives/ComponentDrag";
import {ComponentDrop} from "./directives/ComponentDrop";
import {ComponentDropTarget} from "./directives/ComponentDropTarget";
import {DropFileUpload} from "./directives/DropFileUpload";

import $ from 'jquery';
window['$'] = window['jQuery'] = $;

Vue.mixin(BemMixin);
Vue.use(VueRouter);
Vue.use(PortalVue);

Vue.directive('component-drag', ComponentDrag);
Vue.directive('component-drop', ComponentDrop);
Vue.directive('component-drop-target', ComponentDropTarget);
Vue.directive('drop-file-upload', DropFileUpload);

if (process.env.NODE_ENV === 'production') {
	window.onerror = errorHandler;
	axios.interceptors.response.use(
		response => response,
		(error: any) => {
			if (errorHandler) {
				errorHandler(error);
			} else {
				Promise.reject(error);
			}
		}
	);
}

const router = new VueRouter({
	mode: 'history',
	routes
});

store.dispatch(actions.LOAD_SETTINGS, settings).then(() => {
	new Vue({
		el: '#app',
		template: '<application/>',
		components: {
			Application
		},
		store,
		router,
	});
});
