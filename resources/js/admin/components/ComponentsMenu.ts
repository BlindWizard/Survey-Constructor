import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <div :class="bem('components-menu').add('medium-2').classes()">
            <span :class="bem('components-menu').el('header').classes()">Elements</span>
            <ul :class="bem('vertical menu').classes()">
                <li :class="bem('components-menu').el('item').classes()">
                    <a :class="bem('components-menu').el('link').classes()" v-component-drag.create="'header'">
                        Header
                        <i :class="bem('components-menu').el('icon').add('fi-flag').classes()"></i>
                    </a>
                </li>
                <li :class="bem('components-menu').el('item').classes()">
                    <a :class="bem('components-menu').el('link').classes()" v-component-drag.create="'options-list'">
                        Options List
                        <i :class="bem('components-menu').el('icon').add('fi-list-thumbnails').classes()"></i>
                    </a>
                </li>
                <li :class="bem('components-menu').el('item').classes()">
                    <a :class="bem('components-menu').el('link').classes()" v-component-drag.create="'option'">
                        Single check mark
                        <i :class="bem('components-menu').el('icon').add('fi-checkbox').classes()"></i>
                    </a>
                </li>
            </ul>
        </div>
    `,
})
export class ComponentsMenu extends Vue {}
