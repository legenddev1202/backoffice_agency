import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

let belongTo = localStorage.getItem('@BELONGTO');

export const getBonusVerified = createAsyncThunk(
	'agencyApp/bonusVerified/getBonusVerified',
	(year) =>
		new Promise((resolve, reject) => {			
			var starCountRef = realDb.ref(`BonusVerified/${year}/${belongTo}`);
			var bonusVerified = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if(data) {
					bonusVerified = data;
				}
				// if (data) {
				// 	Object.keys(data).map(item => {
				// 		bonusVerified.push(data[item]);
				// 	});
				// }

				resolve([bonusVerified]);
			});
		})
);

export const saveBonusVerified = createAsyncThunk('agencyApp/bonusVerified/saveBonusVerified', async (params, { dispatch, getState }) => { 
	const response = await axios.post('/api/agency-app/bonusVerified/save', params); 
	const data = await response.data;

	return data;
});

const bonusVerifiedAdapter = createEntityAdapter({});

export const { selectAll: selectBonusVerified, selectById: selectBonusVerifiedById } = bonusVerifiedAdapter.getSelectors(
	state => state.agencyApp.bonusVerified
);

const bonusVerifiedSlice = createSlice({
	name: 'agencyApp/bonusVerified',
	initialState: bonusVerifiedAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {},
	extraReducers: {
		[getBonusVerified.fulfilled]: bonusVerifiedAdapter.setAll
	}
});

export const {} = bonusVerifiedSlice.actions;

export default bonusVerifiedSlice.reducer;
