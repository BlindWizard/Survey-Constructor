import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

@Component({
	template: `
        <div :class="bem('options-list').classes()">
            <label :class="bem('options-list').el('option').classes()" :key="option.id" v-for="option in block.options">
                <input :class="bem('options-list').el('control').classes()" :id="option.id" :name="block.id + '[]'" :value="option.id" type="radio"/>
                <span :class="bem('options-list').el('radio').classes()"></span>
                <span :class="bem('options-list').el('label').classes()">
	                {{ option.text }}
                </span>
            </label>
        </div>
	`,
})
export class OptionsListBlock extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}