import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<div class="cell medium-3 small-6" :class="bem('create-block').classes()">
			<router-link :to="{name: 'edit-survey'}">
				<div :class="bem('create-block').el('wrapper').classes()">
					<div :class="bem('create-block').el('inner').classes()">
						<div :class="bem('create-block').el('label').is('up').classes()">create</div>
						<div :class="bem('create-block').el('button').classes()">
							<i class="fi-plus" :class="bem('create-block').el('icon').classes()"/>
						</div>
						<div :class="bem('create-block').el('label').is('down').classes()">new survey</div>
					</div>
				</div>
			</router-link>
		</div>
	`,
})
export class SurveyCreate extends Vue {}