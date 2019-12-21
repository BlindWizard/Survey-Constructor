export interface BlockContract {
	getId(): string;
	getType(): string;
	getPosition(): number;
	setPosition(position: number): void;
}