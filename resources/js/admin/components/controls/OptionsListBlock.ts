import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

@Component({
	template: `
		<div :class="bem('options-list').classes()">
			<p :key="id" v-for="(option, id) in block.options">
				<input :value="id" type="radio">{{ option.name }}
                <label :for="id">{{ option.text }}</label>
            </p>
		</div>
	`,
})
export class OptionsListBlock extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}