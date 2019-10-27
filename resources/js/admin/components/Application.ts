import Component from "vue-class-component";
import Vue from "vue";
import {Header} from "./Header";

@Component({
	template: `
		<div class="grid-y">
			<div class="cell" :class="bem('top-menu').classes()">
				<Header/>
			</div>
			<div class="cell">
				<router-view/>
			</div>
		</div>
	`,
	components: {
		Header,
	}
})
export class Application extends Vue {}
