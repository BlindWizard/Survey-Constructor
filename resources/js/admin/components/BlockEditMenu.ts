import Component from "vue-class-component";
import Vue from "vue";
import {getters} from "../stores/types";
import {Locale} from "../models/Locale";
import {Prop} from "vue-property-decorator";
import {EditingModes} from "../contracts/EditingModes";

@Component({
	template: `
        <div :class="bem('block-edit-menu').classes()">
            <button v-if="-1 !== activeButtons().indexOf('edit')" :class="bem('button').is('rounded').classes()" v-on:click="onEdit">{{ locale.editLabel }}</button>
            <button v-if="-1 !== activeButtons().indexOf('save')" :class="bem('button').is('rounded').classes()" v-on:click="onSave">{{ locale.saveLabel }}</button>
            <button v-if="-1 !== activeButtons().indexOf('delete')" :class="bem('button').is('rounded').classes()" v-on:click="onDelete">{{ locale.deleteLabel }}</button>
        </div>
	`,
})
export class BlockEditMenu extends Vue {
	@Prop(String) mode: string;
	@Prop(Function) onEdit: Function;
	@Prop(Function) onSave: Function;
	@Prop(Function) onDelete: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}

	public activeButtons(): string[]
	{
		if (EditingModes.EDIT === this.mode) {
			return ['edit', 'delete'];
		}

		if (EditingModes.SAVE === this.mode) {
			return ['save'];
		}

		return [];
	}
}