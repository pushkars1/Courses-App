import {combineReducers} from 'redux';
import courses from './courses';
import login from './login';
import cart from './cart';

export default combineReducers({
    courses,
    login,
    cart
});