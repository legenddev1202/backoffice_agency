import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getProductType = createAsyncThunk(
	'addbonusPlanTemplate/typeProduct/getProducts',
	() =>
		new Promise((resolve, reject) => {
            var belongTo = localStorage.getItem('@BELONGTO')
			var starCountRef = realDb.ref(`ProductType/${belongTo}/`);
			var entries = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();
                console.log(data)
				if (data) {
					Object.keys(data).map(item => {
						entries.push(data[item]);
					});
				}

				resolve(entries);
			});
		})
);







const productsAdapter = createEntityAdapter({});

export const { selectAll: selectTypeProduct, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.addbonusPlanTemplate.typeProduct
);

const productsSlice = createSlice({
	name: 'addbonusPlanTemplate/typeProduct',
	initialState: productsAdapter.getInitialState({
		searchText: ''
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
		[getProductType.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
