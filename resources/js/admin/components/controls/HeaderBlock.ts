import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Header} from "../../models/Header";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <div :class="bem('header').classes()" :style="!resolver.isEditable() ? renderHeaderStyle() : ''">
            <div :class="bem('header').el('image').classes()">
                <div :class="bem('main-logo').classes()"></div>
            </div>
            <h1 :class="bem('header').el('label').classes()">{{ block.text }}</h1>
        </div>
	`,
})
export class HeaderBlock extends Vue {
	@Prop(Header) readonly block: Header;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	public renderHeaderStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}