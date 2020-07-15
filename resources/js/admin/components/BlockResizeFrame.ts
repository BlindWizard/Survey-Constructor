import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {FrameModes} from "../contracts/FrameModes";

@Component({
	template: `
        <div :class="bem('block-resize-frame').is(frameMode).classes()">
            <span :class="bem('block-resize-frame').el('pin').is('top').classes()" v-on:mousedown.stop=""></span>
            <span :class="bem('block-resize-frame').el('pin').is('right').classes()"></span>
            <span :class="bem('block-resize-frame').el('pin').is('bottom').classes()"></span>
            <span :class="bem('block-resize-frame').el('pin').is('left').classes()"></span>
        </div>
	`,
})
export class BlockResizeFrame extends Vue {
	@Prop(String) mode: string;

	get frameMode(): string {
		if (!this.mode) {
			return FrameModes.SELECT;
		}

		return this.mode;
	}
}