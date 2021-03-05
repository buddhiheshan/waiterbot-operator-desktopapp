import { SET_PROPERTY } from '../actionTypes';

const initialState = {
    name: null,
    id: null,
    address: null,
    description: null,
    imgURL: null,
    isLoading: true
}

export default function propertyReducer(state = initialState, action) {

    switch (action.type) {

        case SET_PROPERTY:
            return {
                ...state,
                name: action.payload.name,
                id: action.payload._id,
                address: action.payload.address,
                description: action.payload.description,
                imgURL: action.payload.imgUrl,
                isLoading: false
            };

        default:
            return state;
    }

}