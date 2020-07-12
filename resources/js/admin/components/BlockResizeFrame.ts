import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <div :class="bem('block-resize-frame').classes()"></div>
	`,
})
export class BlockResizeFrame extends Vue {}