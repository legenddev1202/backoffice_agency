import { combineReducers } from '@reduxjs/toolkit';
import projects from './lapseSlice';
import widgets from './widgetsSlice';
import autoBonus from './bonusPlanSlice';

const reducer = combineReducers({
	widgets,
	projects,
	autoBonus
});

export default reducer;
