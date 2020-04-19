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
                    <a @click="prevPage()"></a>
                </li>
                <li v-if="currentPage && page" :class="{current: page.getId() === currentPage.getId()}" v-for="page in pages">
                    <a @click="setPage(page.getId())" v-if="page.getId() !== currentPage.getId()">
                        {{ page.getStep() + 1}}
                    </a>
                    <span v-if="page.getId() === currentPage.getId()">{{ page.getStep() + 1 }}</span>
                    <a :class="bem('screens-pager').el('delete').classes()" @click="deletePage(page.getId())">-</a>
                </li>
                <li :class="bem('screens-pager').el('add').classes()">
                    <a @click="addPage">+</a>
                </li>
                <li :class="bem('pagination-next').classes()">
                    <a @click="nextPage()"></a>
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

	public nextPage()
	{
		if (null === this.currentPage) {
			return;
		}

		let step = this.currentPage.getStep() + 1;
		let newPage: PageContract|null = this.$store.getters[getters.PAGE_BY_STEP](step);
		if (null !== newPage) {
			this.$store.dispatch(actions.SET_ACTIVE_PAGE, newPage.getId());
		}
	}

	public prevPage()
	{
		if (null === this.currentPage) {
			return;
		}

		let step = this.currentPage.getStep() - 1;
		let newPage: PageContract|null = this.$store.getters[getters.PAGE_BY_STEP](step);
		if (null !== newPage) {
			this.$store.dispatch(actions.SET_ACTIVE_PAGE, newPage.getId());
		}
	}

	get pages(): PageContract[]
	{
		return this.$store.getters[getters.PAGES];
	}
}
