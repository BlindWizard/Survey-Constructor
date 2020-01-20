import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {OptionsList} from "../../models/OptionsList";

export class BaseComponent extends Vue implements Draggable {
	@Prop(OptionsList) readonly block: OptionsList;

	draggable(): boolean
	{
		return false;
	}

	getType(): string
	{
		return this.block.getType();
	}
}