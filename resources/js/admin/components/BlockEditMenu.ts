import Component from "vue-class-component";
import Vue from "vue";
import {actions, getters} from "../stores/types";
import {Locale} from "../models/Locale";
import {Prop} from "vue-property-decorator";
import {EditingModes} from "../contracts/EditingModes";
import {ResizeModes} from "../contracts/ResizeModes";

@Component({
	template: `
        <div :class="bem('block-edit-menu').classes()">
            <button v-if="-1 !== activeButtons().indexOf('resize')" :class="bem('button').is('rounded').classes()" v-on:click.stop="onResize">{{ locale.resize }}</button>
            <button v-if="-1 !== activeButtons().indexOf('margin')" :class="bem('button').is('rounded').classes()" v-on:click.stop="onMargin">{{ locale.margin }}</button>
            <button v-if="-1 !== activeButtons().indexOf('padding')" :class="bem('button').is('rounded').classes()" v-on:click.stop="onPadding">{{ locale.padding }}</button>
            <button v-if="-1 !== activeButtons().indexOf('delete')" :class="bem('button').is('rounded').classes()" v-on:click.stop="onDelete">{{ locale.delete }}</button>
        </div>
	`,
})
export class BlockEditMenu extends Vue {
	@Prop(String) mode: string;
	@Prop(Function) onSelectMode: Function|null;
	@Prop(Function) onDelete: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}

	public activeButtons(): string[]
	{
		if (EditingModes.EDIT === this.mode) {
			return ['resize', 'margin', 'padding', 'delete'];
		}

		return [];
	}

	public onMargin()
	{
		if (null === this.onSelectMode) {
			return;
		}

		this.onSelectMode(ResizeModes.MARGIN);
	}

	public onPadding()
	{
		if (null === this.onSelectMode) {
			return;
		}

		this.onSelectMode(ResizeModes.PADDING);
	}

	public onResize()
	{
		if (null === this.onSelectMode) {
			return;
		}

		this.$store.dispatch(actions.SET_RESIZING, true);

		this.onSelectMode(ResizeModes.RESIZE);
	}
}