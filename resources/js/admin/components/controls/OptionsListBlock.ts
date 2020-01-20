import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

@Component({
	template: `
        <div :class="bem('options-list').classes()">
            <p :key="option.id" v-for="option in block.options">
                <input :id="option.id" :name="block.id + '[]'" :value="option.id" type="radio"/>
                <label :for="option.id">{{ option.text }}</label>
            </p>
        </div>
	`,
})
export class OptionsListBlock extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}