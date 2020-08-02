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
import {FileModel} from "../../../models/FileModel";

@Component({
	template: `
        <portal to="edit-block">
            <div :class="bem('edit-modal').classes()">
                <h4>Image</h4>
                <div :class="bem('file-uploader').classes()">
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
                                    <img v-if="blockData.imageId && !over && !uploading" :src="blockData.imageUrl">
                                    <div v-if="uploading && !error" :class="bem('file-uploader').el('progress').classes()">
                                        <RadialProgressbar :progress="currentProgress" />
                                    </div>
                                </div>
                            </div>
                            <div class="cell small-6">
                                <input type="file" v-on:change="handleFileSet" />
                                <button :class="bem('button').is('primary').add(!file ? 'disabled' : '').classes()" v-on:click.stop="handleUpload">
                                    <span :class="bem('button').el('label').classes()">Upload</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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

	private file: File|null = null;

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
			this.uploadFile(e.dataTransfer.files[0]);
		}
	}

	public handleFileSet(e: InputEvent)
	{
		let files = (e.target as HTMLInputElement).files;
		if (null !== files && files.length === 1) {
			this.file = files[0];
		}
	}

	public handleUpload()
	{
		if (null !== this.file) {
			this.uploadFile(this.file);
		}
	}

	private uploadFile(file: File)
	{
		let request = new FileUpload();
		request.file = file;
		request.onUpload = this.handleProgress;

		this.uploading = true;
		this.error = null;
		FileApi.upload(request).then((result: FileModel) => {
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

	public handleProgress(e: ProgressEvent) {
		this.currentProgress = e.loaded / e.total * 100;
	}

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}