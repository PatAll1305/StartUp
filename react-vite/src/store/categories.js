import { csrfFetch } from "./csrf";

const GET_CATEGORIES = 'categories/GET'

const getCategories = ( categories ) => ({
    type: GET_CATEGORIES,
    categories
})

export const getCategoriesThunk = () => async ( dispatch ) => {
    const res = await csrfFetch('/api/categories')
    if(res.ok) {
        throw new Error('Network not responding')
    }

    const categories = await res.json()
    dispatch(getCategories(categories))
    return categories
}

export default function categoryReducer(state = {}, action) {
    switch(action.type) {
        case GET_CATEGORIES: {
            const newState = {}
            action.categories.forEach(( category ) => {
                newState[category.id] = category
            })
            return newState
        }
        default:
            return state
    }
}
