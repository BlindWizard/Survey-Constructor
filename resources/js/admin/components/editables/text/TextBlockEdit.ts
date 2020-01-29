import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../../models/Text";

@Component({
	template: `
        <div :class="bem('text').classes()">
            <input type="text" v-model="block.text"/>
        </div>
	`,
})
export class TextBlockEdit extends Vue {
	@Prop(Text) readonly block: Text;
}