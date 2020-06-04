export enum mutations {
	SET_SURVEY_ID = 'setSurveyId',
	SET_CLIENT_ID = 'setClientId',
	SET_TOKEN = 'setToken',
	SET_SURVEY = 'setSurvey',
	SET_PAGE = 'setPage',
}

export enum actions {
	LOAD_SETTINGS = 'loadSettings',
	LOAD_SURVEY = 'loadSurvey',
	NEXT_PAGE = 'nextPage',
	PREV_PAGE = 'prevPage',
	OPTIONS_LIST_SELECT = 'optionsListSelect',
	OPTION_SELECT = 'optionSelect',
	ENTER_TEXT = 'enterText',
}

export enum getters
{
	CURRENT_PAGE = 'currentPage',
	PAGES = 'pages',
	IS_LAST_PAGE = 'isLastPage',
	IS_FIRST_PAGE = 'isFirstPage',
}