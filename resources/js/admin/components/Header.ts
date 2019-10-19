import Component from "vue-class-component";
import Vue from "vue";
import {getters} from "../stores/types";

@Component({
	template: `
		<div class="grid-container">
		    <div class="top-menu__inner top-bar">
				<div class="top-bar-left">
					<div class="top-menu__title">{{ appName }}</div>
				</div>
				<div class="top-bar-right">
					<div>
						<form action="/logout" method="post">
							<button class="button button_rounded secondary">
								<input type="hidden" name="_token" :value="csrf"/>
								<span class="button__label">Logout</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	`
})
export class Header extends Vue {
	get csrf(): string
	{
		return this.$store.getters[getters.CSRF];
	}

	get appName(): string
	{
		return this.$store.getters[getters.APPNAME];
	}
}
