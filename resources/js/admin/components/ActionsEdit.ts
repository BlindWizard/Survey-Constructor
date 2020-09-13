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
const uuidv4 = require('uuid/v4');

@Component({
	template: `
        <portal to="actions-block">
	        <div :class="bem('block-style').classes()">
                <div :class="bem('block-style').el('size').classes()">
                    <div :class="bem('block-style').el('size-label').classes()">
                        Actions
                    </div>
                </div>
                <div v-for="action of block.getActions()" :class="bem('block-style').classes()">
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
		request.data = {
			pageId: (event.target as HTMLInputElement).value
		};

		this.$store.dispatch(actions.SAVE_ACTION_DATA, request);
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
}