import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../../models/Text";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {ComponentsFactory} from "../../../services/ComponentsFactory";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Text</h4>
                <input type="text" @input="updateText" :value="this.blockData.text" />
            </div>
        </portal>
	`,
})
export class TextBlockEdit extends Vue {
	@Prop(Text) readonly block: Text;
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: Text|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as Text;
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