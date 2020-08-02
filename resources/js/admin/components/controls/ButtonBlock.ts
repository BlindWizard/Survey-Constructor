import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Button} from "../../models/Button";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <button :class="bem('button').is('primary').classes()" :style="!resolver.isEditable() ? renderButtonStyle() : ''">
            <span :class="bem('button').el('label').classes()">{{ block.text }}</span>
        </button>
	`,
})
export class ButtonBlock extends Vue {
	@Prop(Button) readonly block: Button;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	public renderButtonStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}