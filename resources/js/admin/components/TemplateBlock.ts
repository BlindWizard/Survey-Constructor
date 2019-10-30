import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Template} from "../models/Template";

@Component({
	template: `
		<div class="cell medium-3 small-6" :class="bem('create-block').classes()">
			<div :class="bem('create-block').el('wrapper').classes()">
				<div :class="bem('create-block').el('inner').classes()">
					{{ template.title }}
				</div>
			</div>
		</div>
	`,
})
export class TemplateBlock extends Vue {
	@Prop(Template) readonly template: Template;
}
