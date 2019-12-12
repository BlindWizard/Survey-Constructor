import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";

export class ComponentsResolver {
	public resolveComponent(block: BlockContract): string
	{
		switch (block.getType()) {
			case BlockTypes.OPTIONS_LIST:
				return 'OptionsListBlock';
			default:
				throw new Error('Undefined block type');
		}
	}
}