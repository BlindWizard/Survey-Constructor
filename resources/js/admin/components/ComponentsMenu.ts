import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <div :class="bem('components-menu').add('medium-2').classes()">
	        <span :class="bem('components-menu').el('header').classes()">Elements</span>
            <ul :class="bem('vertical menu').classes()">
                <li :class="bem('components-menu').el('item').classes()">
                    <a :class="bem('components-menu').el('link').classes()" v-component-drag.create="'options-list'">Options List</a>
                </li>
                <li :class="bem('components-menu').el('item').classes()">
                    <a :class="bem('components-menu').el('link').classes()" v-component-drag.create="'option'">Single option</a>
                </li>
            </ul>
        </div>
	`,
})
export class ComponentsMenu extends Vue {}
