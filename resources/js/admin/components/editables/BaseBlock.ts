import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {BlockContract} from "../../contracts/BlockContract";
import {Draggable} from "../../contracts/Draggable";
import {SaveBlockData} from "../../api/requests/SaveBlockData";
import {actions} from "../../stores/types";
import {EditingModes} from "../../contracts/EditingModes";
import {ComponentsFactory} from "../../services/ComponentsFactory";
import Component from "vue-class-component";
import {ResizeModes} from "../../contracts/ResizeModes";

@Component({})
export class BaseBlock extends Vue implements Draggable {
	@Prop(Object) readonly block: BlockContract;
	public selected: boolean = false;
	public editing: boolean = false;
	public blockData: BlockContract|null = null;
	public resizeMode: ResizeModes|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.cloneElement(this.block);
	}

	public draggable(): boolean
	{
		return this.selected && this.editing;
	}

	public getType(): string
	{
		return this.block.getType();
	}

	public changeData(newData: BlockContract)
	{
		this.blockData = newData;
	}

	public saveData(final: boolean = false)
	{
		if (null === this.blockData) {
			return;
		}

		let request = new SaveBlockData();
		request.blockId = this.block.getId();
		request.data = this.blockData.getData();

		this.$store.dispatch(actions.SAVE_ELEMENT_DATA, request);

		if (final) {
			this.$store.dispatch(actions.SET_EDITING, false);
			this.toggleSelect(false);
			this.toggleEdit(false);
		}
	}

	public deleteElement()
	{
		this.$store.dispatch(actions.DELETE_ELEMENT, this.block.getId());
		this.$store.dispatch(actions.SET_EDITING, false);
	}

	public getMenuMode(): string
	{
		return EditingModes.EDIT;
	}

	public toggleSelect(selected?: boolean)
	{
		if (undefined === selected || null === selected) {
			this.selected = !this.selected;
		}
		else {
			this.selected = selected;
		}
	}

	public toggleEdit(editing?: boolean)
	{
		if (undefined === editing || null === editing) {
			this.editing = !this.editing;
		}
		else {
			this.editing = editing;
		}
	}

	public selectFrameMode(mode: ResizeModes) {
		this.resizeMode = mode;
	}

	get isFrameMargin(): boolean {
		return this.resizeMode === ResizeModes.MARGIN;
	}

	get isFramePadding(): boolean {
		return this.resizeMode === ResizeModes.PADDING;
	}

	get isFrameResize(): boolean {
		return this.resizeMode === ResizeModes.RESIZE;
	}
}