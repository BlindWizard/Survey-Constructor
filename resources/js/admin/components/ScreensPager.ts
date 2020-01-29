import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <nav :class="bem('screens-pager').classes()">
            <ul :class="bem('screens-pager').el('inner').add('pagination text-center').classes()">
                <li :class="bem('pagination-previous').classes()"><a></a></li>
                <li :class="bem('current').classes()">1</li>
	            <li :class="bem('screens-pager').el('add').classes()"><a>+</a></li>
                <li :class="bem('pagination-next').classes()"><a></a></li>
            </ul>
        </nav>
    `,
})
export class ScreensPager extends Vue {}
