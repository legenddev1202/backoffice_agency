import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getProductType = createAsyncThunk(
	'eCommerceApp/productType/getProducts',
	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`ProductType/`);
			var entries = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					// Object.keys(data).map(item => {
						entries.push(data);
					// });
				}

				resolve(entries);
			});
		})
);



export const saveProduct = createAsyncThunk('eCommerceApp/productType/saveProduct', async (product, { dispatch, getState }) => {

	const response = await axios.post('/api/setup/productType/save', product);
	const data = await response.data;
	dispatch(getProductType());
	return data;
});

export const removeProducts = createAsyncThunk(
	'eCommerceApp/productType/removeProducts',
	async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/e-commerce-app/remove-products', { productIds });
		const data = await response.data;
		productIds.map(item => {
			var starCountRef = realDb.ref(`EnterSales/Entries/${item}`);
			starCountRef.remove();
		});

		dispatch(getProductType());

		return data;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProductType, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.productType
);

const productsSlice = createSlice({
	name: 'eCommerceApp/productType',
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
