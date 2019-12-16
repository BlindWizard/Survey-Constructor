import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

@Component({
	template: `
		<div :class="bem('options-list').classes()">
			<p><input name="dzen" type="radio" value="1"><input/></p>
			<p><input name="dzen" type="radio" value="2"><input/></p>
			<p><input name="dzen" type="radio" value="3"><input/></p>
		</div>
	`,
})
export class OptionsListBlockEdit extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}