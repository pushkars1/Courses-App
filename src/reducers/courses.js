import {actionTypes} from '../actions';

const initialState = {
    courses: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_COURSES:
            return {
                ...state,
                courses: action.payload
            }
        default:
            return state;
    }
}