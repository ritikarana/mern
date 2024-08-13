import { combineReducers } from 'redux';
import userReducer from './userReducer';
import fullUsersReducer from './fullUsersReducer';

const rootReducer = combineReducers({
  user: userReducer,
  users: fullUsersReducer,
  // Add other reducers here
});

export default rootReducer;
