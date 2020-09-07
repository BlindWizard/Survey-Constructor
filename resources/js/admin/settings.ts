import {Locale} from "./models/Locale";
import {BlockContract} from "./contracts/BlockContract";
import {ComponentsFactory} from "./services/ComponentsFactory";

export interface Settings {
	csrf: string;
	token: string|null;
	locale: Locale;
	defaultBlockData: BlockContract[];
	actionsTypes: any;
	actionsHandles: any;
}

let data: any = (<any> window).settings || null;
if (null === data) {
	throw new Error('Settings are missed');
}

data = JSON.parse((<any> window).settings);

let defaultBlockData: BlockContract[] = [];
(<any> Object).keys(data.defaultBlockData).forEach((key: string) => {
	let blockData: any = data.defaultBlockData[key];
	defaultBlockData[key] = ComponentsFactory.createElementFromData(key, blockData);
});

let actionsTypes: any = {};
(<any> Object).keys(data.actionsTypes).forEach((key: string) => {
	actionsTypes[key] = data.actionsTypes[key];
});

let actionsHandles: any = {};
(<any> Object).keys(data.actionsHandles).forEach((key: string) => {
	actionsHandles[key] = data.actionsHandles[key];
});

export const settings: Settings = {
	csrf: data.csrf,
	token: data.token,
	locale: data.locale,
	defaultBlockData: defaultBlockData,
	actionsTypes: actionsTypes,
	actionsHandles: actionsHandles
};