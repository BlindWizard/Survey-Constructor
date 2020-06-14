import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
        <div :class="bem('sidebar-menu').classes()">
            <span :class="bem('sidebar-menu').el('header').classes()">Elements</span>
            <ul :class="bem('vertical menu').classes()">
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <a :class="bem('sidebar-menu').el('link').classes()" v-component-drag.create="'container'">
                        Container
                        <i :class="bem('sidebar-menu').el('icon').add('fi-flag').classes()"></i>
                    </a>
                </li>
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <a :class="bem('sidebar-menu').el('link').classes()" v-component-drag.create="'header'">
                        Header
                        <i :class="bem('sidebar-menu').el('icon').add('fi-flag').classes()"></i>
                    </a>
                </li>
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <a :class="bem('sidebar-menu').el('link').classes()" v-component-drag.create="'options-list'">
                        Options List
                        <i :class="bem('sidebar-menu').el('icon').add('fi-list-thumbnails').classes()"></i>
                    </a>
                </li>
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <a :class="bem('sidebar-menu').el('link').classes()" v-component-drag.create="'option'">
                        Single checkbox
                        <i :class="bem('sidebar-menu').el('icon').add('fi-checkbox').classes()"></i>
                    </a>
                </li>
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <a :class="bem('sidebar-menu').el('link').classes()" v-component-drag.create="'text'">
                        Label
                        <i :class="bem('sidebar-menu').el('icon').add('fi-pencil').classes()"></i>
                    </a>
                </li>
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <a :class="bem('sidebar-menu').el('link').classes()" v-component-drag.create="'text-field'">
                        Text field
                        <i :class="bem('sidebar-menu').el('icon').add('fi-page').classes()"></i>
                    </a>
                </li>
            </ul>
        </div>
    `,
})
export class ComponentsMenu extends Vue {}
