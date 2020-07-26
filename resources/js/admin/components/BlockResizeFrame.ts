import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {ResizeModes} from "../contracts/ResizeModes";
import {ResizeDirection} from "../contracts/ResizeDirection";
import {resizeService} from "../services/ResizeService";

@Component({
	template: `
        <div :class="bem('block-resize-frame').is(mode || 'select').classes()">
            <span v-if="mode && (isDirectionAll || isDirectionVertical || isDirectionTop)"
                  :class="bem('block-resize-frame').el('pin').is('top').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeTop)" v-on:click.prevent>
            </span>
            <span v-if="mode && (isDirectionAll || isDirectionHorizontal || isDirectionRight)"
                  :class="bem('block-resize-frame').el('pin').is('right').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeRight)">
            </span>
            <span v-if="mode && (isDirectionAll || isDirectionVertical || isDirectionBottom)"
                  :class="bem('block-resize-frame').el('pin').is('bottom').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeBottom)">
            </span>
            <span v-if="mode && (isDirectionAll || isDirectionHorizontal || isDirectionLeft)"
                  :class="bem('block-resize-frame').el('pin').is('left').classes()"
                  v-on:mousedown.stop="handleDown($event, resizeLeft)">
            </span>
        </div>
	`,
})
export class BlockResizeFrame extends Vue {
	@Prop(String) blockId: string;
	@Prop(String) slotId: string|null;
	@Prop(String) mode: ResizeModes|null;
	@Prop(String) direction: ResizeDirection;
	@Prop(Function) onResize: Function;

	public handleDown(event: MouseEvent, direction: ResizeDirection) {
		resizeService.startResize(this.blockId, this.slotId || null, event, this.mode || ResizeModes.SELECT, direction);
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
}