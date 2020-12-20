import Component from "vue-class-component";
import Vue from "vue";
import {ApiToken} from "../models/ApiToken";
import {actions, getters} from "../stores/types";
import {CreateToken} from "../api/requests/CreateToken";
import {DeleteToken} from "../api/requests/DeleteToken";
import {SectionsFactory} from "../services/SectionsFactory";
import {Sections} from "../contracts/Sections";
import {Limits} from "../models/Limits";

@Component({
	template: `
        <div class="grid-x">
            <div class="cell large-8 large-offset-2 medium-12 medium-offset-0">
                <div class="grid-container fluid">
                    <div class="grid-y grid-margin-y">
                        <div class="cell">
                            <table v-if="limits">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Value</th>
                                        <th>Max value</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr><td>Surveys count</td><td>{{ limits.surveys }}</td><td>{{ limits.maxSurveys }}</td></tr>
                                        <tr><td>Files size</td><td>{{ parseFloat(limits.fileSize / 1024 / 1024).toFixed(2) }} Mb</td><td>{{ limits.maxFilesSize / 1024 / 1024 }} Mb</td></tr>
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`,
})
export class UserLimits extends Vue {
	public mounted()
	{
		if (null === this.limits) {
			this.$store.dispatch(actions.LOAD_LIMITS);
		}

		this.$store.dispatch(actions.SET_SECTION, SectionsFactory.get(Sections.LIMITS));
	}

	get limits(): Limits
	{
		return this.$store.getters[getters.LIMITS];
	}
}