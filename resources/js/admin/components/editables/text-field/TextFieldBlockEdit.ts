import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {TextField} from "../../../models/TextField";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";

@Component({
	template: `
        <portal to="edit-modal">
            <div :class="bem('text-field').add('edit-modal reveal').classes()">
                <label>
                    Label
                    <input type="text" :class="bem('text-field').el('value').classes()" v-model="block.label" />
                </label>
                <label>
                    Placeholder
                    <input type="text" :class="bem('text-field').el('value').classes()" v-model="block.placeholder" />
                </label>
                <label>
                    Multiline?
                    <input type="checkbox" v-model="block.multiline" />
                </label>
            </div>
            <button :class="bem('button').add('primary').classes()" @click="onSave">{{ locale.saveLabel }}</button>
        </portal>
	`,
})
export class TextFieldBlockEdit extends Vue {
	@Prop(TextField) readonly block: TextField;
	@Prop(Function) onSave: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}