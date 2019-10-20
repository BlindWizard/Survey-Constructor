import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<div class="cell medium-3 small-6" :class="bem('add-block').toString()">
			<div :class="bem('add-block').el('wrapper').toString()">
				<div :class="bem('add-block').el('inner').toString()">
					<div :class="bem('add-block').el('label').is('up').toString()">create</div>
					<div :class="bem('add-block').el('button').toString()">
						<i class="fi-plus" :class="bem('add-block').el('icon').toString()"/>
					</div>
					<div :class="bem('add-block').el('label').is('down').toString()">new survey</div>
				</div>
			</div>
		</div>
	`,
})
export class AddBlock extends Vue {}