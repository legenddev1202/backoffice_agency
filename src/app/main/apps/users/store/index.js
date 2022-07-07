import { combineReducers } from '@reduxjs/toolkit';

import users from './userSlice';
import templates from './bonusPlanSlice'


const reducer = combineReducers({
	users,
	templates
});

export default reducer;
