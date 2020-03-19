import {actionTypes} from '../actions';

const initialState = {
    isLogin: false,
    open: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                isLogin: true
                            }
        case actionTypes.OPEN_MODAL:
            return {
                ...state,
                open: true
            }

        case actionTypes.CLOSE_MODAL:
            return {
                ...state,
                open: false
            }
        default:
            return state;
    }
}