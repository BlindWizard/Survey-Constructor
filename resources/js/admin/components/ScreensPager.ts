import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Page} from "../models/Page";

@Component({
	template: `
        <nav :class="bem('screens-pager').classes()">
            <ul :class="bem('screens-pager').el('inner').add('pagination text-center').classes()">
                <li :class="bem('pagination-previous').classes()"><a></a></li>
                <li :class="bem('current').classes()" v-for="page in pages">{{ page.step + 1}}</li>
                <li :class="bem('screens-pager').el('add').classes()"><a @click="add">+</a></li>
                <li :class="bem('pagination-next').classes()"><a></a></li>
            </ul>
        </nav>
    `,
})
export class ScreensPager extends Vue {
	public add()
	{
		this.$store.dispatch(actions.ADD_PAGE);
	}

	get pages(): Page[]
	{
		return this.$store.getters[getters.PAGES];
	}
}
