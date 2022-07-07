import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getLifes = createAsyncThunk(
	'eCommerceApp/lifeEntries/getProducts',
	() =>
		new Promise((resolve, reject) => {
			const uid = localStorage.getItem('@UID')
			var starCountRef = realDb.ref(`EnterSales/LifeEntries/${uid}`);
			var entries = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						entries.push(data[item]);
					});
				}
				console.log(data)

				resolve(entries);
			});
		})
);

export const saveProduct = createAsyncThunk('eCommerceApp/lifeEntry/saveProduct', async (product, { dispatch, getState }) => {

	const response = await axios.post('/api/life-entry/product/save', product);
	const data = await response.data;
	dispatch(getLifes());
	return data;
});

export const removeProducts = createAsyncThunk(
	'eCommerceApp/lifeEntries/removeProducts',
	async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/life-entry/remove-products', { productIds });
		const data = await response.data;
		productIds.map(item => {
			var starCountRef = realDb.ref(`EnterSales/LifeEntries/${item}`);
			starCountRef.remove();
		});

		dispatch(getLifes());

		return data;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectLifes, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.lifeEntries
);

const productsSlice = createSlice({
	name: 'eCommerceApp/lifeEntries',
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
		[getLifes.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
