import Component from "vue-class-component";
import Vue from "vue";
import {AddBlock} from "./common/AddBlock";

@Component({
	template: `
		<div class="grid-container" :class="bem('survey-list').toString()">
			<div class="grid-x grid-margin-x">
				<AddBlock/>
			</div>
		</div>
	`,
	components: {
		AddBlock,
	}
})
export class SurveyList extends Vue {}