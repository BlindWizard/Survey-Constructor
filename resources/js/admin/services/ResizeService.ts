import {ResizeOffset} from "../models/ResizeOffset";
import {ResizeDirection} from "../contracts/ResizeDirection";
import {selectService} from "./SelectService";

class ResizeService {
	private offset: ResizeOffset|null = null;
	private direction?: ResizeDirection;
	private startX: number;
	private startY: number;
	private offsetX: number;
	private offsetY: number;

	constructor() {
		this.handleMove = this.handleMove.bind(this);
		this.handleUp = this.handleUp.bind(this);

		document.addEventListener('selectstart', (e: Event) => {
			if (this.isResize()) {
				e.preventDefault();
			}
		});

		this.enable();
	}

	public enable() {
		document.addEventListener('mousemove', this.handleMove);
		document.addEventListener('mouseup', this.handleUp);
	}

	public disable() {
		document.removeEventListener('mousemove', this.handleMove);
		document.removeEventListener('mouseup', this.handleUp);
	}

	public startResize(event: MouseEvent, direction: ResizeDirection)
	{
		if (-1 === [ResizeDirection.TOP, ResizeDirection.RIGHT, ResizeDirection.BOTTOM, ResizeDirection.LEFT].indexOf(direction)) {
			return;
		}

		selectService.disable();

		this.offset = new ResizeOffset();
		this.direction = direction;
		this.startX = event.pageX;
		this.startY = event.pageY;
	}

	public handleMove(e: MouseEvent) {
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
	}

	public handleUp() {
		if (!this.offset) {
			return;
		}

		let element = selectService.getSelected();
		if (null === element) {
			return;
		}

		this.offset = null;

		setTimeout(() => {
			selectService.enable();
		}, 0);
	}

	public isResize():boolean
	{
		return null !== this.offset;
	}
}

const resizeService = new ResizeService();
export {resizeService};