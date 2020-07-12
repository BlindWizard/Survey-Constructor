import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Text} from "../../models/Text";

@Component({
	template: `
        <div :class="bem('text').classes()">
            <span :class="bem('text').el('value').classes()">{{ block.text }}</span>
        </div>
	`,
})
export class TextBlock extends Vue {
	@Prop(Text) readonly block: Text;
}