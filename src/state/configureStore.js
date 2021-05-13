import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk";

import authReducer from './reducers/authReducer.js';
import fetcherReducer from './reducers/fetcherReducer.js';
import commonReducer from './reducers/commonReducer.js';

const rootReducer = combineReducers(
    {
        auth: authReducer,
        fetcher: fetcherReducer,
        common: commonReducer,
    },
);

const configureStore = () => {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk)
        )
    );
}

export default configureStore;