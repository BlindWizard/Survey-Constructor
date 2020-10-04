import Component from "vue-class-component";
import Vue from "vue";
import "foundation-sites";
import $ from "jquery";
import {getters} from "../stores/types";
import {SurveyContract} from "../contracts/SurveyContract";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="cell medium-12">
                    <div :class="bem('top-menu').el('inner').add('top-bar').classes()">
                        <div class="top-bar-left">
                            <router-link :to="{name: 'main-page'}">
                                <div :class="bem('top-menu').el('logo').classes()">
                                    <div :class="bem('main-logo').is('borderless').classes()" />
                                </div><!--
                             --><div :class="bem('top-menu').el('title').classes()">{{ appName }}</div>
                            </router-link><!--
                         --><div v-if="null !== section" :class="bem('top-menu').el('section').classes()">{{ section }}</div><!--
                         --><router-link v-if="section === 'Editor' && survey" :to="{name: 'survey-dataset', surveyId: survey.getId()}">Dataset</router-link>
                        </div>
                        <div class="top-bar-right">
                            <div>
                                <ul id="settings-menu" :class="bem('settings-menu').add('menu dropdown').classes()">
                                    <li>
                                        <a href="#">Menu</a>
                                        <ul class="menu">
                                            <li>
                                                <router-link :to="{name: 'settings'}" :class="bem('settings-link').classes()">
                                                    <button :class="bem('button').add('dark').classes()">Settings</button>
                                                </router-link>
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

	get section(): string|null
	{
		return this.$store.getters[getters.SECTION];
	}

	get survey(): SurveyContract|null {
		return this.$store.getters[getters.SURVEY];
	}
}
