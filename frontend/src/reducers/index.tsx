import { combineReducers } from 'redux';
import fullUsersReducer from './usersReducer';
import loginReducer from './userLoginReducer'

const rootReducer = combineReducers({
  users: fullUsersReducer,
  login: loginReducer
});

export default rootReducer;
