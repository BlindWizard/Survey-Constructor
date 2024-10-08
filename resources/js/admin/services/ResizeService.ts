import {Rectangle} from "../models/Rectangle";
import {ResizeDirection} from "../contracts/ResizeDirection";
import {selectService} from "./SelectService";
import {actions} from "../stores/types";
import {ResizeBlockData} from "../api/requests/ResizeBlockData";
import {ResizeModes} from "../contracts/ResizeModes";
import {SaveBlockStyle} from "../api/requests/SaveBlockStyle";
import {ComponentsFactory} from "./ComponentsFactory";

class ResizeService {
	private blockId: string;
	private slotId: string|null = null;
	private offset: Rectangle|null = null;
	private direction: ResizeDirection;
	private mode: ResizeModes;

	private startX: number;
	private startY: number;
	private offsetX: number;
	private offsetY: number;

	private originalStyle: Object;

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

	public startResize(blockId: string, slotId: string|null, event: MouseEvent, mode: ResizeModes, direction: ResizeDirection)
	{
		if (-1 === [
			ResizeDirection.TOP,
			ResizeDirection.RIGHT,
			ResizeDirection.BOTTOM,
			ResizeDirection.LEFT,
			ResizeDirection.TOP_LEFT,
			ResizeDirection.TOP_RIGHT,
			ResizeDirection.BOTTOM_LEFT,
			ResizeDirection.BOTTOM_RIGHT,
		].indexOf(direction)) {
			return;
		}

		let element = selectService.getSelected();
		if (null === element) {
			return;
		}

		selectService.disable();

		this.blockId = blockId;
		this.slotId = slotId;
		this.mode = mode;
		this.direction = direction;

		this.offset = new Rectangle();
		this.startX = event.pageX;
		this.startY = event.pageY;

		let originalStyle: any = {};
		originalStyle.style = ComponentsFactory.cloneStyle(element.block.getStyle()['style']);

		if (element.block.getStyle()['slotsStyle']) {
			originalStyle.slotsStyle = {};
			for (let slotId of element.block.getData()['slots']) {
				originalStyle.slotsStyle[slotId] = ComponentsFactory.cloneStyle(element.block.getStyle()['slotsStyle'][slotId]);
			}
		}

		this.originalStyle = originalStyle;
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
			case ResizeDirection.TOP_LEFT:
				this.offset.left = this.offsetX;
				this.offset.top = this.offsetY;
				break;
			case ResizeDirection.TOP_RIGHT:
				this.offset.right = this.offsetX;
				this.offset.top = this.offsetY;
				break;
			case ResizeDirection.BOTTOM_LEFT:
				this.offset.left = this.offsetX;
				this.offset.bottom = this.offsetY;
				break;
			case ResizeDirection.BOTTOM_RIGHT:
				this.offset.right = this.offsetX;
				this.offset.bottom = this.offsetY;
				break;
		}

		let element = selectService.getSelected();
		if (null === element) {
			return;
		}

		let request = new ResizeBlockData();
		request.blockId = this.blockId;
		request.slotId = this.slotId;
		request.mode = this.mode;
		request.originalStyle = this.originalStyle;
		request.offset = this.offset;

		element.$store.dispatch(actions.RESIZE_ELEMENT, request);
	}

	public handleUp() {
		if (!this.offset) {
			return;
		}

		let element = selectService.getSelected();
		if (null === element) {
			return;
		}

		let resizeRequest = new ResizeBlockData();
		resizeRequest.blockId = this.blockId;
		resizeRequest.slotId = this.slotId;
		resizeRequest.mode = this.mode;
		resizeRequest.originalStyle = this.originalStyle;
		resizeRequest.offset = this.offset;

		element.$store.dispatch(actions.RESIZE_ELEMENT, resizeRequest);

		let styleRequest = new SaveBlockStyle();
		styleRequest.blockId = this.blockId;
		styleRequest.style = element.block.getStyle();
		element.$store.dispatch(actions.SAVE_STYLE, styleRequest);

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