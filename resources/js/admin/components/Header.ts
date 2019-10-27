import Component from "vue-class-component";
import Vue from "vue";
import {getters} from "../stores/types";

@Component({
	template: `
		<div class="grid-container">
			<div class="top-bar" :class="bem('top-menu').el('inner').classes()">
				<div class="top-bar-left">
					<div :class="bem('top-menu').el('logo').classes()">
						<div :class="bem('main-logo').is('borderless').classes()"/>
					</div>
					<div :class="bem('top-menu').el('title').classes()">{{ appName }}</div>
				</div>
				<div class="top-bar-right">
					<div>
						<form action="/logout" method="post">
							<button :class="bem('button').is('rounded').add('secondary').classes()">
								<input type="hidden" name="_token" :value="csrf"/>
								<span :class="bem('button').el('label').classes()">Logout</span>
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
