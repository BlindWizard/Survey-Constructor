import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Page} from "../models/Page";
import {PageContract} from "../contracts/PageContract";

@Component({
	template: `
        <nav :class="bem('screens-pager').classes()">
            <ul :class="bem('screens-pager').el('inner').add('pagination text-center').classes()">
                <li :class="bem('pagination-previous').classes()">
                    <a></a>
                </li>
                <li v-if="currentPage && page" :class="{current: page.getId() === currentPage.getId()}" v-for="page in pages">
                    <a @click="setPage(page.getId())" v-if="page.getId() !== currentPage.getId()">{{ page.getStep() + 1}}</a>
                    <span v-if="page.getId() === currentPage.getId()">{{ page.getStep() + 1 }}</span>
                    <a :class="bem('screens-pager').el('delete')" @click="deletePage(page.getId())">-</a>
                </li>
                <li :class="bem('screens-pager').el('add').classes()">
                    <a @click="addPage">+</a>
                </li>
                <li :class="bem('pagination-next').classes()">
                    <a></a>
                </li>
            </ul>
        </nav>
    `,
})
export class ScreensPager extends Vue {
	public addPage()
	{
		this.$store.dispatch(actions.ADD_PAGE);
	}

	public deletePage(pageId: string)
	{
		this.$store.dispatch(actions.DELETE_PAGE, pageId);
	}

	public setPage(pageId: string)
	{
		this.$store.dispatch(actions.SET_ACTIVE_PAGE, pageId);
	}

	get currentPage(): PageContract|null
	{
		return this.$store.getters[getters.CURRENT_PAGE];
	}

	get pages(): PageContract[]
	{
		return this.$store.getters[getters.PAGES];
	}
}
