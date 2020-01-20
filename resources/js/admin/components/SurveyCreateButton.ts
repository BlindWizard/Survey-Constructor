import Component from "vue-class-component";
import Vue from "vue";
import {actions} from "../stores/types";

@Component({
	template: `
        <div :class="bem('create-block').add('cell large-3 medium-6').is('filled').classes()" @click="getTemplates()">
            <div :class="bem('create-block').el('wrapper').classes()">
                <div :class="bem('create-block').el('inner').classes()">
                    <div :class="bem('create-block').el('label').is('up').classes()">create</div>
                    <div :class="bem('create-block').el('button').classes()">
                        <i :class="bem('create-block').el('icon').add('fi-plus').classes()" />
                    </div>
                    <div :class="bem('create-block').el('label').is('down').classes()">new survey</div>
                </div>
            </div>
        </div>
	`,
})
export class SurveyCreateButton extends Vue
{
	public getTemplates() {
		this.$store.dispatch(actions.LOAD_TEMPLATES).then(() => {
			this.$router.push({name: 'templates-list'});
		});
	}
}