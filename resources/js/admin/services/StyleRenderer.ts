import {BlockStyle} from "../models/BlockStyle";

class StyleRenderer {
	public render(style: BlockStyle) {
		let string = ''
			+ (null !== style.width ? 'width:' + style.width + ('auto' !== style.width ? style.sizeMeasure + ';' : ';') : '')
			+ (null !== style.height ? 'height:' + style.height + ('auto' !== style.height ? style.sizeMeasure + ';' : ';') : '')
			+ (null !== style.textAlign ? 'text-align:' + style.textAlign + ';' : '')
			+ 'margin:' + style.margin.top + 'px ' + style.margin.right + 'px ' + style.margin.bottom + 'px ' + style.margin.left + 'px;'
			+ 'padding:' + style.padding.top + 'px ' + style.padding.right + 'px ' + style.padding.bottom + 'px ' + style.padding.left + 'px;'
		;

		return string;
	}
}

const styleRenderer = new StyleRenderer();
export {styleRenderer};