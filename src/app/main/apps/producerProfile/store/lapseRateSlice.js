import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')

export const getLapseRate = createAsyncThunk(
	'producrProfile/lapseRate/getLapseRate',
	(year) =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`LapseRateReport/${belongTo}/${year}/`);
			var lapseRate = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						lapseRate.push(data[item]);
					});
				}

				if(data) {
					resolve([data])
				} else {
					resolve([]);
				}
			});
		})
);

const lapseRateAdapter = createEntityAdapter({});

export const { selectAll: selectLapseRate, selectById: selectLapseRateById } = lapseRateAdapter.getSelectors(
	state => state.producrProfile.lapseRate
);

const lapseRateSlice = createSlice({
	name: 'producrProfile/lapseRate',
	initialState: lapseRateAdapter.getInitialState({
	}),
	reducers: {},
	extraReducers: {
		[getLapseRate.fulfilled]: lapseRateAdapter.setAll
	}
});

export const {} = lapseRateSlice.actions;

export default lapseRateSlice.reducer;
