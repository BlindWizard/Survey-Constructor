import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <div :class="bem('components-menu').classes()">
        </div>
    `,
})
export class StatisticsReport extends Vue {}
