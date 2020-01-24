import Vue from 'vue'
import {store} from "../stores/store";
import {getters} from "../stores/types";
import {ComponentsResolver} from "./ComponentsResolver";
import {BlockContract} from "../contracts/BlockContract";
import {BlockTypes} from "../contracts/BlockTypes";
import {OptionsList} from "../models/OptionsList";
import {Option} from "../models/Option";
import {BaseBlock} from "../components/editables/BaseBlock";
import {Header} from "../models/Header";
const uuidv4 = require('uuid/v4');

export class ComponentsFactory
{
	public static create(type: string, container: HTMLElement): BaseBlock
	{
		const resolver = new ComponentsResolver().setEditable();

		let ComponentClass = Vue.extend(resolver.resolveComponentClass(type));
		let defaultData = store.getters[getters.ELEMENT_DEFAULT_DATA](type);
		let instance = new ComponentClass({propsData: {block: defaultData}, store});
		instance.$mount();

		container.appendChild(instance.$el);

		return instance as BaseBlock;
	}

	public static getDefaultData(type: string): BlockContract
	{
		let blockData: any = store.getters[getters.ELEMENT_DEFAULT_DATA](type);
		let block: any = this.createElementFromData(type, blockData);
		block.id = uuidv4();

		return block as BlockContract;
	}

	public static createElementFromData(type: string, blockData: any)
	{
		let block: any;

		switch (type) {
			case BlockTypes.OPTIONS_LIST:
				block = new OptionsList();
				block.id = blockData.id;
				block.surveyId = blockData.surveyId;
				block.position = blockData.position;
				block.options = [];
				blockData.options.forEach((optionData: Object) => {
					block.options.push(this.createElementFromData(BlockTypes.OPTION, optionData));
				});
				block.multiple = blockData.multiple;

				break;
			case BlockTypes.OPTION:
				block = new Option();
				block.id = blockData.id;
				block.position = blockData.position;
				block.text = blockData.text;

				break;
			case BlockTypes.HEADER:
				block = new Header();
				block.id = blockData.id;
				block.position = blockData.position;
				block.text = blockData.text;

				break;
			default:
				throw new Error('Undefined block type');
		}

		return block;
	}
}