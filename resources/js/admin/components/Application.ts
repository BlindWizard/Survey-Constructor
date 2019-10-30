import Component from "vue-class-component";
import Vue from "vue";
import {Header} from "./Header";

@Component({
	template: `
		<div class="grid-y">
			<div :class="bem('top-menu').add('cell')classes()">
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
