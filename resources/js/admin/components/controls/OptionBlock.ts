import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Option} from "../../models/Option";

@Component({
	template: `
        <div :class="bem('option').classes()">
            <input :id="block.id" :name="block.id + '[]'" :value="block.id" type="checkbox"/>
            <label :for="block.id">{{ block.text }}</label>
        </div>
	`,
})
export class OptionBlock extends Vue {
	@Prop(Option) readonly block: Option;
}