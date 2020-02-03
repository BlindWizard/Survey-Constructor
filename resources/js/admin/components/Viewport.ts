import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <div :class="bem('viewport').classes()">
            <div :class="bem('viewport').el('inner').classes()">
                <slot/>
            </div>
        </div>
	`,
})
export class Viewport extends Vue {}
