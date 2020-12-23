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
import {ComponentsFactory} from "../services/ComponentsFactory";

@Component({
	template: `
        <portal to="resize-block">
            <div :class="bem('block-style').classes()">
                <div :class="bem('block-style').el('size').classes()">
                    <div :class="bem('block-style').el('size-label').classes()">
                        Text align
                    </div>
                    <div :class="bem('block-style').el('size-setting').classes()">
                        <div class="button-group primary">
                            <a class="button" v-on:click.stop="setTextAlign('left')">Left</a>
                            <a class="button" v-on:click.stop="setTextAlign('center')">Center</a>
                            <a class="button" v-on:click.stop="setTextAlign('right')">Right</a>
                        </div>
                    </div>
                </div>
                <div :class="bem('block-style').el('size').classes()">
                    <div :class="bem('block-style').el('size-label').classes()">
                        Size
                    </div>
                    <div :class="bem('block-style').el('size-value').classes()">
                        {{ sizeString }}
                    </div>
                    <div :class="bem('block-style').el('size-setting').classes()">
                        <div class="button-group primary">
                            <a class="button" v-on:click.stop="setSizeMeasure('px')">Px</a>
                            <a class="button" v-on:click.stop="setSizeMeasure('%')">%</a>
                        </div>
                    </div>
                </div>
                <div :class="bem('block-style').el('inset').classes()">
                    <div :class="bem('block-style').el('inset-label').classes()">
                        Inset
                    </div>
                    <div :class="bem('block-style').el('inset-value').classes()">
                        {{ blockStyle.inset.left }}px × {{ blockStyle.inset.top }}px
                    </div>
                </div>
                <div :class="bem('block-style').el('margin').classes()">
                    <div :class="bem('block-style').el('margin-label').classes()">
                        Margin
                    </div>
                    <div :class="bem('block-style').el('margin-value').classes()">
                        {{ marginString }}
                    </div>
                    <div :class="bem('block-style').el('size-setting').classes()">
                        <div class="button-group primary">
                            <a class="button" v-on:click.stop="setMarginMeasure('px')">Px</a>
                            <a class="button" v-on:click.stop="setMarginMeasure('%')">%</a>
                        </div>
                    </div>
                </div>
                <div :class="bem('block-style').el('padding').classes()">
                    <div :class="bem('block-style').el('padding-label').classes()">
                        Padding
                    </div>
                    <div :class="bem('block-style').el('size-value').classes()">
                        {{ blockStyle.padding.top }}px × {{ blockStyle.padding.right }}px × {{ blockStyle.padding.bottom }}px × {{ blockStyle.padding.left }}px
                    </div>
                </div>
                <div :class="bem('block-style').el('bg-color').classes()">
                    <div :class="bem('block-style').el('bg-color-label').classes()">
                      Text Color
                    </div>
                    <div :class="bem('block-style').el('bg-color-value').classes()">
                        {{ blockStyle.textColor }}
                        <a class="button" v-on:click.stop="togglePickerText()"><span class="fi-paint-bucket"></span></a>
                        <div v-if="showPickerText" :class="bem('block-style').el('bg-color-value-popup').classes()">
                            <Sketch :value="blockStyle.textColor" @input="setTextColor"/>
                        </div>
                    </div>
                </div>
                <div :class="bem('block-style').el('bg-color').classes()">
                    <div :class="bem('block-style').el('bg-color-label').classes()">
                      Background Color
                    </div>
                    <div :class="bem('block-style').el('bg-color-value').classes()">
                        {{ blockStyle.backgroundColor }}
                        <a class="button" v-on:click.stop="togglePickerBG()"><span class="fi-paint-bucket"></span></a>
                        <div v-if="showPickerBG" :class="bem('block-style').el('bg-color-value-popup').classes()">
                            <Sketch :value="blockStyle.backgroundColor" @input="setBGColor"/>
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

	private showPickerText: boolean = false;
	private showPickerBG: boolean = false;

	get locale(): Locale
	{
		return this.$store.getters[getters.LOCALE];
	}

	public setTextAlign(align: string)
	{
		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.block.getId();
		styleRequest.style =  {style: ComponentsFactory.cloneStyle(this.block.getStyle()['style'])};
		styleRequest.style['style'].textAlign = align;

		this.$store.dispatch(actions.SAVE_STYLE, styleRequest);
	}

	public setSizeMeasure(measure: string)
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

	public setMarginMeasure(measure: string)
	{
		let data = new ChangeSizeMeasureData();
		data.blockId = this.block.getId();
		data.measure = measure;

		this.$store.dispatch(actions.CHANGE_MARGIN_MEASURE, data);

		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.block.getId();
		styleRequest.style = this.block.getStyle();
		this.$store.dispatch(actions.SAVE_STYLE, styleRequest);
	}

	public togglePickerText()
	{
		this.showPickerText = !this.showPickerText;
		if (this.showPickerText) {
			this.showPickerBG = false;
		}
	}

	public togglePickerBG()
	{
		this.showPickerBG = !this.showPickerBG;
		if (this.showPickerBG) {
			this.showPickerText = false;
		}
	}

	public setTextColor(color: any)
	{
		let colorString = 'rgba(' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ',' + color.rgba.a + ')';
		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.block.getId();
		styleRequest.style = {style: ComponentsFactory.cloneStyle(this.block.getStyle()['style'])};
		styleRequest.style['style'].textColor = colorString;

		this.$store.dispatch(actions.SAVE_STYLE, styleRequest);
	}

	public setBGColor(color: any)
	{
		let colorString = 'rgba(' + color.rgba.r + ',' + color.rgba.g + ',' + color.rgba.b + ',' + color.rgba.a + ')';
		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.block.getId();
		styleRequest.style = {style: ComponentsFactory.cloneStyle(this.block.getStyle()['style'])};
		styleRequest.style['style'].backgroundColor = colorString;

		this.$store.dispatch(actions.SAVE_STYLE, styleRequest);
	}

	get sizeString()
	{
		return ('auto' !== this.blockStyle.width ? Math.round(Number(this.blockStyle.width)) + this.blockStyle.sizeMeasure : this.blockStyle.width)
		+ ' × ' + ('auto' !== this.blockStyle.height ? Math.round(Number(this.blockStyle.height)) +  this.blockStyle.sizeMeasure : this.blockStyle.height)
	}

	get marginString()
	{
		return Math.round(this.blockStyle.margin.top) + this.blockStyle.marginMeasure + ' × ' +
			Math.round(this.blockStyle.margin.right) + this.blockStyle.marginMeasure + ' × ' +
			Math.round(this.blockStyle.margin.bottom) + this.blockStyle.marginMeasure + ' × ' +
			Math.round(this.blockStyle.margin.left) + this.blockStyle.marginMeasure;
	}
}