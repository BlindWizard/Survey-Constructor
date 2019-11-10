import Component from "vue-class-component";
import Vue from "vue";
import {TemplatePreview} from "./TemplatePreview";
import {actions, getters} from "../stores/types";

@Component({
	template: `
		<div v-if="null !== templates" :class="bem('survey-list').add('grid-container').classes()">
			<div class="grid-x grid-margin-x">
				<TemplatePreview :key="i" v-for="(template, i) in templates" :template="template"/>
			</div>
		</div>
	`,
	components: {
		TemplatePreview: TemplatePreview,
	}
})
export class TemplatesList extends Vue {
	public mounted() {
		if (null === this.templates) {
			this.$store.dispatch(actions.SHOW_TEMPLATES);
		}
	}

	get templates() {
		return this.$store.getters[getters.TEMPLATES];
	}
}