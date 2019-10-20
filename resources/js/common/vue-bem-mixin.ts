import {BEM, bem} from "./bem-helper";
import Vue from "vue";
import {Mixin} from "vue-mixin-decorator";

interface BemMixinContract {
	bem(ctx: BEM|string): BEM;
}

@Mixin
export class BemMixin  extends Vue implements BemMixinContract {
	bem(ctx: BEM|string): BEM {
		return bem(ctx)
	}
}