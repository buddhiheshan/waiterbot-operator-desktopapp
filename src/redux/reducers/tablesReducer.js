import { SET_TABLES } from '../actionTypes';

const initialState = {
    tables: [],
    isLoading: true
}

export default function tablesReducer(state = initialState, action) {

    switch (action.type) {

        case SET_TABLES:
            return {
                ...state,
                tables: action.payload,
                isLoading: false
            };

        default:
            return state;
    }

}