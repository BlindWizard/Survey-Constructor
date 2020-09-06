import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {BlockContract} from "../contracts/BlockContract";
import {BlockStyle} from "../models/BlockStyle";
import {Locale} from "../models/Locale";
import {actions, getters} from "../stores/types";
import {AddBlockAction} from "../api/requests/AddBlockAction";
const uuidv4 = require('uuid/v4');

@Component({
	template: `
        <portal to="actions-block">
            <div class="grid-container">
                <div :class="bem('block-style').classes()">
                    <div :class="bem('block-style').el('size').classes()">
                        <div :class="bem('block-style').el('size-label').classes()">
                            Actions
                        </div>
                    </div>
                    <div>
                        <select v-model="type">
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

	get actionsTypes(): Locale
	{
		return this.$store.getters[getters.ACTIONS_TYPES];
	}
}