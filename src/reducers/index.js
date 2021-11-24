import { combineReducers } from 'redux';
import headerReducer from './header';

const rootReducer = combineReducers({ headerReducer });

export default rootReducer;
