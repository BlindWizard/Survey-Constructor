import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Header} from "../../models/Header";

@Component({
	template: `
        <div :class="bem('header').classes()">
            <h1>{{ block.text }}</h1>            
        </div>
	`,
})
export class HeaderBlock extends Vue {
	@Prop(Header) readonly block: Header;
}