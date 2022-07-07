import { combineReducers } from '@reduxjs/toolkit';
import marketing from './marketingSlice';


const reducer = combineReducers({
	marketing,

});

export default reducer;
