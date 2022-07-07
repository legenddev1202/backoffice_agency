import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')

export const getPolicyGrowth = createAsyncThunk(
	'agencyApp/policyGrowth/getPolicyGrowth',
	(year) =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`PolicyGrowthReport/${year}/${belongTo}/`);
			var policyGrowth = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						policyGrowth.push(data[item]);
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

const policyGrowthAdapter = createEntityAdapter({});

export const { selectAll: selectPolicyGrowth, selectById: selectPolicyGrowthById } = policyGrowthAdapter.getSelectors(
	state => state.agencyApp.policyGrowth
);

const policyGrowthSlice = createSlice({
	name: 'agencyApp/policyGrowth',
	initialState: policyGrowthAdapter.getInitialState({
	}),
	reducers: {},
	extraReducers: {
		[getPolicyGrowth.fulfilled]: policyGrowthAdapter.setAll
	}
});

export const {} = policyGrowthSlice.actions;

export default policyGrowthSlice.reducer;
