export interface BlockContract {
	getId(): string;
	getType(): string;
	getPosition(): number;
	setPosition(position: number): void;
	getParentId(): string;
	setParentId(id: string): void;
	getData(): Object;
	setData(data: Object): void;
	getStyle(): Object;
	setStyle(data: Object): void;
}