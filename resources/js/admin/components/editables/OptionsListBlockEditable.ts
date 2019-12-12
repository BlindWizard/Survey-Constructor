import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";
import {OptionsListBlock} from "../controls/OptionsListBlock";

@Component({
	template: `
		<OptionsListBlock :block="block" v-component-drag/>
	`,
	components: {
		OptionsListBlock,
	}
})
export class OptionsListBlockEditable extends Vue {
	@Prop(OptionsList) readonly block: OptionsList;
}