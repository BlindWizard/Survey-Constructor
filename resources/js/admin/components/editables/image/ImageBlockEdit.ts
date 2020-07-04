import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Image} from "../../../models/Image";

@Component({
	template: `
        <portal to="edit-modal">
            <div :class="bem('edit-modal').add('reveal').classes()">
                <div :class="bem('image-upload').classes()">
                    <div class="grid-container full">
                        <div class="grid-x">
                            <div class="cell small-6">
                                <div :class="bem('file-uploader').el('dropzone').is(!block.imageUrl ? 'empty' : '').classes()" v-drop-file-upload="">
                                    <div :class="bem('file-uploader').el('dropzone-title').classes()">Drop here</div>
                                </div>
                            </div>
                            <div class="cell small-6">
                                <input type="file" />
                                <button :class="bem('button').is('primary').classes()">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button :class="bem('button').add('primary').classes()" v-on:click.stop="onSave">
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