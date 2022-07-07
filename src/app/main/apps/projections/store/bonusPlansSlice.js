import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO');
// var UID = localStorage.getItem('@UID')

export const getBonusPlans = createAsyncThunk(
	'projectionsApp/bonusPlans/getBonusPlans',
	() =>
		new Promise((resolve, reject) => { 
			var templateRef = realDb.ref(`BonusPlanTemplate/${belongTo}`);

			templateRef.on('value', snapshot => {
				const templatePlan = snapshot.val();

				if (templatePlan) {
					resolve([templatePlan]);
				} else {
					resolve([]);
				}
			});
		})
);

const bonusPlansAdapter = createEntityAdapter({});

export const { selectAll: selectBonusPlans, selectById: selectBonusPlansById } = bonusPlansAdapter.getSelectors(
	state => state.projectionsApp.bonusPlans
);

const bonusPlansSlice = createSlice({
	name: 'projectionsApp/bonusPlans',
	initialState: bonusPlansAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {},
	extraReducers: {
		[getBonusPlans.fulfilled]: bonusPlansAdapter.setAll
	}
});

export const {} = bonusPlansSlice.actions;

export default bonusPlansSlice.reducer;
