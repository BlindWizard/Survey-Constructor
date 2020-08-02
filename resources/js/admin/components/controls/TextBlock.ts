import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../models/Text";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <div :class="bem('text').classes()" :style="!resolver.isEditable() ? renderTextStyle() : ''">
            <span :class="bem('text').el('value').classes()">{{ block.text }}</span>
        </div>
	`,
})
export class TextBlock extends Vue {
	@Prop(Text) readonly block: Text;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	public renderTextStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}