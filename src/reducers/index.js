import { combineReducers } from 'redux';
import headerReducer from './header';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({ headerReducer, gameReducer });

export default rootReducer;
