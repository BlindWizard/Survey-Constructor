import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {PageContract} from "../../admin/contracts/PageContract";

@Component({
	template: `
        <div v-if="page" :class="bem('survey-block').el('footer').classes()">
            <button v-if="!isFirstPage" :class="bem('button').add('secondary').classes()" @click="prevPage">
                <span :class="bem('button').el('label').classes()">Back...</span>
            </button>

            <button v-if="!isLastPage" :class="bem('button').add('primary').classes()" @click="nextPage">
                <span :class="bem('button').el('label').classes()">Next Step!</span>
            </button>

            <button v-if="isLastPage" :class="bem('button').add('primary').classes()">
                <span :class="bem('button').el('label').classes()">You finished :)</span>
            </button>
        </div>
    `,
})
export class ScreensPager extends Vue {
	public nextPage() {
		this.$store.dispatch(actions.NEXT_PAGE);
	}

	public prevPage() {
		this.$store.dispatch(actions.PREV_PAGE);
	}

	get page(): PageContract|null {
		return this.$store.getters[getters.CURRENT_PAGE];
	}

	get isLastPage(): boolean {
		if (null === this.page) {
			return false;
		}

		return this.$store.getters[getters.IS_LAST_PAGE](this.page.getId());
	}

	get isFirstPage(): boolean {
		if (null === this.page) {
			return false;
		}

		return this.$store.getters[getters.IS_FIRST_PAGE](this.page.getId());
	}
}
