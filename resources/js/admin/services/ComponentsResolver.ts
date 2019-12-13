import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class ComponentsResolver {
	protected editable: boolean = false;

	public resolveComponent(block: BlockContract): string
	{
		switch (block.getType()) {
			case BlockTypes.OPTIONS_LIST:
				return 'OptionsListBlock' + (this.editable ? 'Editable' : '');
			default:
				throw new Error('Undefined block type');
		}
	}

	public setEditable(editable: boolean): ComponentsResolver
	{
		this.editable = editable;
		return this;
	}
}