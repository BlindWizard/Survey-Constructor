import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Locale} from "../../../models/Locale";
import {getters} from "../../../stores/types";
import {Container} from "../../../models/Container";

@Component({
template: `
    <portal to="edit-modal">
        <div :class="bem('container').add('edit-modal reveal').classes()" v-component-drop-target>
            <button :class="bem('button').add('primary').classes()" @click="onSave">
                <span :class="bem('button').el('label').classes()">{{ locale.saveLabel }}</span>
            </button>
        </div>
    </portal>
`,
})
export class ContainerBlockEdit extends Vue {
@Prop(Container) readonly block: Container;
@Prop(Function) onSave: Function;

get locale(): Locale {
		return this.$store.getters[getters.LOCALE];
	}
}