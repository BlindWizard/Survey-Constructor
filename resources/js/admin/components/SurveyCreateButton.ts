import Component from "vue-class-component";
import Vue from "vue";
import {actions} from "../stores/types";

@Component({
	template: `
        <div :class="bem('survey-preview').add('cell large-3 medium-6').is('filled').classes()" @click="getTemplates()">
            <div :class="bem('survey-preview').el('wrapper').classes()">
                <div :class="bem('survey-preview').el('inner').classes()">
                    <div :class="bem('survey-preview').el('label').is('up').classes()">create</div>
                    <div :class="bem('survey-preview').el('button').classes()">
                        <i :class="bem('survey-preview').el('icon').add('fi-plus').classes()" />
                    </div>
                    <div :class="bem('survey-preview').el('label').is('down').classes()">New survey</div>
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