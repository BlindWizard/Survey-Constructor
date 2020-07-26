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
		if (block.getType() === BlockTypes.CONTAINER) {
			let oldSlots = Object.keys(block.getData()['slots']);

			block.slots = [];
			block.children = {};
			for(let i of oldSlots) {
				let slotId: string = uuidv4();
				block.slots.push(slotId);
				block.children[slotId] = {};
			}
		}

		return block as BlockContract;
	}

	public static createElementFromData(type: string, blockData: any)
	{
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

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				block.slotsStyle = {};
				for (let slotId of block.slots) {
					block.slotsStyle[slotId] = new BlockStyle();

					Object.keys(blockData.slotsStyle[slotId]).forEach((field: string) => {
						block.slotsStyle[slotId][field] = blockData.slotsStyle[slotId][field];
					});
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

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			case BlockTypes.OPTION:
				block = new Option();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			case BlockTypes.HEADER:
				block = new Header();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			case BlockTypes.TEXT:
				block = new Text();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			case BlockTypes.TEXT_FIELD:
				block = new TextField();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.label = blockData.label;
				block.placeholder = blockData.placeholder;
				block.multiline = blockData.multiline;

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			case BlockTypes.IMAGE:
				block = new Image();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.imageId = blockData.imageId;
				block.imageUrl = blockData.imageUrl;

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			case BlockTypes.BUTTON:
				block = new Button();
				block.id = blockData.id;
				block.position = blockData.position;
				block.parentId = blockData.parentId;
				block.text = blockData.text;

				block.style = new BlockStyle();
				Object.keys(blockData.style).forEach((field: string) => {
					block.style[field] = blockData.style[field];
				});

				break;
			default:
				throw new Error('Undefined block type');
		}

		return block;
	}

	public static cloneElement(blockData: BlockContract)
	{
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
			default:
				throw new Error('Undefined block type');
		}

		(block as any).id = blockData.getId();
		block.setPosition(blockData.getPosition());
		block.setParentId(blockData.getParentId());
		block.setData(blockData.getData());
		block.setStyle(blockData.getStyle());

		return block;
	}
}