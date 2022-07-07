import { combineReducers } from '@reduxjs/toolkit';
import projects from './lapseSlice';
import widgets from './widgetsSlice';
import autoBonus from './bonusPlanSlice';
import users from './userSlice';

const reducer = combineReducers({
	widgets,
	projects,
	autoBonus,
	users
});

export default reducer;
