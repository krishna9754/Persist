const setValue = (item) => {
    return{
        type: "SET_VALUE",
        payload: item
    }
}

export const selectNewsCategory = (selectItem) => {
    return {
        type: "SELECT_NEWS_CATEGORY",
        payload: selectItem
    }
}

export const selectProduct = (id) => {
    return {
        type: "SELECT_PRODUCT",
        payload: id
    }
}

export default setValue