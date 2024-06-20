const initailState = {
    news: []
}

const newsReducer = (state = initailState, action) => {
    switch (action.type) {
        case "SET_VALUE":
            return {
               ...state,
                news: action.payload
            }
        case "SELECT_NEWS_CATEGORY":
        return {
            ...state,
            category: action.payload
        }
        default:
            return state
    }
}

export default newsReducer;