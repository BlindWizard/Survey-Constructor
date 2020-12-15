import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";
import {Delimiter} from "../../models/Delimiter";

@Component({
	template: `
      <hr :class="bem('delimiter').classes()" :style="!resolver.isEditable() ? renderDelimiterStyle() : 'background-color: inherit;'" />
	`,
})
export class DelimiterBlock extends Vue {
	@Prop(Delimiter) readonly block: Delimiter;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	public renderDelimiterStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}