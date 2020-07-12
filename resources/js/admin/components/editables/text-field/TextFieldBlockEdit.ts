import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {TextField} from "../../../models/TextField";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Text} from "../../../models/Text";
import {ComponentsFactory} from "../../../services/ComponentsFactory";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Text field</h4>
                <label>
                    Label
                    <input type="text" :class="bem('text-field').el('value').classes()" :value="blockData.label" @input="updateLabel" />
                </label>
                <label>
                    Placeholder
                    <input type="text" :class="bem('text-field').el('value').classes()" :value="blockData.placeholder" @input="updatePlaceholder" />
                </label>
                <label>
                    Multiline?
                    <input type="checkbox" :value="blockData.multiline" @input="updateMultiline" />
                </label>
                <button :class="bem('button').add('primary').classes()" v-on:click.stop="onSave">
                    <span :class="bem('button').el('label').classes()">{{ locale.saveLabel }}</span>
                </button>
            </div>
        </portal>
	`,
})
export class TextFieldBlockEdit extends Vue {
	@Prop(TextField) readonly block: TextField;
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: TextField|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as TextField;
	}

	public updateLabel(event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		this.blockData.label = (event.target as HTMLInputElement).value;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	public updatePlaceholder(event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		this.blockData.placeholder = (event.target as HTMLInputElement).value;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	public updateMultiline(event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		this.blockData.multiline = (event.target as HTMLInputElement).checked;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}