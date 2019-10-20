declare module 'bem-helper' {
	export class BEM {
		constructor(block: string, element: string, modifiers: string[], nonBemClasses: string[]);

		el(elementIdentifier: string): BEM;
		is(modifier: string, isOn: boolean): BEM;
		add(className: string): BEM;
		toString(): string;
		clone(newBlock: object): BEM;
	}

	export function bem(ctx: BEM|string): BEM;
}