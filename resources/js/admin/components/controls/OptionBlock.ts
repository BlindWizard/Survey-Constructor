import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Option} from "../../models/Option";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <div :class="bem('option').classes()" :style="!resolver.isEditable() ? renderOptionStyle() : ''">
            <input :class="bem('option').el('control').classes()" :id="block.id" :name="block.id + '[]'" :value="block.id" type="checkbox" @input="handle">
            <label :class="bem('option').el('checkbox').classes()" :for="block.id">
                <span :class="bem('option').el('checkbox-inner').classes()">
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
                <span :class="bem('option').el('label').classes()">{{ block.text }}</span>
            </label>
        </div>
	`,
})
export class OptionBlock extends Vue {
	@Prop(Option) readonly block: Option;
	@Prop(Function) readonly handler: Function|null;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	private handle(event: Event) {
		if (!this.handler) {
			return;
		}

		this.handler(this, event);
	}

	public renderOptionStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}