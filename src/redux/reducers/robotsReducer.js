import { SET_ROBOTS } from '../actionTypes';

const initialState = {
    robots: [],
    isLoading: true
}

export default function robotsReducer(state = initialState, action) {

    switch (action.type) {

        case SET_ROBOTS:
            return {
                ...state,
                robots: action.payload,
                isLoading: false
            };

        default:
            return state;
    }

}