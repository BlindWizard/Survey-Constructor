import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <div :class="bem('options-list').classes()" :style="!resolver.isEditable() ? renderOptionsListStyle() : ''">
            <h4 :class="bem('options-list').el('header').classes()" v-if="block.text">{{ block.text }}</h4>
            <label :class="bem('options-list').el('option').classes()" :key="option.id" v-for="option in block.options">
                <input :class="bem('options-list').el('control').classes()" :id="option.id" :name="block.id + '[]'" :value="option.id" type="radio" @input="handle"/>
                <span :class="bem('options-list').el('radio').classes()"></span>
                <span :class="bem('options-list').el('label').classes()">
                    {{ option.text }}
                </span>
            </label>
        </div>
	`,
})
export class OptionsListBlock extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
	@Prop(Function) readonly handler: Function|null;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	private handle(event: Event) {
		if (!this.handler) {
			return;
		}

		this.handler(this, event);
	}

	public renderOptionsListStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}