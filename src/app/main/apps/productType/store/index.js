import { combineReducers } from '@reduxjs/toolkit';
import productType from './productTypeSlice';


const reducer = combineReducers({
	productType,

});

export default reducer;
