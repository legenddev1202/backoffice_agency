import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getHealthes = createAsyncThunk(
	'eCommerceApp/healthEntries/getProducts',
	() =>
		new Promise((resolve, reject) => {
			const uid = localStorage.getItem('@UID')
			var starCountRef = realDb.ref(`EnterSales/HealthEntries/${uid}`);
			var entries = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						entries.push(data[item]);
					});
				}

				resolve(entries);
			});
		})
);

export const saveProduct = createAsyncThunk('eCommerceApp/healthEntry/saveProduct', async (product, { dispatch, getState }) => {

	const response = await axios.post('/api/health-entry/product/save', product);
	const data = await response.data;
	dispatch(getHealthes());
	return data;
});

export const removeProducts = createAsyncThunk(
	'eCommerceApp/healthEntries/removeProducts',
	async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/health-entry/remove-products', { productIds });
		const data = await response.data;
		productIds.map(item => {
			var starCountRef = realDb.ref(`EnterSales/HealthEntries/${item}`);
			starCountRef.remove();
		});

		dispatch(getHealthes());

		return data;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectHealthes, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.healthEntries
);

const productsSlice = createSlice({
	name: 'eCommerceApp/healthEntries',
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
		[getHealthes.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
