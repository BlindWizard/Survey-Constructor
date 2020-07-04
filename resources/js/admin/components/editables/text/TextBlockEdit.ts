import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../../models/Text";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";

@Component({
	template: `
        <portal to="edit-modal">
            <div :class="bem('edit-modal').add('reveal').classes()">
                <input type="text" v-model="block.text" />
                <button :class="bem('button').add('primary').classes()" v-on:click.stopЗ="onSave">
                    <span :class="bem('button').el('label').classes()">{{ locale.saveLabel }}</span>
                </button>
            </div>
        </portal>
	`,
})
export class TextBlockEdit extends Vue {
	@Prop(Text) readonly block: Text;
	@Prop(Function) onSave: Function;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}
}