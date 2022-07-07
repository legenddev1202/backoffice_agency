import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import entries from './entriesSlice';
import users from './usersSlice';

const reducer = combineReducers({
	users,
	entries,
	widgets,
});

export default reducer;
