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
import {Text} from "../models/Text";
import {TextField} from "../models/TextField";
import {Container} from "../models/Container";
import {Image} from "../models/Image";
import {BlockStyle} from "../models/BlockStyle";
import {Button} from "../models/Button";
import {Rectangle} from "../models/Rectangle";
import {Delimiter} from "../models/Delimiter";
import {BlockAction} from "../models/BlockAction";
import {SurveyData} from "../models/SurveyData";
import {VariableData} from "../models/VariableData";
const uuidv4 = require('uuid/v4');

export class ComponentsFactory {
	public static create(type: string, container: HTMLElement): BaseBlock {
		const resolver = new ComponentsResolver().setEditable();

		let ComponentClass = Vue.extend(resolver.resolveComponentClass(type));
		let defaultData = store.getters[getters.ELEMENT_DEFAULT_DATA](type);
		let instance = new ComponentClass({propsData: {block: defaultData, resolver: resolver}, store});
		instance.$mount();

		container.appendChild(instance.$el);

		return instance as BaseBlock;
	}

	public static getDefaultData(type: string): BlockContract {
		let blockData: any = store.getters[getters.ELEMENT_DEFAULT_DATA](type);
		let block: any = this.createElementFromData(type, blockData);
		block.id = uuidv4();
		if (block.getType() === BlockTypes.CONTAINER) {
			let oldSlots = block.getData()['slots'];
			let slotsStyle = block.getStyle()['slotsStyle'];

			block.slots = [];
			block.children = {};
			block.slotsStyle = {};

			for (let i of oldSlots) {
				let slotId: string = uuidv4();
				block.slots.push(slotId);
				block.children[slotId] = {};
				block.slotsStyle[slotId] = this.cloneStyle(slotsStyle[i]);
			}
		}

		return block as BlockContract;
	}

	public static createElementFromData(type: string, blockData: any) {
		let block: any;
		switch (type) {
			case BlockTypes.CONTAINER:
				block = new Container();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.slots = blockData.slots;
				block.children = {};
				for (let slotId of block.slots) {
					block.children[slotId] = {};
				}

				for (let childrenData of blockData.children) {
					let innerBlock = this.createElementFromData(childrenData.type, childrenData.data);

					if (typeof block.children[innerBlock.getParentId()] === 'undefined') {
						block.children[innerBlock.getParentId()] = {};
					}

					block.children[innerBlock.getParentId()][innerBlock.getId()] = innerBlock;
				}

				block.style = ComponentsFactory.cloneStyle(blockData.style);
				block.slotsStyle = {};
				for (let slotId of block.slots) {
					block.slotsStyle[slotId] = ComponentsFactory.cloneStyle(blockData.slotsStyle[slotId]);
				}

				break;
			case BlockTypes.OPTIONS_LIST:
				block = new OptionsList();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;
				block.options = [];
				blockData.options.forEach((optionData: Object) => {
					block.options.push(this.createElementFromData(BlockTypes.OPTION, optionData));
				});
				block.multiple = blockData.multiple;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				break;
			case BlockTypes.OPTION:
				block = new Option();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				break;
			case BlockTypes.HEADER:
				block = new Header();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				break;
			case BlockTypes.TEXT:
				block = new Text();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				break;
			case BlockTypes.TEXT_FIELD:
				block = new TextField();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.label = blockData.label;
				block.placeholder = blockData.placeholder;
				block.multiline = blockData.multiline;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				break;
			case BlockTypes.IMAGE:
				block = new Image();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.imageId = blockData.imageId;
				block.imageUrl = blockData.imageUrl;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				break;
			case BlockTypes.BUTTON:
				block = new Button();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = ComponentsFactory.cloneStyle(blockData.style);

				for (let actionData of blockData.actions) {
					block.actions.push(ComponentsFactory.cloneAction(actionData));
				}

				break;
			case BlockTypes.DELIMITER:
				block = new Delimiter();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;

				block.style = ComponentsFactory.cloneStyle(blockData.style);
				break;
			default:
				throw new Error('Undefined block type');
		}

		return block;
	}

	public static cloneElement(blockData: BlockContract) {
		let block: BlockContract;
		switch (blockData.getType()) {
			case BlockTypes.CONTAINER:
				block = new Container();

				break;
			case BlockTypes.OPTIONS_LIST:
				block = new OptionsList();

				break;
			case BlockTypes.OPTION:
				block = new Option();

				break;
			case BlockTypes.HEADER:
				block = new Header();

				break;
			case BlockTypes.TEXT:
				block = new Text();

				break;
			case BlockTypes.TEXT_FIELD:
				block = new TextField();

				break;
			case BlockTypes.IMAGE:
				block = new Image();

				break;
			case BlockTypes.BUTTON:
				block = new Button();

				break;
			case BlockTypes.DELIMITER:
				block = new Delimiter();

				break;
			default:
				throw new Error('Undefined block type');
		}

		let cloneStyle: any = {};
		cloneStyle.style = ComponentsFactory.cloneStyle(blockData.getStyle()['style']);

		if (blockData.getStyle()['slotsStyle']) {
			let originalStyle = blockData.getStyle()['slotsStyle'];
			cloneStyle.slotsStyle = {};
			for (let slotId of blockData.getData()['slots']) {
				cloneStyle.slotsStyle[slotId] = ComponentsFactory.cloneStyle(originalStyle[slotId]);
			}
		}

		(block as any).id = blockData.getId();
		block.setPosition(blockData.getPosition());
		block.setParentId(blockData.getParentId());
		block.setData(blockData.getData());
		block.setStyle(cloneStyle);
		block.setActions(blockData.getActions());

		return block;
	}

	public static cloneStyle(original: BlockStyle): BlockStyle {
		let style = new BlockStyle();
		style.width = original.width;
		style.height = original.height;
		style.textAlign = original.textAlign;
		style.sizeMeasure = original.sizeMeasure;
		style.marginMeasure = original.marginMeasure;
		style.textColor = original.textColor;
		style.backgroundColor = original.backgroundColor;

		style.inset = new Rectangle();
		style.inset.top = original.inset.top;
		style.inset.right = original.inset.right;
		style.inset.bottom = original.inset.bottom;
		style.inset.left = original.inset.left;

		style.margin = new Rectangle();
		style.margin.top = original.margin.top;
		style.margin.right = original.margin.right;
		style.margin.bottom = original.margin.bottom;
		style.margin.left = original.margin.left;

		style.padding = new Rectangle();
		style.padding.top = original.padding.top;
		style.padding.right = original.padding.right;
		style.padding.bottom = original.padding.bottom;
		style.padding.left = original.padding.left;

		return style;
	}

	public static cloneAction(original: BlockAction): BlockAction {
		let action = new BlockAction();
		action.id = original.id;
		action.type = original.type;
		action.handle = original.handle;
		action.data = original.data;
		action.conditions = original.conditions;

		return action;
	}

	public static cloneDataset(original: SurveyData): SurveyData {
		let data = new SurveyData();
		data.id = original.id;
		data.type = original.type;
		data.data = null;

		if (original.data) {
			data.data = [];

			for (let i of Object.keys(original.data)) {
				let variable = original.data[i];
				let newVariable = new VariableData();
				newVariable.id = variable.id;
				newVariable.name = variable.name;
				newVariable.value = variable.value;

				data.data.push(newVariable);
			}
		}

		return data;
	}
}