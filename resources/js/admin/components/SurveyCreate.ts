import Component from "vue-class-component";
import Vue from "vue";
import {actions} from "../stores/types";

@Component({
	template: `
		<div :class="bem('create-block').add('cell medium-3 small-6').classes()" @click="getTemplates()">
			<div :class="bem('create-block').el('wrapper').classes()">
				<div :class="bem('create-block').el('inner').classes()">
					<div :class="bem('create-block').el('label').is('up').classes()">create</div>
					<div :class="bem('create-block').el('button').classes()">
						<i :class="bem('create-block').el('icon').add('fi-plus').classes()"/>
					</div>
					<div :class="bem('create-block').el('label').is('down').classes()">new survey</div>
				</div>
			</div>
		</div>
	`,
})
export class SurveyCreate extends Vue
{
	public getTemplates() {
		this.$store.dispatch(actions.SHOW_TEMPLATES).then(() => {
			this.$router.push({name: 'templates-page'});
		});
	}
}