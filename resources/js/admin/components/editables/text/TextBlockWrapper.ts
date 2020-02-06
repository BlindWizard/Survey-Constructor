import Component from "vue-class-component";
import {BlockEditMenu} from "../../BlockEditMenu";
import {TextBlock} from "../../controls/TextBlock";
import {TextBlockEdit} from "./TextBlockEdit";
import {BaseBlock} from "../BaseBlock";
import {Draggable} from "../../../contracts/Draggable";
import {bem} from "../../../../common/bem-helper";
import {BlockResizeFrame} from "../../BlockResizeFrame";

@Component({
	template: `
        <div ref="selectable" :class="bem('text-wrapper').classes()" v-component-drag v-component-drop-target>
            <TextBlock v-if="!editing" :block="block"/>
            <TextBlockEdit v-if="editing" :block="blockData"/>
            <BlockEditMenu v-if="selected" :onEdit="toggleEdit" :onSave="saveData" :onDelete="deleteElement" :mode="getMenuMode()"/>
            <BlockResizeFrame v-if="selected"/>
        </div>
    `,
	components: {
		TextBlock,
		TextBlockEdit,
		BlockEditMenu,
		BlockResizeFrame
	}
})
export class TextBlockWrapper extends BaseBlock implements Draggable {
	public created()
	{
		this.bindSelecting(bem('text-wrapper').classes());
	}
}