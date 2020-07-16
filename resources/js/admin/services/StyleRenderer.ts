import {BlockStyle} from "../models/BlockStyle";

class StyleRenderer {
	public render(style: BlockStyle) {
		return ''
			+ (null !== style.width ? 'width:' + style.width + '%;' : '')
			+ (null !== style.width ? 'min-height:' + style.height + 'px;' : '')
			+ (null !== style.width ? 'text-align:' + style.textAlign + ';' : '')
			+ 'margin:' + style.margin.top + 'px ' + style.margin.right + 'px ' + style.margin.bottom + 'px ' + style.margin.left + 'px;'
			+ 'padding:' + style.padding.top + 'px ' + style.padding.right + 'px ' + style.padding.bottom + 'px ' + style.padding.left + 'px;'
		;
	}
}

const styleRenderer = new StyleRenderer();
export {styleRenderer};