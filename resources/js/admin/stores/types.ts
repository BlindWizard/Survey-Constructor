export enum mutations
{
	SET_CSRF = 'setCsrf',
	SET_APPNAME = 'setAppName',
	SET_SURVEYS = 'setSurveys',
	SET_TEMPLATES = 'setTemplates',
	SET_ACTIVE_SURVEY = 'setActiveSurvey',
}

export enum actions
{
	LOAD_SETTINGS = 'loadSettings',
	LOAD_SURVEYS = 'loadSurveys',
	LOAD_TEMPLATES = 'loadTemplates',
	CREATE_SURVEY = 'createSurvey',
	LOAD_SURVEY = 'getSurvey',
}

export enum getters
{
	CSRF = 'csrf',
	APPNAME = 'appName',
	SURVEYS = 'surveys',
	TEMPLATES = 'templates',
	SURVEY = 'survey',
}