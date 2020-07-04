import Component from "vue-class-component";
import {OptionsListBlock} from "../../controls/OptionsListBlock";
import {BlockEditMenu} from "../../BlockEditMenu";
import {OptionsListBlockEdit} from "./OptionsListBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectDispatcher} from "../../../services/SelectDispatcher";

@Component({
	template: `
        <div ref="selectable" :class="bem('options-list-wrapper').classes()" v-component-drag v-component-drop-target>
            <OptionsListBlock :block="block"/>
            <OptionsListBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected"/>
        </div>
	`,
	components: {
		OptionsListBlock,
		OptionsListBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class OptionsListBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectDispatcher.handleElement(this);
	}
}