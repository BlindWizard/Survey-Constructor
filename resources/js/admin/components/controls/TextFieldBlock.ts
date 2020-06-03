import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {TextField} from "../../models/TextField";

@Component({
	template: `
        <div :class="bem('text-field').classes()">
            <input type="text" :class="bem('text-field').el('value').classes()" :value="block.text"/>
        </div>
	`,
})
export class TextFieldBlock extends Vue {
	@Prop(TextField) readonly block: TextField;
}