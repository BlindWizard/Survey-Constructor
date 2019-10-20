import Component from "vue-class-component";
import Vue from "vue";
import {Header} from "./Header";
import {SurveyList} from "./SurveyList";

@Component({
	template: `
		<div class="grid-y">
			<div class="cell" :class="bem('top-menu').toString()">
				<Header/>
			</div>
			<div class="cell">
				<SurveyList/>
			</div>
		</div>
	`,
	components: {
		Header,
		SurveyList,
	}
})
export class Application extends Vue {}
