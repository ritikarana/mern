import { combineReducers } from 'redux';
import fullUsersReducer from './usersReducer';

const rootReducer = combineReducers({
  users: fullUsersReducer,
});

export default rootReducer;
