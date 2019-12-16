import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<ul :class="bem('components-menu').add('medium-2 vertical menu').classes()">
			<li :class="bem('components-menu').el('item').classes()">
				<a :class="bem('components-menu').el('link').classes()" v-component-drag.create="'options-list'">Radio List</a>
			</li>
		</ul>
	`,
})
export class ComponentsMenu extends Vue {}
