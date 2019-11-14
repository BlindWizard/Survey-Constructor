export enum mutations
{
	SET_CSRF = 'setCsrf',
	SET_APPNAME = 'setAppName',
	SET_TEMPLATES = 'setTemplates',
	SET_ACTIVE_SURVEY = 'setActiveSurvey',
}

export enum actions
{
	LOAD_SETTINGS = 'loadSettings',
	SHOW_TEMPLATES = 'showTemplates',
	CREATE_SURVEY = 'createSurvey',
	GET_SURVEY = 'getSurvey',
}

export enum getters
{
	CSRF = 'csrf',
	APPNAME = 'appName',
	TEMPLATES = 'templates',
	SURVEY = 'survey',
}