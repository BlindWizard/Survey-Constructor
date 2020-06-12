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
        <portal to="edit-modal">
            <div :class="bem('options-list').add('edit-modal reveal').classes()" v-component-drop-target>
                <p :key="option.id" v-for="option in blockData.options">
                    <input @input="changeOptionText(option.id, $event)" :value="option.text" type="text" />
                    <button :class="bem('button').add('rounded secondary').classes()" @click="deleteOption(option.id)">
                        -
                    </button>
                </p>
                <div :class="bem('options-list').el('add-wrapper').classes()">
                    <button :class="bem('button').add('rounded secondary').classes()" @click="addOption">+</button>
                </div>
                <button :class="bem('button').add('primary').classes()" @click="onSave">{{ locale.saveLabel }}</button>
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
		this.blockData = ComponentsFactory.createElementFromData(this.block.getType(), this.block.getData());
	}

	public addOption(): void
	{
		if (null === this.blockData) {
			return;
		}

		let block = new OptionsList();
		block.id = this.blockData.id;
		block.position = this.blockData.position;
		block.text = this.blockData.text;
		block.multiple = this.blockData.multiple;
		block.options = this.blockData.options;

		let option = new Option();
		option.id = uuidv4();
		option.position = block.options.length;

		block.options.push(option);

		this.blockData = block;
		this.onUpdate(this.blockData);
	}

	public deleteOption(id: string): void
	{
		if (null === this.blockData) {
			return;
		}

		let block = new OptionsList();
		block.id = this.blockData.id;
		block.position = this.blockData.position;
		block.text = this.blockData.text;
		block.multiple = this.blockData.multiple;
		block.options = this.blockData.options;

		let options = block.options;
		block.options = options.filter((option: Option) => {
			return option.id !== id;
		});

		this.blockData = block;
		this.onUpdate(this.blockData);
	}

	public changeOptionText(optionId: string, event: KeyboardEvent)
	{
		if (null === this.blockData) {
			return;
		}

		let block = new OptionsList();
		block.id = this.blockData.id;
		block.position = this.blockData.position;
		block.text = this.blockData.text;
		block.multiple = this.blockData.multiple;
		block.options = this.blockData.options;

		let options = block.options;
		options.forEach((option: Option) => {
			if (option.id === optionId) {
				option.text = (event.target as any).value;
			}
		});

		this.blockData = block;
		this.onUpdate(this.blockData);
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}