import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Option} from "../../../models/Option";

@Component({
	template: `
        <div :class="bem('option').classes()" v-component-drop-target>
            <input v-model="option.text" type="text" />
        </div>
	`,
})
export class OptionBlockEdit extends Vue {
	@Prop(Option) readonly block: Option;
}