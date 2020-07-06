import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Image} from "../../../models/Image";
import {FileUpload} from "../../../api/requests/FileUpload";
import {FileApi} from "../../../api/file.api";
import {RadialProgressbar} from "../../RadialProgressbar";

@Component({
	template: `
        <portal to="edit-modal">
            <div :class="bem('edit-modal').add('reveal').classes()">
                <div :class="bem('image-upload').classes()">
                    <div class="grid-container full">
                        <div class="grid-x">
                            <div class="cell small-6">
                                <div :class="bem('file-uploader').el('dropzone').is(!block.imageId ? 'empty' : '').is(over ? 'over' : '').classes()"
                                     v-on:dragenter.prevent.stop="handleOver"
                                     v-on:dragover.prevent.stop="handleOver"
                                     v-on:dragleave.prevent.stop="handleLeave"
                                     v-on:drop.prevent.stop="handleDrop"
                                >
                                    <div v-if="(!block.imageId || over) && !uploading" :class="bem('file-uploader').el('dropzone-title').classes()">{{ over ? 'Drop here' : 'No image' }}</div>
                                    <RadialProgressbar v-if="uploading" :progress="currentProgress"/>
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
	components: {
		RadialProgressbar
	}
})
export class ImageBlockEdit extends Vue {
	@Prop(Image) readonly block: Image;
	@Prop(Function) onSave: Function;

	private over: boolean = false;
	private uploading: boolean = false;
	private currentProgress: number = 0;

	public handleOver()
	{
		this.over = true;
	}

	public handleLeave()
	{
		this.over = false;
	}

	public handleDrop(e: DragEvent)
	{
		this.over = false;

		if (e.dataTransfer && e.dataTransfer.files.length === 1) {
			let request = new FileUpload();
			request.file = e.dataTransfer.files[0];
			request.onUpload = this.handleProgress;

			this.uploading = true;
			FileApi.upload(request).then(() => {
				this.uploading = false;
				this.currentProgress = 0;
			});
		}
	}

	public handleProgress(e: ProgressEvent) {
		this.currentProgress = e.loaded / e.total * 100;
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}