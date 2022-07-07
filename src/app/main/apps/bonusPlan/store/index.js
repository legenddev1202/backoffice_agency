import { combineReducers } from '@reduxjs/toolkit';
import autoBonus from './bonusPlanSlice';
import user from './userSlice';
import typeProduct from './productTypeSlice'
import templates from './bonusPlanTemplateSlice'

const reducer = combineReducers({
	autoBonus,
	user,
	typeProduct,
	templates
});

export default reducer;
