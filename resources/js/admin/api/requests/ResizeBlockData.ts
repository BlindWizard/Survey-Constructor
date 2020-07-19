import {Rectangle} from "../../models/Rectangle";
import {ResizeModes} from "../../contracts/ResizeModes";
import {Size} from "../../models/Size";
import {BlockStyle} from "../../models/BlockStyle";

export class ResizeBlockData {
	public blockId: string;
	public slotId: string|null = null;
	public mode: ResizeModes;
	public offset: Rectangle;
	public originalStyle: Object;
}