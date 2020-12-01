import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {BlockContract} from "../contracts/BlockContract";
import {BlockStyle} from "../models/BlockStyle";
import {Locale} from "../models/Locale";
import {actions, getters} from "../stores/types";
import {AddBlockAction} from "../api/requests/AddBlockAction";
import {DeleteBlockAction} from "../api/requests/DeleteBlockAction";
import {SaveActionData} from "../api/requests/SaveActionData";
import {BlockAction} from "../models/BlockAction";
import {ActionCondition} from "../models/ActionCondition";
import {SurveyContract} from "../contracts/SurveyContract";
const uuidv4 = require('uuid/v4');

@Component({
	template: `
        <portal to="actions-block">
            <div :class="bem('block-style').classes()">
                <div :class="bem('block-style').el('size-label').classes()">Actions</div>
                <div v-for="action of block.getActions()" :class="bem('block-style').el('size').classes()">
                    <div :class="bem('block-style').el('size-label').classes()">On: {{ action.type }}</div>
                    <div :class="bem('block-style').el('action-row').classes()">
                        <select @change="updateActionHandle(action, $event)" :value="action.handle">
                            <option value="null" disabled selected>Select event type</option>
                            <option v-for="(label, type) in actionsHandles" :value="type">{{ label }}</option>
                        </select>
                    </div>
                    <div v-if="'go-to-page' === action.handle">
                        <select @change="updateActionPage(action, $event)" :value="action.data ? action.data.pageId : null">
                            <option value="null" disabled selected>Select page</option>
                            <option v-for="(step, pageId) in pagesSelector" :value="pageId">{{ step }}</option>
                        </select>
                    </div>
                    <div v-for="condition in action.conditions">
                        <select :value="condition.expected" @change="updateExpected(action, condition, $event)">
                            <option value="null" disabled selected>Select variable</option>
                            <option v-for="variable of variables" value="variable">{{ variable }}</option>
                        </select>
                        <select :value="condition.comparison" @change="updateComparison(action, condition, $event)">
                            <option value="null" disabled selected>Comparison</option>
                            <option value="lt">Lower than</option>
                            <option value="eq">Equal</option>
                            <option value="gt">Greater than</option>
                        </select>
                        <input :value="condition.got" @change="updateGot(action, condition, $event)"/>
                    </div>
                    <button :class="bem('button').add('primary').classes()" v-on:click.stop="addActionCondition(action)">
                        <span :class="bem('button').el('label').classes()">Add condition</span>
                    </button>
                    <button :class="bem('button').add('secondary').classes()" v-on:click.stop="deleteAction(action.id)">
                        <span :class="bem('button').el('label').classes()">Delete</span>
                    </button>
                </div>
                <div :class="bem('block-style').el('size').classes()">
                    <div :class="bem('block-style').el('add-row').classes()">
                        <div :class="bem('block-style').el('size-label').classes()">
                          New action
                        </div>
                        <select v-model="type">
                            <option value="null" disabled selected>Select action type</option>
                            <option v-for="(label, type) in actionsTypes" :value="type">{{ label }}</option>
                        </select>
                        <button :class="bem('button').is('secondary').classes()" v-on:click.stop="addAction">
                            <span :class="bem('button').el('label').classes()">Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </portal>
	`
})
export class ActionsEdit extends Vue {
	@Prop(Object) readonly block: BlockContract;
	@Prop(BlockStyle) readonly blockStyle: BlockStyle;

	private type: string|null = null;

	public addAction()
	{
		if (null === this.type) {
			return;
		}

		let request = new AddBlockAction();
		request.id = uuidv4();
		request.type = this.type;
		request.blockId = this.block.getId();

		this.$store.dispatch(actions.ADD_ACTION, request);
	}

	public addActionCondition(action: BlockAction)
	{
		let request = new SaveActionData();
		request.id = action.id;
		request.blockId = this.block.getId();
		request.handle = action.handle;
		request.data = action.data;
		request.conditions = action.conditions;

		let condition = new ActionCondition();
		condition.id = uuidv4();

		request.conditions.push(condition);

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
	}

	public deleteAction(id: string)
	{
		let request = new DeleteBlockAction();
		request.id = id;
		request.blockId = this.block.getId();

		this.$store.dispatch(actions.DELETE_ACTION, request);
	}

	public updateActionHandle(action: BlockAction, event: InputEvent)
	{
		let request = new SaveActionData();
		request.id = action.id;
		request.blockId = this.block.getId();
		request.handle = (event.target as HTMLInputElement).value;
		request.data = null;

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
	}

	public updateActionPage(action: BlockAction, event: InputEvent)
	{
		let request = new SaveActionData();
		request.id = action.id;
		request.blockId = this.block.getId();
		request.handle = action.handle;

		let data = action.data || {};
		data['pageId'] = (event.target as HTMLInputElement).value;

		request.data = data;

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
	}

	public updateComparison(action: BlockAction, condition: ActionCondition, event: InputEvent)
	{
		let request = new SaveActionData();
		request.id = action.id;
		request.blockId = this.block.getId();
		request.handle = action.handle;
		request.data = action.data;
		request.conditions = action.conditions;

		for (let conditionChange of request.conditions) {
			if (conditionChange.id === condition.id) {
				conditionChange.comparison = (event.target as HTMLInputElement).value;
			}
		}

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
	}

	public updateExpected(action: BlockAction, condition: ActionCondition, event: InputEvent)
	{
		let request = new SaveActionData();
		request.id = action.id;
		request.blockId = this.block.getId();
		request.handle = action.handle;
		request.data = action.data;
		request.conditions = action.conditions;

		for (let conditionChange of request.conditions) {
			if (conditionChange.id === condition.id) {
				conditionChange.expected = (event.target as HTMLInputElement).value;
			}
		}

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
	}

	public updateGot(action: BlockAction, condition: ActionCondition, event: InputEvent)
	{
		let request = new SaveActionData();
		request.id = action.id;
		request.blockId = this.block.getId();
		request.handle = action.handle;
		request.data = action.data;
		request.conditions = action.conditions;

		for (let conditionChange of request.conditions) {
			if (conditionChange.id === condition.id) {
				conditionChange.got = (event.target as HTMLInputElement).value;
			}
		}

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
	}

	get variables(): Object
	{
		if (null === this.survey) {
			return {};
		}

		let variables = [];

		for (let key of Object.keys(this.survey.getDataset())) {
			let dataset = this.survey.getDataset()[key];

			for (let data of dataset.data) {
				variables.push(dataset.type + '.' + data.name);
			}
		}

		return variables;
	}

	get actionsTypes(): Object
	{
		return this.$store.getters[getters.ACTIONS_TYPES];
	}

	get actionsHandles(): Object
	{
		return this.$store.getters[getters.ACTIONS_HANDLES];
	}

	get pagesSelector(): Object
	{
		let pages = {};
		let pagesByStep = this.$store.getters[getters.PAGES];
		for (let step of Object.keys(pagesByStep)) {
			pages[pagesByStep[step].getId()] = (Number(step) + 1);
		}

		return pages;
	}

	get survey(): SurveyContract|null {
		return this.$store.getters[getters.SURVEY];
	}
}