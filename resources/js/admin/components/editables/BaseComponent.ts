import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {BlockContract} from "../../contracts/BlockContract";
import {Option} from "../../models/Option";

export class BaseComponent extends Vue implements Draggable {
	@Prop(Object) readonly block: BlockContract;
	protected editing: boolean = false;
	protected blockData: Option;

	public draggable(): boolean
	{
		return !this.editing;
	}

	public getType(): string
	{
		return this.block.getType();
	}
}