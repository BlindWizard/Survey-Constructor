import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {TextField} from "../../../models/TextField";

@Component({
	template: `
        <div :class="bem('text-field').classes()">
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
	`,
})
export class TextFieldBlockEdit extends Vue {
	@Prop(TextField) readonly block: TextField;
}