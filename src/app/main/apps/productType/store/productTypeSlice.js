import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')

export const getMarketing = createAsyncThunk(
	'productType/productType/getMarketings',
	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`ProductType/${belongTo}/`);
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



export const saveMarketing = createAsyncThunk('productType/productType/saveMarketing', async (product, { dispatch, getState }) => {

	const response = await axios.post('/api/setup/productType/product/save', product);
	const data = await response.data;
	dispatch(getMarketing());
	return data;
});

export const removeMarketing = createAsyncThunk(
	'productType/productType/removeMarketing',
	async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/setup/productType/product/remove-products', { productIds });
		const data = await response.data;
		productIds.map(item => {
			var starCountRef = realDb.ref(`ProductType/${belongTo}/${item}`);
			starCountRef.remove();
		});

		dispatch(getMarketing());

		return data;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectMarketing, selectById: selectMarketingById } = productsAdapter.getSelectors(
	state => state.productType.productType
);

const productsSlice = createSlice({
	name: 'productType/productType',
	initialState: productsAdapter.getInitialState({
		searchText: '',
		policy: "Entries",
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		setPolicy: (state, action) => {
			state.policy = action.payload;
		},
	},
	extraReducers: {
		[getMarketing.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText, setPolicy } = productsSlice.actions;

export default productsSlice.reducer;
