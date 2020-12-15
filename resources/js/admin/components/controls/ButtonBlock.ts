import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Button} from "../../models/Button";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <div :style="!resolver.isEditable() ? renderButtonStyle() : 'background-color: inherit;'">
            <button :class="bem('button').is('primary').classes()" v-on:click.stop="handle">
                <span :class="bem('button').el('label').classes()">{{ block.text }}</span>
            </button>
        </div>
	`,
})
export class ButtonBlock extends Vue {
	@Prop(Button) readonly block: Button;
	@Prop(Function) readonly handler: Function|null;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	private handle(event: Event) {
		if (!this.handler) {
			return;
		}

		this.handler(this, event);
	}

	public renderButtonStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']) + ';position: relative;';
	}
}