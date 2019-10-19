import Vue from 'vue';
import {Application} from './components/Application';
import {store} from "./stores/store";
import {actions} from "./stores/types";
import {errorHandler} from "./handlers";
import {settings} from "./settings";

window.onerror = errorHandler;

store.dispatch(actions.LOAD_SETTINGS, settings);

new Vue({
	el: '#app',
	template: '<application/>',
	components: {
		Application
	},
	store,
});
