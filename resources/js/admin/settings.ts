import {Locale} from "./models/Locale";
import {BlockContract} from "./contracts/BlockContract";
import {BlockTypes} from "./contracts/BlockTypes";
import {OptionsList} from "./models/OptionsList";
import {Option} from "./models/Option";
import {ComponentsFactory} from "./services/ComponentsFactory";

export interface Settings {
	csrf: string;
	token: string|null;
	locale: Locale;
	defaultBlockData: BlockContract[];
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

export const settings: Settings = {
	csrf: data.csrf,
	token: data.token,
	locale: data.locale,
	defaultBlockData: defaultBlockData,
};