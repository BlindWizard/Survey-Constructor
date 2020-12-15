import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ResizeModes} from "../contracts/ResizeModes";
import {ResizeDirection} from "../contracts/ResizeDirection";
import {resizeService} from "../services/ResizeService";
import {BlockContract} from "../contracts/BlockContract";

@Component({
	template: `
        <div :class="bem('block-resize-frame').el('background').is(mode || 'select').classes()" :style="renderFrameStyle()"></div>
	`,
})
export class BlockResizeFrameBackground extends Vue {
	@Prop(Object) block: BlockContract;
	@Prop(String) slotId: string|null;
	@Prop(String) mode: ResizeModes|null;

	public renderFrameStyle(): string {
		let string = '';

		if (this.isFramePadding) {
			string += 'top:' + this.block.getStyle()['style'].padding.top + 'px;';
			string += 'right:' + this.block.getStyle()['style'].padding.right + 'px;';
			string += 'bottom:' + this.block.getStyle()['style'].padding.bottom + 'px;';
			string += 'left:' + this.block.getStyle()['style'].padding.left + 'px;';
		}

		if (this.isFrameMove) {
			string += 'top:0;right:0;bottom:0;left:0;';
		}

		if (this.isFrameMargin) {
			string += 'top:' + (-this.block.getStyle()['style'].margin.top) + 'px;';
			string += 'right:' + (-this.block.getStyle()['style'].margin.right) + 'px;';
			string += 'bottom:' + (-this.block.getStyle()['style'].margin.bottom) + 'px;';
			string += 'left:' + (-this.block.getStyle()['style'].margin.left) + 'px;';
		}

		return string;
	}

	get isFrameMargin(): boolean {
		return this.mode === ResizeModes.MARGIN;
	}

	get isFrameMove(): boolean {
		return this.mode === ResizeModes.MOVE;
	}

	get isFramePadding(): boolean {
		return this.mode === ResizeModes.PADDING;
	}

	get isFrameResize(): boolean {
		return this.mode === ResizeModes.RESIZE;
	}
}