export enum mutations
{
	SET_CSRF = 'setCsrf',
	SET_LOCALE = 'setLocale',
	SET_DEFAULT_BLOCK_DATA = 'setDefaultBlockData',
	SET_SURVEYS = 'setSurveys',
	SET_TEMPLATES = 'setTemplates',
	SET_ACTIVE_SURVEY = 'setActiveSurvey',
	ADD_ELEMENT = 'addElement',
}

export enum actions
{
	LOAD_SETTINGS = 'loadSettings',
	LOAD_SURVEYS = 'loadSurveys',
	LOAD_TEMPLATES = 'loadTemplates',
	CREATE_SURVEY = 'createSurvey',
	LOAD_SURVEY = 'getSurvey',
	ADD_ELEMENT = 'addElement',
	REORDER_ELEMENT = 'reorderElement',
}

export enum getters
{
	CSRF = 'csrf',
	LOCALE = 'locale',
	ELEMENT_DEFAULT_DATA = 'elementDefaultData',
	SURVEYS = 'surveys',
	TEMPLATES = 'templates',
	SURVEY = 'survey',
}