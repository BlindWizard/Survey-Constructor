import Component from "vue-class-component";
import Vue from "vue";
import {Header} from "./Header";

@Component({
	template: `
		<div class="grid-x">
			<div class="top-menu cell">
				<Header/>
			</div>
		</div>
	`,
	components: {
		Header
	}
})
export class Application extends Vue {}
