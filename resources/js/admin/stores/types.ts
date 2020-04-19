export enum mutations
{
	SET_CSRF = 'setCsrf',
	SET_LOCALE = 'setLocale',
	SET_TOKEN = 'setToken',
	SET_DEFAULT_BLOCK_DATA = 'setDefaultBlockData',
	SET_SURVEYS = 'setSurveys',
	SET_TEMPLATES = 'setTemplates',
	SET_ACTIVE_SURVEY = 'setActiveSurvey',
	ADD_ELEMENT = 'addElement',
	CHANGE_ELEMENT_POSITION = 'changeElementsPosition',
	SAVE_ELEMENT_DATA = 'saveElementData',
	DELETE_ELEMENT = 'deleteElement',
	ADD_PAGE = 'addPage',
	DELETE_PAGE = 'deletePage',
	SET_ACTIVE_PAGE = 'setActivePage',
	ADD_TOKEN = 'addToken',
	SET_TOKENS = 'setTokens',
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
	SAVE_ELEMENT_DATA = 'saveElementData',
	DELETE_ELEMENT = 'deleteElement',
	ADD_PAGE = 'addPage',
	DELETE_PAGE = 'deletePage',
	SET_ACTIVE_PAGE = 'setActivePage',
	LOAD_TOKENS = 'loadTokens',
	ADD_TOKEN = 'addToken',
	DELETE_TOKEN = 'deleteToken',
}

export enum getters
{
	CSRF = 'csrf',
	LOCALE = 'locale',
	TOKEN = 'token',
	ELEMENT_DEFAULT_DATA = 'elementDefaultData',
	SURVEYS = 'surveys',
	TEMPLATES = 'templates',
	SURVEY = 'activeSurvey',
	CURRENT_PAGE = 'currentPage',
	PAGE_BY_STEP = 'pageByStep',
	PAGES = 'pages',
	TOKENS = 'tokens',
}