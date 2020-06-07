import Component from "vue-class-component";
import Vue from "vue";
import {Prop} from "vue-property-decorator";

@Component({
	template: `
        <div :class="bem('sidebar-menu').classes()">
            <span :class="bem('sidebar-menu').el('header').classes()">Filter</span>
            <ul :class="bem('vertical menu').classes()">
                <li :class="bem('sidebar-menu').el('item').classes()">
                    <div :class="bem('sidebar-menu').el('form-section').classes()">
                        <label>
                            Token
                            <select :value="tokenId" @change="selectToken" :class="bem('statistics-report').el('token-selector-element').classes()">
                                <option v-for="(tokenValue, token) in tokens" :value="token">{{ tokenValue }}</option>
                            </select>
                        </label>
                    </div>
                </li>
            </ul>
        </div>
    `,
})
export class StatisticsFilter extends Vue {
	@Prop(String) readonly tokenId: string;
	@Prop(Object) readonly tokens: object;
	@Prop(Function) readonly selectToken: Function;
}
