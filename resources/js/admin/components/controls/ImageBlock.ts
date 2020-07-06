import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Image} from "../../models/Image";

@Component({
	template: `
        <div :class="bem('image').classes()">
            <img v-if="block.imageId" :src="block.imageId" :class="bem('image').el('value').classes()">
            <div v-if="!block.imageId" :class="bem('image').el('placeholder').classes()">
                No image
            </div>
        </div>
	`,
})
export class ImageBlock extends Vue {
	@Prop(Image) readonly block: Image;
}