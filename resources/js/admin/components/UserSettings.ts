import Component from "vue-class-component";
import Vue from "vue";
import {ApiToken} from "../models/ApiToken";

@Component({
	template: `
        <div class="grid-x">
            <div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
                <div class="grid-container fluid">
                    <div class="grid-x grid-margin-x">
                        <div class="cell">
                            <h2>API Settings</h2>
                        </div>
                        <div class="cell">
                            <table v-if="tokens.length > 0">
                                <tr>
                                    <th>Name</th>
                                    <th>Token</th>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div class="cell">
                            <input type="text" placeholder="Token name">
                            <button :class="bem('button').add('primary').classes()" @click="addToken">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`,
})
export class UserSettings extends Vue {
	get tokens(): ApiToken[]
	{
		return [];
	}
}