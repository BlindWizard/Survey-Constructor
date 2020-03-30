import Component from "vue-class-component";
import Vue from "vue";
import "foundation-sites";
import $ from "jquery";
import {getters} from "../stores/types";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="cell medium-12">
                    <div :class="bem('top-menu').el('inner').add('top-bar').classes()">
                        <div class="top-bar-left">
                            <div :class="bem('top-menu').el('logo').classes()">
                                <div :class="bem('main-logo').is('borderless').classes()" />
                            </div>
                            <div :class="bem('top-menu').el('title').classes()">{{ appName }}</div>
                        </div>
                        <div class="top-bar-right">
                            <div>
                                <ul id="settings-menu" :class="bem('settings-menu').add('menu dropdown').classes()">
                                    <li>
                                        <a href="#">Menu</a>
                                        <ul class="menu">
                                            <li>
	                                            <a href="#" :class="bem('settings-link').classes()">
                                                    <button :class="bem('button').add('dark').classes()">Settings</button>
                                                </a>
                                            </li>
                                            <li>
                                                <form action="/logout" method="post">
                                                    <input type="hidden" name="_token" :value="csrf"/>
                                                    <button :class="bem('button').add('secondary').classes()">Logout</button>
                                                </form>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`
})
export class AppHeader extends Vue
{
	mounted()
	{
		new Foundation.DropdownMenu($('#settings-menu'));
	}

	get csrf(): string
	{
		return this.$store.getters[getters.CSRF];
	}

	get appName(): string
	{
		return this.$store.getters[getters.LOCALE].appName;
	}
}
