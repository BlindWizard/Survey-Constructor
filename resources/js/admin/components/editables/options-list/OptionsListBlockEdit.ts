import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../../models/OptionsList";
import {Option} from "../../../models/Option";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
const uuidv4 = require('uuid/v4');

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Options list</h4>
                <label>
                    Header
                    <input @input="changeBlockText" :value="block.text" type="text" />
                </label>
                <p :key="option.id" v-for="option in blockData.options">
                    <label>
                        Option text
                        <input @input="changeOptionText(option.id, $event)" :value="option.text" type="text" /><!--
                     -->
                        <button :class="bem('button').add('secondary').classes()" v-on:click.stop="deleteOption(option.id)">
                            <span :class="bem('button').el('label').classes()">-</span>
                        </button>
                    </label>
                </p>
                <div :class="bem('options-list').el('add-wrapper').classes()">
                    <button :class="bem('button').add('secondary').classes()" v-on:click.stop="addOption">
                        <span :class="bem('button').el('label').classes()">Add option</span>
                    </button>
                </div>
            </div>
        </portal>
	`,
})
export class OptionsListBlockEdit extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: OptionsList|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as OptionsList;
	}

	public addOption(): void
	{
		if (null === this.blockData) {
			return;
		}

		let option = new Option();
		option.id = uuidv4();
		option.position = this.blockData.options.length;

		this.blockData.options.push(option);

		this.onUpdate(this.blockData);
		this.onSave();
	}

	public deleteOption(id: string): void
	{
		if (null === this.blockData) {
			return;
		}

		let options = this.blockData.options;
		options = options.filter((option: Option) => {
			return option.id !== id;
		});

		this.blockData.options = options;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	public changeBlockText(event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		this.blockData.text = (event.target as any).value;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	public changeOptionText(optionId: string, event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		let options = this.blockData.options;
		options.forEach((option: Option) => {
			if (option.id === optionId) {
				option.text = (event.target as any).value;
			}
		});

		this.blockData.options = options;
		this.onUpdate(this.blockData);
		this.onSave();
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}