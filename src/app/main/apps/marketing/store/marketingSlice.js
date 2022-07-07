import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';


let belongTo = localStorage.getItem('@BELONGTO')
export const getMarketing = createAsyncThunk(
	'marketing/marketing/getMarketings',
	() =>
		new Promise((resolve, reject) => {
			
			var starCountRef = realDb.ref(`Marketing/${belongTo}/`);
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

export const saveMarketing = createAsyncThunk('marketing/marketing/saveMarketing', async (product, { dispatch, getState }) => {

	const response = await axios.post('/api/setup/marketing/product/save', product);
	const data = await response.data;
	dispatch(getMarketing());
	return data;
});

export const removeMarketing = createAsyncThunk(
	'marketing/marketing/removeMarketing',
	async (productIds, { dispatch, getState }) => {
		const response = await axios.post('/api/setup/marketing/product/remove-products', { productIds });
		const data = await response.data;
		productIds.map(item => {
			var starCountRef = realDb.ref(`Marketing/${belongTo}/${item}`);
			starCountRef.remove();
		});

		dispatch(getMarketing());

		return data;
	}
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectMarketing, selectById: selectMarketingById } = productsAdapter.getSelectors(
	state => state.marketing.marketing
);

const productsSlice = createSlice({
	name: 'marketing/marketing',
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
		[getMarketing.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
