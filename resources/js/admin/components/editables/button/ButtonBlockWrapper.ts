import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {ButtonBlockEdit} from "./ButtonBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";
import {selectService} from "../../../services/SelectService";
import {ButtonBlock} from "../../controls/ButtonBlock";

@Component({
	template: `
        <div ref="selectable" :class="bem('button-wrapper').classes()" v-component-drag v-component-drop-target>
            <ButtonBlock :block="block"/>
            <ButtonBlockEdit v-if="editing" :block="blockData" :onUpdate="changeData" :onSave="saveData"/>
            <BlockEditMenu v-if="selected" :onSelectMode="selectFrameMode" :onEdit="toggleEdit" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected" :block="block"/>
        </div>
    `,
	components: {
		ButtonBlock,
		ButtonBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class ButtonBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		selectService.handleElement(this);
	}
}