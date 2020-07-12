import Component from "vue-class-component";
import Vue from "vue";
import {AppHeader} from "./AppHeader";
import {getters} from "../stores/types";


@Component({
	template: `
        <div>
            <div class="grid-y">
                <div :class="bem('top-menu').add('cell').classes()">
                    <AppHeader />
                </div>
                <div class="cell">
                    <router-view />
                </div>
            </div>
            <portal-target name="modal" class="reveal-overlay"></portal-target>
        </div>
	`,
	components: {
		AppHeader,
	}
})
export class Application extends Vue {}
