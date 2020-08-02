import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {actions, getters} from "../../../stores/types";
import {Container} from "../../../models/Container";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {ChangeSlotsCount} from "../../../api/requests/ChangeSlotsCount";

@Component({
template: `
    <portal to="edit-block">
        <div :class="bem('edit-modal').classes()">
            <h4>Container</h4>
            <label>
                Slots count
                <select v-on:click.stop @change="changeSlotsCount" :value="blockData.slots.length">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>6</option>
                    <option>12</option>
                </select>
            </label>
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

		let request = new ChangeSlotsCount();
		request.blockId = this.blockData.getId();
		request.count = ((e.target as any).value) as number;

		this.$store.dispatch(actions.CHANGE_SLOTS_COUNT, request);
	}

	get locale(): Locale {
		return this.$store.getters[getters.LOCALE];
	}
}