import {OptionsList} from "./OptionsList";
import {Option} from "./Option";
import {Header} from "./Header";

export class BlockWrapper {
	public data: OptionsList|Option|Header;
	public type: string;
}