import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Header} from "../../../models/Header";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Option} from "../../../models/Option";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {OptionsList} from "../../../models/OptionsList";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Header</h4>
                <input :value="block.text" type="text" @input="updateText"/>
                <button :class="bem('button').add('primary').classes()" v-on:click.stop="onSave">
                    <span :class="bem('button').el('label').classes()">{{ locale.saveLabel }}</span>
                </button>
            </div>
        </portal>
	`,
})
export class HeaderBlockEdit extends Vue {
	@Prop(Header) readonly block: Header;
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: Option|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as OptionsList;
	}

	public updateText(event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		this.blockData.text = (event.target as HTMLInputElement).value;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}