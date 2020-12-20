import {Section} from "../models/Section";
import {Sections} from "../contracts/Sections";

export class SectionsFactory {
	public static get(name: string): Section|null
	{
		let section = new Section();
		switch (name) {
			case Sections.HOME:
				section.label = 'Home';
				section.path = 'main-page';

				return section;
			case Sections.STATISTICS:
				section.label = 'Statistics';
				section.path = 'survey-statistics';

				return section;
			case Sections.STATISTICS_SAMPLE:
				section.label = 'Statistics Sample';
				section.path = 'statistics-sample';

				return section;
			case Sections.EDITOR:
				section.label = 'Editor';
				section.path = 'survey';

				return section;
			case Sections.DATASET:
				section.label = 'Dataset';
				section.path = 'survey-dataset';

				return section;
			case Sections.SETTINGS:
				section.label = 'Settings';
				section.path = 'settings';

				return section;
			default:
				return null;
		}
	}
}