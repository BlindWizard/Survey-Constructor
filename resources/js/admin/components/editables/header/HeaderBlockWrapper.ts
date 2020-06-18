import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {HeaderBlockEdit} from "./HeaderBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {HeaderBlock} from "../../controls/HeaderBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectDispatcher} from "../../../services/SelectDispatcher";

@Component({
	template: `
        <div ref="selectable" :class="bem('header-wrapper').classes()" v-component-drag v-component-drop-target>
            <HeaderBlock :block="block"/>
            <HeaderBlockEdit v-if="editing" :block="blockData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected && !editing"/>
        </div>
	`,
	components: {
		HeaderBlock,
		HeaderBlockEdit,
		BlockEditMenu,
		BlockResizeFrame,
	}
})
export class HeaderBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectDispatcher.handleElement(this);
	}
}