import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Header} from "../../models/Header";

@Component({
	template: `
        <div :class="bem('header').classes()">
            <div :class="bem('header').el('image').classes()">
                <div :class="bem('main-logo').classes()"></div>
            </div>
            <h1 :class="bem('header').el('label').classes()">{{ block.text }}</h1>
        </div>
	`,
})
export class HeaderBlock extends Vue {
	@Prop(Header) readonly block: Header;
}