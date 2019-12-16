import Component from "vue-class-component";
import Vue from "vue";
import {getters} from "../stores/types";

@Component({
	template: `
		<div class="grid-container fluid">
		<div class="grid-x grid-padding-x">
			<div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
			<div :class="bem('top-menu').el('inner').add('top-bar').classes()">
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
		</div>
		</div>
	`
})
export class Header extends Vue
{
	get csrf(): string
	{
		return this.$store.getters[getters.CSRF];
	}

	get appName(): string
	{
		return this.$store.getters[getters.LOCALE].appName;
	}
}
