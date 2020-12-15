import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Image} from "../../models/Image";
import {styleRenderer} from "../../services/StyleRenderer";
import {ComponentsResolver} from "../../services/ComponentsResolver";

@Component({
	template: `
        <div :class="bem('image').classes()" :style="!resolver.isEditable() ? renderImageStyle() : 'background-color: inherit;'">
            <img v-if="block.imageId" :src="block.imageUrl" :class="bem('image').el('value').classes()">
            <div v-if="!block.imageId" :class="bem('image').el('placeholder').classes()">
                No image
            </div>
        </div>
	`,
})
export class ImageBlock extends Vue {
	@Prop(Image) readonly block: Image;
	@Prop(ComponentsResolver) readonly resolver: ComponentsResolver;

	public renderImageStyle(): string
	{
		return styleRenderer.render(this.block.getStyle()['style']);
	}
}