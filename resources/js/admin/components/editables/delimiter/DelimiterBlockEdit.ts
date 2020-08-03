import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {Delimiter} from "../../../models/Delimiter";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Delimiter</h4>
            </div>
        </portal>
	`,
})
export class DelimiterBlockEdit extends Vue {
	@Prop(Delimiter) readonly block: Delimiter;
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: Delimiter|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as Delimiter;
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}