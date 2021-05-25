import { SET_ROBOTS, CHANGE_ROBOT_STATE } from '../actionTypes';

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

        case CHANGE_ROBOT_STATE:
            return {
                ...state,
                robots: state.robots.map(robot => {
                    if (robot._id === action.payload.robotID) return { ...robot, status: action.payload.newStatus }
                    return robot
                })
            }

        default:
            return state;
    }

}