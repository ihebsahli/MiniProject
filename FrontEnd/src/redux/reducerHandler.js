const reducerHandler = (state, action, actionHandler) => {
    switch (action.type) {
        case actionHandler.REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionHandler.SUCCESS:
            return {
                ...state,
                isLoading: false,
                loaded: true,
                data: action.data,
                error: null
            }
        case actionHandler.FAILURE:
            return {
                ...state,
                isLoading: false,
                loaded: true,
                error: action.data,
                data: [],
            }
        default:
            return state;
    }
}

export { reducerHandler }