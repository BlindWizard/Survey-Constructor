export enum mutations
{
	SET_CSRF = 'setCsrf',
	SET_LOCALE = 'setLocale',
	SET_TOKEN = 'setToken',
	SET_SECTION = 'setSection',
	SET_EDITING = 'setEditing',
	SET_RESIZING = 'setResizing',
	SET_DEFAULT_BLOCK_DATA = 'setDefaultBlockData',
	SET_ACTIONS_TYPES = 'setActionsTypes',
	SET_SURVEYS = 'setSurveys',
	DELETE_SURVEY = 'deleteSurvey',
	SET_TEMPLATES = 'setTemplates',
	SET_ACTIVE_SURVEY = 'setActiveSurvey',
	ADD_ELEMENT = 'addElement',
	ADD_ELEMENT_ACTION = 'addElementAction',
	DELETE_ELEMENT_ACTION = 'deleteElementAction',
	CHANGE_ELEMENT_POSITION = 'changeElementsPosition',
	SAVE_ELEMENT_DATA = 'saveElementData',
	SAVE_ELEMENT_STYLE = 'saveElementStyle',
	SAVE_ELEMENT_ACTIONS = 'saveElementActions',
	SET_SLOT_STYLE = 'setSlotStyle',
	RESIZE_ELEMENT = 'resizeElement',
	CHANGE_SIZE_MEASURE = 'changeSizeMeasure',
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
	SET_RESIZING = 'setResizing',
	LOAD_SETTINGS = 'loadSettings',
	LOAD_SURVEYS = 'loadSurveys',
	LOAD_TEMPLATES = 'loadTemplates',
	CREATE_SURVEY = 'createSurvey',
	LOAD_SURVEY = 'getSurvey',
	DELETE_SURVEY = 'deleteSurvey',
	ADD_ELEMENT = 'addElement',
	REORDER_ELEMENT = 'reorderElement',
	SAVE_ELEMENT_DATA = 'saveElementData',
	RESIZE_ELEMENT = 'resizeElement',
	CHANGE_SLOTS_COUNT = 'changeSlotsCount',
	CHANGE_SIZE_MEASURE = 'changeSizeMeasure',
	SAVE_STYLE = 'saveStyle',
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
	ADD_ACTION = 'addAction',
	DELETE_ACTION = 'deleteAction',
}

export enum getters
{
	CSRF = 'csrf',
	LOCALE = 'locale',
	TOKEN = 'token',
	SECTION = 'section',
	EDITING = 'editing',
	RESIZING = 'resizing',
	ELEMENT_DEFAULT_DATA = 'elementDefaultData',
	ACTIONS_TYPES = 'actionsTypes',
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