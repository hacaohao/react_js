import {applyMiddleware, combineReducers, createStore} from 'redux';
import card from './reducers/cardReducer';
import draft from './reducers/draftReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import throttleActions from "redux-throttle-actions";
import constants from './constants';

const throttle = throttleActions([constants.UPDATE_CARD_POSITION, constants.UPDATE_CARD_STATUS], 500);
const middleware = applyMiddleware(promise(), thunk, throttle, logger);
let reducer = combineReducers({card, draft});

export default createStore(reducer, middleware);