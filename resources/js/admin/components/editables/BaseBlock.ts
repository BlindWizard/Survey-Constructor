import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {BlockContract} from "../../contracts/BlockContract";
import {Draggable} from "../../contracts/Draggable";
import {SaveBlockData} from "../../api/requests/SaveBlockData";
import {actions} from "../../stores/types";
import {EditingModes} from "../../contracts/EditingModes";
import {ComponentsFactory} from "../../services/ComponentsFactory";
import Component from "vue-class-component";

@Component({})
export class BaseBlock extends Vue implements Draggable {
	@Prop(Object) readonly block: BlockContract;
	public selected: boolean = false;
	public editing: boolean = false;
	public blockData: BlockContract|null = null;

	public created()
	{
		this.blockData = ComponentsFactory.createElementFromData(this.block.getType(), this.block.getData());
	}

	public draggable(): boolean
	{
		return !this.editing;
	}

	public getType(): string
	{
		return this.block.getType();
	}

	public changeData(newData: BlockContract)
	{
		this.blockData = newData;
	}

	public saveData()
	{
		if (null === this.blockData) {
			return;
		}

		let request = new SaveBlockData();
		request.blockId = this.block.getId();
		request.data = this.blockData.getData();

		this.$store.dispatch(actions.SAVE_ELEMENT_DATA, request);
		this.toggleEdit();
	}

	public deleteElement()
	{
		this.$store.dispatch(actions.DELETE_ELEMENT, this.block.getId());
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

		this.$store.dispatch(actions.SET_EDITING, this.editing);
	}

	public bindSelecting(bemClass: string) {
		document.addEventListener('mousedown', (e: MouseEvent) => {
			e.stopPropagation();
			var clickOnThis = (e.target as HTMLElement).closest('.' + bemClass) === this.$refs.selectable;
			this.toggleSelect(clickOnThis);
		});
	}
}