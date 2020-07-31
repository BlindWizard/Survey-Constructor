import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ResizeModes} from "../contracts/ResizeModes";

@Component({
	template: `
        <div :class="bem('block-original-frame').is(isFrameMargin ? 'margin' : '').is(isFramePadding ? 'padding' : '').classes()"></div>
	`,
})
export class BlockOriginalFrame extends Vue {
	@Prop(String) mode: ResizeModes|null;

	get isFrameMargin(): boolean {
		return this.mode === ResizeModes.MARGIN;
	}

	get isFramePadding(): boolean {
		return this.mode === ResizeModes.PADDING;
	}
}