import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Button} from "../../models/Button";

@Component({
	template: `
        <button :class="bem('button').is('primary').classes()">
            <span :class="bem('button').el('label').classes()">{{ block.text }}</span>
        </button>
	`,
})
export class ButtonBlock extends Vue {
	@Prop(Button) readonly block: Button;
}