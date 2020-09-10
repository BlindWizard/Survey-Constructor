import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import {BlockContract} from "../contracts/BlockContract";
import {BlockStyle} from "../models/BlockStyle";
import {Locale} from "../models/Locale";
import {actions, getters} from "../stores/types";
import {ChangeSizeMeasureData} from "../api/requests/ChangeSizeMeasureData";
import {SaveBlockStyle} from "../api/requests/SaveBlockStyle";
import {Sketch} from 'vue-color';

@Component({
	template: `
        <portal to="resize-block">
            <div class="grid-container">
                <div :class="bem('block-style').classes()">
                    <div :class="bem('block-style').el('size').classes()">
                        <div :class="bem('block-style').el('size-label').classes()">
                            Size
                        </div>
                        <div :class="bem('block-style').el('size-value').classes()">
                            {{ blockStyle.width }}{{ 'auto' !== blockStyle.width ? blockStyle.sizeMeasure : '' }}
                            ×
                            {{ blockStyle.height }}{{ 'auto' !== blockStyle.height ? blockStyle.sizeMeasure : '' }}
                        </div>
                        <div :class="bem('block-style').el('size-setting').classes()">
                            <div class="button-group primary">
                                <a class="button" v-on:click.stop="setMeasure('px')">Px</a>
                                <a class="button" v-on:click.stop="setMeasure('%')">%</a>
                            </div>
                        </div>
                    </div>
                    <div :class="bem('block-style').el('size').classes()">
                        <div :class="bem('block-style').el('size-label').classes()">
                            Margin
                        </div>
                        <div :class="bem('block-style').el('size-value').classes()">
                            {{ blockStyle.margin.top }}px × {{ blockStyle.margin.right }}px × {{ blockStyle.margin.bottom }}px × {{ blockStyle.margin.left }}px
                        </div>
                    </div>
                    <div :class="bem('block-style').el('size').classes()">
                        <div :class="bem('block-style').el('size-label').classes()">
                            Padding
                        </div>
                        <div :class="bem('block-style').el('size-value').classes()">
                            {{ blockStyle.padding.top }}px × {{ blockStyle.padding.right }}px × {{ blockStyle.padding.bottom }}px × {{ blockStyle.padding.left }}px
                        </div>
                    </div>
                    <div :class="bem('block-style').el('size').classes()">
                        <div :class="bem('block-style').el('size-label').classes()">
                          Background Color
                        </div>
                        <div :class="bem('block-style').el('size-value').classes()">
                            {{ blockStyle.backgroundColor }}
                            <a class="button" v-on:click.stop="togglePicker()"><span class="fi-paint-bucket"></span></a>
                            <div v-if="showPicker">
                                <Sketch :value="blockStyle.backgroundColor" @input="setBGColor"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </portal>
	`,
	components: {
		Sketch,
	}
})
export class StyleEdit extends Vue {
	@Prop(Object) readonly block: BlockContract;
	@Prop(BlockStyle) readonly blockStyle: BlockStyle;

	private showPicker: boolean = false;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}

	public setMeasure(measure: string)
	{
		let data = new ChangeSizeMeasureData();
		data.blockId = this.block.getId();
		data.measure = measure;

		this.$store.dispatch(actions.CHANGE_SIZE_MEASURE, data);

		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.block.getId();
		styleRequest.style = this.block.getStyle();
		this.$store.dispatch(actions.SAVE_STYLE, styleRequest);
	}

	public togglePicker()
	{
		this.showPicker = !this.showPicker;
	}

	public setBGColor(color: any)
	{
		let colorString = 'rgba(' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ',' + color.rgba.a + ')';
		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.block.getId();
		styleRequest.style = this.block.getStyle();
		styleRequest.style['style'].backgroundColor = colorString;

		this.$store.dispatch(actions.SAVE_STYLE, styleRequest);
	}
}