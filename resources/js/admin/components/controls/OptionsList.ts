import Component from "vue-class-component";
import Vue from "vue";

@Component({
	template: `
		<div :class="bem('options-list').add('draggable').classes()">
			<p><input name="dzen" type="radio" value="1">Раз</p>
			<p><input name="dzen" type="radio" value="2">Два</p>
			<p><input name="dzen" type="radio" value="3">Три</p>
		</div>
	`,
})
export class OptionsList extends Vue {}