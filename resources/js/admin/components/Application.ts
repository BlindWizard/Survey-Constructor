import Component from "vue-class-component";
import Vue from "vue";
import {AppHeader} from "./AppHeader";

@Component({
	template: `
        <div class="grid-y">
            <div :class="bem('top-menu').add('cell').classes()">
                <AppHeader />
            </div>
            <div class="cell">
                <router-view />
            </div>
        </div>
	`,
	components: {
		AppHeader,
	}
})
export class Application extends Vue {}
