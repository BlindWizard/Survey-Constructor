import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {actions, getters} from "../stores/types";
import {GetSurvey} from "../api/requests/GetSurvey";
import {Sections} from "../contracts/Sections";
import {Survey} from "../models/Survey";
import {AddSurveyData} from "../api/requests/AddSurveyData";
import {SaveSurveyData} from "../api/requests/SaveSurveyData";
import {VariableData} from "../models/VariableData";
import {ComponentsFactory} from "../services/ComponentsFactory";
import {SectionsFactory} from "../services/SectionsFactory";

const uuidv4 = require('uuid/v4');

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
                        <div v-for="dataset in survey.data">
                            {{ dataset.type }}
                            <div v-if="dataset.type == 'poll-variants'">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Variable</th>
                                        <th>Value</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="variable in dataset.data">
                                            <td>
                                                <input type="text" :name="variable.name" :id="variable.id" data-name :value="variable.name" @input="saveDataName(dataset.id, $event)">
                                            </td>
                                            <td>
                                                <input type="text" :name="variable.name" :id="variable.id" data-value :value="variable.value" @input="saveDataValue(dataset.id, $event)">
                                            </td>
                                            <td>
                                                <button :class="bem('button').add('secondary').classes()" v-on:click.stop="deleteData(dataset.id, variable.id)">
                                                    <span :class="bem('button').el('label').classes()">Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                          <td>
                                              <input type="text" @input="addVariableByName(dataset.id, $event)">
                                          </td>
                                          <td>
                                              <input type="text" @input="addVariableByValue(dataset.id, $event)">
                                          </td>
                                          <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`,
	components: {
	}
})
export class SurveyDatasetEdit extends Vue {
	@Prop(String) readonly surveyId: string;
	private dataType: string|null = null;

	public mounted() {
		if (null === this.survey) {
			let request = new GetSurvey();
			request.surveyId = this.surveyId;

			this.$store.dispatch(actions.LOAD_SURVEY, request);
		}

		this.$store.dispatch(actions.SET_SECTION, SectionsFactory.get(Sections.EDITOR));
	}

	public addData() {
		if (null === this.dataType) {
			return;
		}

		let request = new AddSurveyData();
		request.surveyId = this.surveyId;
		request.datasetId = uuidv4();
		request.dataType = this.dataType;

		this.$store.dispatch(actions.ADD_SURVEY_DATA, request);
	}

	public saveDataName(id: string, event: KeyboardEvent)
	{
		if (null === this.survey) {
			return;
		}

		let dataset = this.survey.getDataset()[id] || null;
		if (null === dataset) {
			return;
		}

		dataset = ComponentsFactory.cloneDataset(dataset);

		let element = (event.target as HTMLInputElement);

		let data = (dataset.data || []) as VariableData[];
		for (let i of Object.keys(data)) {
			let variableCurrent = data[i];

			if (variableCurrent.id === element.id) {
				let newVariable = new VariableData();
				newVariable.id = element.id;
				newVariable.name = element.value;
				newVariable.value = variableCurrent.value;

				data[i] = newVariable;

				break;
			}
		}

		let request = new SaveSurveyData();
		request.surveyId = this.survey.getId();
		request.datasetId = id;
		request.datasetType = dataset.type;
		request.data = data;

		this.$store.dispatch(actions.SAVE_SURVEY_DATA, request);
	}

	public saveDataValue(id: string, event: KeyboardEvent)
	{
		if (null === this.survey) {
			return;
		}

		let dataset = this.survey.getDataset()[id] || null;
		if (null === dataset) {
			return;
		}

		dataset = ComponentsFactory.cloneDataset(dataset);

		let element = (event.target as HTMLInputElement);

		let data = (dataset.data || []) as VariableData[];
		for (let i of Object.keys(data)) {
			let variableCurrent = data[i];

			if (variableCurrent.id === element.id) {
				let newVariable = new VariableData();
				newVariable.id = element.id;
				newVariable.name = variableCurrent.name;
				newVariable.value = element.value;

				data[i] = newVariable;

				break;
			}
		}

		let request = new SaveSurveyData();
		request.surveyId = this.survey.getId();
		request.datasetId = id;
		request.datasetType = dataset.type;
		request.data = data;

		this.$store.dispatch(actions.SAVE_SURVEY_DATA, request);
	}

	public deleteData(dataId: string, variableId: string)
	{
		if (null === this.survey) {
			return;
		}

		let dataset = this.survey.getDataset()[dataId] || null;
		if (null === dataset) {
			return;
		}

		dataset = ComponentsFactory.cloneDataset(dataset);

		let data = (dataset.data || []) as VariableData[];

		data = data.filter((variable: VariableData) => {
			return variable.id !== variableId;
		});

		let request = new SaveSurveyData();
		request.surveyId = this.survey.getId();
		request.datasetId = dataId;
		request.datasetType = dataset.type;
		request.data = data;
2
		this.$store.dispatch(actions.SAVE_SURVEY_DATA, request);
	}


	public addVariableByName(id: string, event: KeyboardEvent)
	{
		if (null === this.survey) {
			return;
		}

		let dataset = this.survey.getDataset()[id] || null;
		if (null === dataset) {
			return;
		}

		dataset = ComponentsFactory.cloneDataset(dataset);

		let element = (event.target as HTMLInputElement);

		let variable = new VariableData();
		variable.id = uuidv4();
		variable.name = element.value;

		let variables = dataset.data || [];
		variables.push(variable);

		let request = new SaveSurveyData();
		request.surveyId = this.survey.getId();
		request.datasetId = id;
		request.datasetType = dataset.type;
		request.data = variables;

		this.$store.dispatch(actions.SAVE_SURVEY_DATA, request).then(() => {
			let target = document.querySelectorAll('input[data-name]');
			if (target) {
				(Array.from(target).pop() as HTMLInputElement).focus();
			}
		});

		element.value = '';
	}

	public addVariableByValue(id: string, event: KeyboardEvent)
	{
		if (null === this.survey) {
			return;
		}

		let dataset = this.survey.getDataset()[id] || null;
		if (null === dataset) {
			return;
		}

		dataset = ComponentsFactory.cloneDataset(dataset);

		let element = (event.target as HTMLInputElement);

		let variable = new VariableData();
		variable.id = uuidv4();
		variable.value = element.value;

		let variables = dataset.data || [];
		variables.push(variable);

		let request = new SaveSurveyData();
		request.surveyId = this.survey.getId();
		request.datasetId = id;
		request.datasetType = dataset.type;
		request.data = variables;

		this.$store.dispatch(actions.SAVE_SURVEY_DATA, request).then(() => {
			let target = document.querySelectorAll('input[data-value]');
			if (target) {
				(Array.from(target).pop() as HTMLInputElement).focus();
			}
		});

		element.value = '';
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