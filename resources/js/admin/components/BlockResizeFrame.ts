import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ResizeModes} from "../contracts/ResizeModes";
import {ResizeDirection} from "../contracts/ResizeDirection";
import {resizeService} from "../services/ResizeService";
import {BlockContract} from "../contracts/BlockContract";

@Component({
	template: `
        <div :class="bem('block-resize-frame').is(mode || 'select').classes()" :style="renderFrameStyle()">
            <span v-if="mode && (isDirectionAll || isDirectionVertical || isDirectionTop)"
                  :class="bem('block-resize-frame').el('pin').is('top').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeTop)" v-on:click.prevent>
            </span>
            <span v-if="mode && (isDirectionAll)"
                  :class="bem('block-resize-frame').el('pin').is('top-right').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeTopRight)" v-on:click.prevent>
            </span>
            <span v-if="mode && (isDirectionAll || isDirectionHorizontal || isDirectionRight)"
                  :class="bem('block-resize-frame').el('pin').is('right').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeRight)">
            </span>
            <span v-if="mode && (isDirectionAll)"
                  :class="bem('block-resize-frame').el('pin').is('bottom-right').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeBottomRight)" v-on:click.prevent>
            </span>
            <span v-if="mode && (isDirectionAll || isDirectionVertical || isDirectionBottom)"
                  :class="bem('block-resize-frame').el('pin').is('bottom').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeBottom)">
            </span>
            <span v-if="mode && (isDirectionAll)"
                  :class="bem('block-resize-frame').el('pin').is('bottom-left').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeBottomLeft)" v-on:click.prevent>
            </span>
            <span v-if="mode && (isDirectionAll || isDirectionHorizontal || isDirectionLeft)"
                  :class="bem('block-resize-frame').el('pin').is('left').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeLeft)">
            </span>
            <span v-if="mode && (isDirectionAll)"
                  :class="bem('block-resize-frame').el('pin').is('top-left').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeTopLeft)" v-on:click.prevent>
            </span>
        </div>
	`,
})
export class BlockResizeFrame extends Vue {
	@Prop(Object) block: BlockContract;
	@Prop(String) slotId: string|null;
	@Prop(String) mode: ResizeModes|null;
	@Prop(String) direction: ResizeDirection;
	@Prop(Function) onResize: Function;
	@Prop(HTMLElement) parentElement: HTMLElement;

	public handleDown(event: MouseEvent, direction: ResizeDirection) {
		resizeService.startResize(this.block.getId(), this.slotId || null, event, this.mode || ResizeModes.SELECT, direction);
	}

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

	get isDirectionAll(): boolean {
		return this.direction === ResizeDirection.ALL;
	}

	get isDirectionDirect(): boolean {
		return this.direction === ResizeDirection.DIRECT;
	}

	get isDirectionHorizontal(): boolean {
		return this.direction === ResizeDirection.HORIZONTAL;
	}

	get isDirectionVertical(): boolean {
		return this.direction === ResizeDirection.VERTICAL;
	}

	get isDirectionTop(): boolean {
		return this.direction === ResizeDirection.TOP;
	}

	get isDirectionRight(): boolean {
		return this.direction === ResizeDirection.RIGHT;
	}

	get isDirectionBottom(): boolean {
		return this.direction === ResizeDirection.BOTTOM;
	}

	get isDirectionLeft(): boolean {
		return this.direction === ResizeDirection.LEFT;
	}

	get resizeTop(): ResizeDirection {
		return ResizeDirection.TOP;
	}

	get resizeRight(): ResizeDirection {
		return ResizeDirection.RIGHT;
	}

	get resizeBottom(): ResizeDirection {
		return ResizeDirection.BOTTOM;
	}

	get resizeLeft(): ResizeDirection {
		return ResizeDirection.LEFT;
	}

	get resizeTopRight(): ResizeDirection {
		return ResizeDirection.TOP_RIGHT;
	}

	get resizeBottomRight(): ResizeDirection {
		return ResizeDirection.BOTTOM_RIGHT;
	}

	get resizeBottomLeft(): ResizeDirection {
		return ResizeDirection.BOTTOM_LEFT;
	}

	get resizeTopLeft(): ResizeDirection {
		return ResizeDirection.TOP_LEFT;
	}
}