import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO');

export const getMarketing = createAsyncThunk(
	'eCommerceApp/marketing/getProducts',
	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`Marketing/${belongTo}`);
			var uid = localStorage.getItem('@UID');
			var bonus = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();
				console.log(data)
				if(data){
					bonus.push(data)
				}			

				resolve(bonus);
			});
		})
);




const productsAdapter = createEntityAdapter({});

export const { selectAll: selectMarketing, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.marketing
);

const productsSlice = createSlice({
	name: 'eCommerceApp/marketing',
	initialState: productsAdapter.getInitialState({
		searchText: '',
		editData: {}
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMarketing.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
