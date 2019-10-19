export interface Settings {
	csrf: string;
	appName: string;
}

let data = (<any> window).settings || null;
if (null === data) {
	throw new Error('Settings are missed');
}

export const settings: Settings = JSON.parse((<any> window).settings);