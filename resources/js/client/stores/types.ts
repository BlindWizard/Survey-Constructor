export enum mutations {
	SET_SURVEY = 'setSurvey',
	SET_PAGE = 'setPage',
}

export enum actions {
	LOAD_SURVEY = 'loadSurvey',
	NEXT_PAGE = 'nextPage',
	PREV_PAGE = 'prevPage',
}

export enum getters
{
	CURRENT_PAGE = 'currentPage',
	PAGES = 'pages',
	IS_LAST_PAGE = 'isLastPage',
	IS_FIRST_PAGE = 'isFirstPage',
}