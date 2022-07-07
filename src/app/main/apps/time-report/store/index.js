import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import tracks from './trackSlice';
import users from './usersSlice';

const reducer = combineReducers({
	tracks,
	widgets,
	users,
});

export default reducer;
