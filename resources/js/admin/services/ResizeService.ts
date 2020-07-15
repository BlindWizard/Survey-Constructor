import {ResizeOffset} from "../models/ResizeOffset";
import {ResizeDirection} from "../contracts/ResizeDirection";

class ResizeService {
	private offset: ResizeOffset|null = null;
	private direction?: ResizeDirection;
	private startX: number;
	private startY: number;
	private offsetX: number;
	private offsetY: number;

	constructor() {
		document.addEventListener('mousemove', (e: MouseEvent) => {
			if (!this.offset) {
				return;
			}

			this.offsetX = e.pageX - this.startX;
			this.offsetY = e.pageY - this.startY;

			switch (this.direction) {
				case ResizeDirection.TOP:
					this.offset.top = this.offsetY;
					break;
				case ResizeDirection.RIGHT:
					this.offset.right = this.offsetX;
					break;
				case ResizeDirection.BOTTOM:
					this.offset.bottom = this.offsetY;
					break;
				case ResizeDirection.LEFT:
					this.offset.left = this.offsetX;
					break;
			}
		});

		document.addEventListener('mouseup', () => {
			if (!this.offset) {
				return;
			}



			this.offset = null;
		})
	}

	public startResize(event: MouseEvent, direction: ResizeDirection)
	{
		if (-1 === [ResizeDirection.TOP, ResizeDirection.RIGHT, ResizeDirection.BOTTOM, ResizeDirection.LEFT].indexOf(direction)) {
			return;
		}

		this.offset = new ResizeOffset();
		this.direction = direction;
		this.startX = event.pageX;
		this.startY = event.pageY;
	}
}

const resizeService = new ResizeService();
export {resizeService};