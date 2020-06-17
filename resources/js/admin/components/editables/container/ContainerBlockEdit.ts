import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Container} from "../../../models/Container";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {OptionsList} from "../../../models/OptionsList";
const uuidv4 = require('uuid/v4');

@Component({
template: `
    <portal to="edit-modal">
        <div :class="bem('container').add('edit-modal reveal').classes()" v-component-drop-target>
            <label>
                Slots count
                <select @change="changeSlotsCount" :value="blockData.slots.length">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
            </label>

            <button :class="bem('button').add('primary').classes()" @click="onSave">
                <span :class="bem('button').el('label').classes()">{{ locale.saveLabel }}</span>
            </button>
        </div>
    </portal>
`,
})
export class ContainerBlockEdit extends Vue {
	@Prop(Container) readonly block: Container;
	@Prop(Function) onSave: Function;
	@Prop(Function) readonly onUpdate: Function;

	private blockData: Container|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as Container;
	}

	public changeSlotsCount(e: Event) {
		if (null === this.blockData) {
			return;
		}

		let newSlotsCount = ((e.target as any).value) as number;

		if (newSlotsCount > this.blockData.slots.length) {
			for (let i = 0; i <= newSlotsCount - this.blockData.slots.length; i++) {
				let newSlot = uuidv4();
				this.blockData.slots.push(newSlot);
				this.blockData.children[newSlot] = {};
			}
		}
		else {
			for (let i = 0; i <= this.blockData.slots.length - newSlotsCount; i++) {
				let deleteSlot: string = this.blockData.slots.pop() as string;
				delete this.blockData.children[deleteSlot];
			}
		}

		this.onUpdate(this.blockData);
	}

	get locale(): Locale {
		return this.$store.getters[getters.LOCALE];
	}
}