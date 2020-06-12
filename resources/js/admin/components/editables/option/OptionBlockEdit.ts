import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Option} from "../../../models/Option";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";

@Component({
	template: `
        <portal to="edit-modal">
            <div :class="bem('option').add('edit-modal reveal').classes()" v-component-drop-target>
                <input v-model="block.text" type="text" />
                <button :class="bem('button').add('primary').classes()" @click="onSave">{{ locale.saveLabel }}</button>
            </div>
        </portal>
	`,
})
export class OptionBlockEdit extends Vue {
	@Prop(Option) readonly block: Option;
	@Prop(Function) onSave: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}