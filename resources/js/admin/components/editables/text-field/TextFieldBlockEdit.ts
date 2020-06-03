import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../../models/Text";
import {TextField} from "../../../models/TextField";

@Component({
	template: `
        <div :class="bem('text').classes()">
            <input type="text" v-model="block.text"/>
        </div>
	`,
})
export class TextFieldBlockEdit extends Vue {
	@Prop(TextField) readonly block: TextField;
}