import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Image} from "../../../models/Image";

@Component({
	template: `
        <portal to="edit-modal">
            <div :class="bem('image').add('edit-modal reveal').classes()">
                <div :class="bem('image').el('dropzone').is(!block.imageUrl ? 'empty' : '').classes()" v-drop-file-upload=""></div>
                <button :class="bem('button').add('primary').classes()" @click="onSave">
                    <span :class="bem('button').el('label').classes()">{{ locale.saveLabel }}</span>
                </button>
            </div>
        </portal>
	`,
})
export class ImageBlockEdit extends Vue {
	@Prop(Image) readonly block: Image;
	@Prop(Function) onSave: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}