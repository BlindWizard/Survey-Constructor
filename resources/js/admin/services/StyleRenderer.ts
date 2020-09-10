import {BlockStyle} from "../models/BlockStyle";

class StyleRenderer {
	public render(style: BlockStyle) {
		let string = ''
			+ 'background-color:' + style.backgroundColor + ';'
			+ (null !== style.width ? 'width:' + style.width + ('auto' !== style.width ? style.sizeMeasure + ';' : ';') : '')
			+ (null !== style.height ? 'height:' + style.height + ('auto' !== style.height ? style.sizeMeasure + ';' : ';') : '')
			+ (null !== style.textAlign ? 'text-align:' + style.textAlign + ';' : '')
			+ 'margin:' + (style.margin.top || 0) + 'px ' + (style.margin.right || 0) + 'px ' + (style.margin.bottom || 0) + 'px ' + (style.margin.left || 0) + 'px;'
			+ 'padding:' + (style.padding.top || 0) + 'px ' + (style.padding.right || 0) + 'px ' + (style.padding.bottom || 0) + 'px ' + (style.padding.left || 0) + 'px;'
		;

		return string;
	}
}

const styleRenderer = new StyleRenderer();
export {styleRenderer};