import { combineReducers } from '@reduxjs/toolkit';
import vision from './visionSlice';
import bonusPlans from './bonusPlansSlice';
import users from './usersSlice';
import widgets from './widgetsSlice';

const reducer = combineReducers({
	vision,
	widgets,
	bonusPlans,
	users,
});

export default reducer;
