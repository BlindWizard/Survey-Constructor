import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";
import {PageContract} from "../contracts/PageContract";
import {SurveyContract} from "../contracts/SurveyContract";
import {Sections} from "../contracts/Sections";
import {Survey} from "../models/Survey";
import {AddData} from "../api/requests/AddData";

@Component({
	template: `
        <div class="grid-container fluid">
            <div class="grid-x grid-padding-x">
                <div class="grid-y grid-padding-y medium-2 dark">
                    <div class="edit-modal">
                        <h4>Data type</h4>
                        <select v-model="dataType">
                            <option value="null" disabled selected>Select type</option>
                            <option v-for="(label, type) in dataTypes" :value="type">{{ label }}</option>
                        </select>
                        <button :class="bem('button').is('secondary').classes()" @click="addData()">
                            <span :class="bem('button').el('label').classes()">Add</span>
                        </button>
                    </div>
                </div>
                <div v-if="null !== survey" class="grid-y grid-padding-y medium-10">
                    <div class="dataset__view">
                        <h2>Survey {{ survey.title }}</h2>
                        <table>
                            <thead>
                                <tr>
                                  <th>Variable</th>
                                  <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                  <td></td>
                                  <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
	`,
	components: {
	}
})
export class SurveyDataset extends Vue {
	@Prop(String) readonly surveyId: string;
	private dataType: string|null = null;

	public mounted() {
		if (null === this.survey) {
			let request = new GetSurvey();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY, request);
		}

		this.$store.dispatch(actions.SET_SECTION, Sections.EDITOR);
	}

	public addData() {
		if (null === this.dataType) {
			return;
		}

		let request = new AddData();
		request.surveyId = this.surveyId;
		request.dataType = this.dataType;

		this.$store.dispatch(actions.ADD_DATA, request);
	}

	get dataTypes(): Object
	{
		return this.$store.getters[getters.DATA_TYPES];
	}

	get survey(): Survey|null
	{
		return this.$store.getters[getters.SURVEY];
	}
}