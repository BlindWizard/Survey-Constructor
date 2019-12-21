import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

@Component({
	template: `
        <div :class="bem('options-list').classes()" v-component-drop-target>
            <p :key="id" v-for="(option, id) in block.options"><input :value="id" type="text">{{ option.name }}</p>
        </div>
	`,
})
export class OptionsListBlockEdit extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}