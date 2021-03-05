import { SET_REVIEWS, RESET_REVIEWS } from '../actionTypes'

const initialState = {
    reviews:[],
    isLoading:true
}

export default function itemReducers(state = initialState, action){

    switch(action.type){

        case SET_REVIEWS:
            return {...state, reviews:action.payload, isLoading:false}
        
        case RESET_REVIEWS:
            return {
                ...state,
                isLoading:true
            }
        
        default: 
            return state
    }

}