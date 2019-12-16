import {Locale} from "./models/Locale";

export interface Settings {
	csrf: string;
	locale: Locale;
}

let data = (<any> window).settings || null;
if (null === data) {
	throw new Error('Settings are missed');
}

export const settings: Settings = JSON.parse((<any> window).settings);