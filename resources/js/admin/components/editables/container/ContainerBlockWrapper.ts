import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {ContainerBlock} from "../../controls/ContainerBlock";
import {ContainerBlockEdit} from "./ContainerBlockEdit";

@Component({
	template: `
        <div ref="selectable" :class="bem('container-wrapper').classes()" v-component-drag>
            <ContainerBlock :block="block"/>
            <ContainerBlockEdit v-if="editing" :block="blockData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected && !editing"/>
        </div>
	`,
	components: {
		ContainerBlock,
		ContainerBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
	}
})
export class ContainerBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		this.bindSelecting(bem('container-wrapper').classes());
	}
}