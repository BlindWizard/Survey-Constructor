import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Image} from "../../models/Image";

@Component({
	template: `
        <div :class="bem('image').classes()">
            <img :class="bem('image').el('value').classes()">/>
        </div>
	`,
})
export class ImageBlock extends Vue {
	@Prop(Image) readonly block: Image;
}