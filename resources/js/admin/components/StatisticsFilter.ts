import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";
import $ from "jquery";

@Component({
	template: `
        <div :class="bem('sidebar-menu').classes()">
            <span :class="bem('sidebar-menu').el('header').classes()">Filter</span>
            <ul :class="bem('vertical menu').classes()">
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <div :class="bem('sidebar-menu').el('form-section').classes()">
                        <label>
                            Token
                            <select :value="tokenId" @change="selectToken" :class="bem('sidebar-menu').el('token-selector-element').classes()">
                                <option v-for="(tokenValue, token) in tokens" :value="token">{{ tokenValue }}</option>
                            </select>
                        </label>
                    </div>
                    <div :class="bem('sidebar-menu').el('form-section').classes()">
                        <label>
                            Time range
                            <div :class="bem('sidebar-menu').el('item').classes()">
                                <input id="date-from" type="text" :value="dateFrom" :class="bem('sidebar-menu').el('date-from').classes()" /><!--
                             --><input id="date-to" type="text" :value="dateTo" :class="bem('sidebar-menu').el('date-to').classes()" />
                            </div>
                        </label>
                    </div>
                    <div :class="bem('sidebar-menu').el('form-section').classes()">
                        <label>
                            Options
                        </label>
                        <div :class="bem('sidebar-menu').el('options-list').classes()">
                            <div v-if="options">
                                <div v-for="blocks in options">
                                    <div v-for="option in blocks">{{ option.label }}</div>
                                </div>
                            </div>
                            <div v-else>None</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `,
})
export class StatisticsFilter extends Vue {
	@Prop(Object) readonly tokens: object;
	@Prop(String) readonly tokenId: string;
	@Prop(String) readonly dateFrom: string;
	@Prop(String) readonly dateTo: string;
	@Prop(Object) readonly options: Object;

	@Prop(Function) readonly selectToken: Function;
	@Prop(Function) readonly selectDateFrom: Function;
	@Prop(Function) readonly selectDateTo: Function;

	mounted()
	{
		import(('foundation-datepicker/js/foundation-datepicker') as any).then(() => {
			import(('foundation-datepicker/css/foundation-datepicker.css') as any);

			($('#date-from') as any).fdatepicker({
				format: 'mm/dd/yyyy',
			}).on('changeDate', (event: Event) => {
				this.selectDateFrom(event);
			});

			($('#date-to') as any).fdatepicker({
				format: 'mm/dd/yyyy',
			}).on('changeDate', (event: Event) => {
				this.selectDateTo(event);
			});
		});
	}
}
