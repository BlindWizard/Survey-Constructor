import {BlockStyle} from "../models/BlockStyle";

class StyleRenderer {
	public render(style: BlockStyle) {
		let string = ''
			+ 'color:' + style.textColor + ';'
			+ 'background-color:' + style.backgroundColor + ';'
			+ (null !== style.width ? 'width:' + style.width + ('auto' !== style.width ? style.sizeMeasure + ';' : ';') : '')
			+ (null !== style.height ? 'height:' + style.height + ('auto' !== style.height ? style.sizeMeasure + ';' : ';') : '')
			+ (null !== style.textAlign ? 'text-align:' + style.textAlign + ';' : '')
			+ 'top:' + (style.inset.top || 0) + 'px;right:' + (style.inset.right || 0) + 'px;bottom:' + (style.inset.bottom || 0) + 'px;left:' + (style.inset.left || 0) + 'px;'
			+ 'margin:' + style.margin.top + ('auto' !== style.margin.top ? 'px ' : ' ') + style.margin.right + ('auto' !== style.margin.right ? 'px ' : ' ') + style.margin.bottom + ('auto' !== style.margin.bottom ? 'px ' : ' ') + style.margin.left + ('auto' !== style.margin.left ? 'px;' : ';')
			+ 'padding:' + style.padding.top + ('auto' !== style.padding.top ? 'px ' : ' ') + style.padding.right + ('auto' !== style.padding.right ? 'px ' : ' ') + style.padding.bottom + ('auto' !== style.padding.bottom ? 'px ' : ' ') + style.padding.left + ('auto' !== style.padding.left ? 'px;' : ';')
		;

		return string;
	}
}

const styleRenderer = new StyleRenderer();
export {styleRenderer};