import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Image} from "../../../models/Image";
import {FileUpload} from "../../../api/requests/FileUpload";
import {FileApi} from "../../../api/file.api";
import {RadialProgressbar} from "../../RadialProgressbar";
import {ComponentsFactory} from "../../../services/ComponentsFactory";
import {File} from "../../../models/File";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Image</h4>
                <div :class="bem('image-upload').classes()">
                    <div class="grid-container full">
                        <div class="grid-x grid-margin-x">
                            <div class="cell small-6">
                                <div :class="bem('file-uploader').el('dropzone').is(!blockData.imageId ? 'empty' : '').is(over ? 'over' : '').is(error ? 'error' : '').classes()"
                                     v-on:dragenter.prevent.stop="handleOver"
                                     v-on:dragover.prevent.stop="handleOver"
                                     v-on:dragleave.prevent.stop="handleLeave"
                                     v-on:drop.prevent.stop="handleDrop"
                                >
                                    <div v-if="(!blockData.imageId || over) && !uploading" :class="bem('file-uploader').el('dropzone-title').classes()">
                                        {{ over ? 'Drop here' : (error ? error : 'No image') }}
                                    </div>
                                    <img v-if="blockData.imageId && !over" :src="blockData.imageUrl">
                                    <div v-if="uploading && !error" :class="bem('file-uploader').el('progress').classes()">
                                        <RadialProgressbar :progress="currentProgress"/>
                                    </div>
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
	@Prop(Function) readonly onUpdate: Function;
	@Prop(Function) onSave: Function;

	private blockData: Image|null = null;

	private over: boolean = false;
	private uploading: boolean = false;
	private currentProgress: number = 0;
	private error: string|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block) as Image;
	}

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
			this.error = null;
			FileApi.upload(request).then((result: File) => {
				this.uploading = false;
				this.currentProgress = 0;

				if (null === this.blockData) {
					return;
				}

				this.blockData.imageId = result.id;
				this.blockData.imageUrl = result.url;

				this.onUpdate(this.blockData);
				this.onSave();
			}, (result: Error) => {
				this.uploading = false;

				if (result.message === 'Request failed with status code 413') {
					this.error = 'File is too large';
				}
				else {
					this.error = result.message;
				}
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