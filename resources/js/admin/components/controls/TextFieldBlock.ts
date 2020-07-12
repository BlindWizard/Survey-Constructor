import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {TextField} from "../../models/TextField";
var debounce = require('debounce');

@Component({
	template: `
        <div :class="bem('text-field').classes()">
            <label v-if="block.label">{{ block.label }}</label>
            <input v-if="!block.multiline" type="text" :class="bem('text-field').el('value').classes()" :placeholder="block.placeholder" @input="handle"/>
            <textarea v-if="block.multiline" type="text" :class="bem('text-field').el('value').classes()" :placeholder="block.placeholder" rows="5" @input="handle"/>
        </div>
	`,
})
export class TextFieldBlock extends Vue {
	@Prop(TextField) readonly block: TextField;
	@Prop(Function) readonly handler: Function|null;

	get handle() {
		return debounce((event: Event) => {
			if (!this.handler) {
				return;
			}

			this.handler(this, event);
		}, 500);
	}
}