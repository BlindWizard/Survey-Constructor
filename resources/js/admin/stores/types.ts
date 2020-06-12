export enum mutations
{
	SET_CSRF = 'setCsrf',
	SET_LOCALE = 'setLocale',
	SET_TOKEN = 'setToken',
	SET_SECTION = 'setSection',
	SET_EDITING = 'setEditing',
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
	SET_SURVEY_STATISTICS = 'setSurveyStatistics',
	SET_STATISTICS_SAMPLE = 'setStatisticsSample',
}

export enum actions
{
	SET_EDITING = 'setEditing',
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
	LOAD_SURVEY_STATISTICS = 'getSurveyStatistics',
	LOAD_STATISTICS_SAMPLE = 'getStatisticsSample',
	SET_SECTION = 'setSection',
}

export enum getters
{
	CSRF = 'csrf',
	LOCALE = 'locale',
	TOKEN = 'token',
	SECTION = 'section',
	EDITING = 'editing',
	ELEMENT_DEFAULT_DATA = 'elementDefaultData',
	SURVEYS = 'surveys',
	TEMPLATES = 'templates',
	SURVEY = 'activeSurvey',
	SURVEY_STATISTICS = 'surveyStatistics',
	STATISTICS_SAMPLE = 'statisticsSample',
	CURRENT_PAGE = 'currentPage',
	PAGE_BY_STEP = 'pageByStep',
	PAGES = 'pages',
	TOKENS = 'tokens',
}