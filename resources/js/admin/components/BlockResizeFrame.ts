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
            <div :class="bem('block-resize-frame').el('background').classes()"></div>
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