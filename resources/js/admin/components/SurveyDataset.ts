import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";
import {PageContract} from "../contracts/PageContract";
import {SurveyContract} from "../contracts/SurveyContract";
import {Sections} from "../contracts/Sections";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="grid-y grid-padding-y medium-2 dark">
                    <select>
                        <option value="null" disabled selected>Select data type</option>
                        <option v-for="(label, type) in dataTypes" :value="type">{{ label }}</option>
                    </select>
                    <button :class="bem('button').is('run').classes()">
                        <span :class="bem('button').el('label').classes()">Add</span>
                    </button>
                </div>
                <div class="grid-y grid-padding-y medium-10">
                    
                </div>
            </div>
        </div>
	`,
	components: {
	}
})
export class SurveyDataset extends Vue {
	@Prop(String) readonly surveyId: string;

	get dataTypes(): Object
	{
		return this.$store.getters[getters.DATA_TYPES];
	}
}