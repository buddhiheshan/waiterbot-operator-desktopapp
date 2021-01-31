import { SET_ITEMS, SET_SELECTED_ITEM } from '../ActionTypes';

const initialState = {
    items: [],
    isLoading: true,
    selectedItem: null
}

export default function itemsReducer(state = initialState, action) {

    switch (action.type) {

        case SET_ITEMS:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };

        case SET_SELECTED_ITEM:
            return{
                ...state,
                selectedItem : action.payload
            }
        

        default:
            return state;
    }

}