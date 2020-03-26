import Vue from 'vue';
import {Application} from './components/Application';
import {BemMixin} from "../common/vue-bem-mixin";
import VueRouter from "vue-router";
import {store} from "./stores/store";
import "../../../resources/sass/app.scss";


Vue.mixin(BemMixin);
Vue.use(VueRouter);

const client = new Vue({
	template: '<application/>',
	components: {
		Application
	},
	store,
});

export {client};
