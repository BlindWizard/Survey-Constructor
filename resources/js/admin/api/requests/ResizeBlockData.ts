import {ResizeOffset} from "../../models/ResizeOffset";
import {ResizeModes} from "../../contracts/ResizeModes";

export class ResizeBlockData {
	public blockId: string;
	public slotId: string|null = null;
	public mode: ResizeModes;
	public offset: ResizeOffset;
}