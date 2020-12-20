import Component from "vue-class-component";
import Vue from "vue";
import {ApiToken} from "../models/ApiToken";
import {actions, getters} from "../stores/types";
import {CreateToken} from "../api/requests/CreateToken";
import {DeleteToken} from "../api/requests/DeleteToken";
import {SectionsFactory} from "../services/SectionsFactory";
import {Sections} from "../contracts/Sections";

@Component({
	template: `
        <div class="grid-x">
            <div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
                <div class="grid-container fluid">
                    <div class="grid-y grid-margin-y">
                        <div class="cell">
                            <h2>API Settings</h2>
                            <input type="text" placeholder="Token name" v-model="name">
                            <button :class="bem('button').add('primary').classes()" @click="addToken">
                                <span :class="bem('button').el('label').classes()">Create</span>
                            </button>
                        </div>
                        <div class="cell">
                            <table v-if="tokens && tokens.length > 0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Token</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="token in tokens">
                                        <td>{{ token.name }}</td>
                                        <td>{{ token.token }}</td>
                                        <td>
                                            <button :class="bem('button').add('secondary').classes()" @click="deleteToken(token.id)">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`,
})
export class UserSettings extends Vue {
	protected name: string = '';

	public mounted()
	{
		if (null === this.tokens) {
			this.$store.dispatch(actions.LOAD_TOKENS);
		}

		this.$store.dispatch(actions.SET_SECTION, SectionsFactory.get(Sections.SETTINGS));
	}

	get tokens(): ApiToken[]
	{
		return this.$store.getters[getters.TOKENS];
	}

	public addToken()
	{
		let request = new CreateToken();
		request.name = this.name;

		this.$store.dispatch(actions.ADD_TOKEN, request);
	}

	public deleteToken(tokenId: string)
	{
		let request = new DeleteToken();
		request.id = tokenId;

		this.$store.dispatch(actions.DELETE_TOKEN, request);
	}
}