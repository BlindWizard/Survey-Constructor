import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {Viewport} from "./Viewport";

@Component({
	template: `
		<div :class="bem('new-surway').add('grid-container').classes()">
			<div class="grid-x grid-margin-x">
				<Viewport>
					Новый
				</Viewport>
			</div>
		</div>
	`,
	components: {
		Viewport
	}
})
export class SurveyEdit extends Vue {
	@Prop(String) readonly templateId: string;
}