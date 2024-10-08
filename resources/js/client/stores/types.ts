export enum mutations {
	SET_SURVEY_ID = 'setSurveyId',
	SET_CLIENT_ID = 'setClientId',
	SET_TOKEN = 'setToken',
	SET_SURVEY = 'setSurvey',
	SET_PAGE = 'setPage',
	CHANGE_DATA = 'changeData'
}

export enum actions {
	LOAD_SETTINGS = 'loadSettings',
	LOAD_SURVEY = 'loadSurvey',
	OPTIONS_LIST_SELECT = 'optionsListSelect',
	OPTION_SELECT = 'optionSelect',
	ENTER_TEXT = 'enterText',
	SET_PAGE = 'setPage',
	CHANGE_DATA = 'changeData'
}

export enum getters
{
	SURVEY = 'activeSurvey',
	SURVEY_ID = 'activeSurveyId',
	CURRENT_PAGE = 'currentPage',
	IS_LAST_PAGE = 'isLastPage',
	IS_FIRST_PAGE = 'isFirstPage',
}