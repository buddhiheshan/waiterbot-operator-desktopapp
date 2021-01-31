import { SET_USER, RESET_USER } from '../ActionTypes'

const initialState = {
    token: null,
}

const userInfo = localStorage.getItem('token');

export default function userReducers(state = userInfo ? userInfo : initialState, action) {

    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                token: action.payload,
            };

        case RESET_USER:
            return {...initialState}

        default:
            return state;
    }

}