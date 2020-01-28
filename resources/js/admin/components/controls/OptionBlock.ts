import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Option} from "../../models/Option";

@Component({
	template: `
        <div :class="bem('option').classes()">
            <input :class="bem('option').el('control').classes()" :id="block.id" :name="block.id + '[]'" :value="block.id" type="checkbox">
            <label :class="bem('option').el('checkbox').classes()" :for="block.id">
                <span :class="bem('option').el('checkbox-inner').classes()">
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
                <span :class="bem('option').el('label').classes()">{{ block.text }}</span>
            </label>
        </div>
	`,
})
export class OptionBlock extends Vue {
	@Prop(Option) readonly block: Option;
}