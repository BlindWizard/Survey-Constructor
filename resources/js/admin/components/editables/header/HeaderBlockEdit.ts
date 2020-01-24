import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Header} from "../../../models/Header";

@Component({
	template: `
        <div :class="bem('header').classes()" v-component-drop-target>
            <input v-model="block.text" type="text" />
        </div>
	`,
})
export class HeaderBlockEdit extends Vue {
	@Prop(Header) readonly block: Header;
}