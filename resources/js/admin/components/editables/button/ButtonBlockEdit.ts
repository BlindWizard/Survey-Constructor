import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {Button} from "../../../models/Button";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Text</h4>
                <input type="text" @input="updateText" :value="this.blockData.text" />
                <button :class="bem('button').add('primary').classes()" v-on:click.stop="onSave(true)">
                    <span :class="bem('button').el('label').classes()">{{ locale.save }}</span>
                </button>
            </div>
        </portal>
	`,
})
export class ButtonBlockEdit extends Vue {
	@Prop(Button) readonly block: Button;
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: Button|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as Button;
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