import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Option} from "../../../models/Option";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {OptionsList} from "../../../models/OptionsList";
import {ComponentsFactory} from "../../../services/ComponentsFactory";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Option</h4>
                <input :value="blockData.text" @input="updateText" type="text" />
            </div>
        </portal>
	`,
})
export class OptionBlockEdit extends Vue {
	@Prop(Option) readonly block: Option;
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