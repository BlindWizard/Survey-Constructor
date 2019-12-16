import Component from "vue-class-component";
import Vue from "vue";
import {getters} from "../stores/types";
import {Locale} from "../models/Locale";
import {Prop} from "vue-property-decorator";

@Component({
	template: `
		<div :class="bem('block-edit-menu').classes()">
			<button :class="bem('button').is('rounded').classes()" v-on:click="onEdit">{{ locale.editLabel }}</button>
		</div>
	`,
})
export class BlockEditMenu extends Vue {
	@Prop(Function) onEdit: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}