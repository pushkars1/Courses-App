import rootReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";

export const storeFactory  = (initialState={}) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export const mockStore = configureMockStore([thunk]);
