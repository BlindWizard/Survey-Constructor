import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ResizeModes} from "../contracts/ResizeModes";
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
	@Prop(HTMLElement) parentElement: HTMLElement;

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
			let margin = this.block.getStyle()['style'].margin;
			if ('px' ===  this.block.getStyle()['style'].marginMeasure) {
				let width = 'px' === this.block.getStyle()['style'].sizeMeasure
					? this.block.getStyle()['style'].width
					: (this.parentElement as HTMLElement).clientWidth * this.block.getStyle()['style'].width / 100;

				let parentWidth = (this.parentElement as HTMLElement).clientWidth;

				string += 'top:' + ('auto' !== margin.top ? -margin.top + 'px;' : '');
				string += 'right:' + ('auto' !== margin.right ? -margin.right + 'px;' : -(parentWidth - width) / 2 + 'px;');
				string += 'bottom:' + ('auto' !== margin.bottom ? -margin.bottom + 'px;' : '');
				string += 'left:' + ('auto' !== margin.left ? -margin.left + 'px;' : -(parentWidth - width) / 2 + 'px;');
			}
			else if ('%' === this.block.getStyle()['style'].marginMeasure) {
				let factor = 'px' === this.block.getStyle()['style'].sizeMeasure
					? (this.parentElement as HTMLElement).clientWidth / this.block.getStyle()['style'].width
					: 100 / this.block.getStyle()['style'].width
				;

				let width = 'px' === this.block.getStyle()['style'].sizeMeasure
					? this.block.getStyle()['style'].width / (this.parentElement as HTMLElement).clientWidth * 100
					: this.block.getStyle()['style'].width;

				string += 'top:' + ('auto' !== margin.top ? -margin.top * factor + '%;' : '');
				string += 'right:' + ('auto' !== margin.right ? -margin.right * factor + '%;' : -100 + width + '%;');
				string += 'bottom:' + ('auto' !== margin.bottom ? -margin.bottom * factor + '%;' : '');
				string += 'left:' + ('auto' !== margin.left ? -margin.left * factor + '%;' : -100 + width + '%;');
			}
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