import Component from "vue-class-component";
import Vue from "vue";
import {TemplatePreview} from "./TemplatePreview";
import {actions, getters} from "../stores/types";
import {Template} from "../models/Template";

@Component({
	template: `
		<div v-if="null !== templates" :class="bem('survey-list').add('grid-container full').classes()">
			<div class="grid-x">
				<div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
					<div class="grid-container fluid">
						<div class="grid-x grid-margin-x">
							<TemplatePreview :key="i" v-for="(template, i) in templates" :template="template"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
	components: {
		TemplatePreview,
	}
})
export class TemplatesList extends Vue {
	public mounted() {
		if (null === this.templates) {
			this.$store.dispatch(actions.LOAD_TEMPLATES);
		}
	}

	get templates(): Template[]|null {
		return this.$store.getters[getters.TEMPLATES];
	}
}