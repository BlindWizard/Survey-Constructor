import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

@Component({
	template: `
		<div :class="bem('options-list').classes()">
			<p><input name="dzen" type="radio" value="1">Раз</p>
			<p><input name="dzen" type="radio" value="2">Два</p>
			<p><input name="dzen" type="radio" value="3">Три</p>
		</div>
	`,
})
export class OptionsListBlock extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}