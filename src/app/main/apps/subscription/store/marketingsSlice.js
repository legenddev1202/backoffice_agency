import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

let belongTo = localStorage.getItem('@BELONGTO');

export const getMarketings = createAsyncThunk(
	'subscription/marketings/getMarketings',
	() =>
		new Promise((resolve, reject) => {			
			var starCountRef = realDb.ref(`Marketing/${belongTo}/`);
			var marketings = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						marketings.push(data[item]);
					});
				}

				resolve(marketings);
			});
		})
);

const marketingsAdapter = createEntityAdapter({});

export const { selectAll: selectMarketings, selectById: selectMarketingById } = marketingsAdapter.getSelectors(
	state => state.subscription.marketings
);

const marketingsSlice = createSlice({
	name: 'subscription/marketings',
	initialState: marketingsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {},
	extraReducers: {
		[getMarketings.fulfilled]: marketingsAdapter.setAll
	}
});

export const {} = marketingsSlice.actions;

export default marketingsSlice.reducer;
