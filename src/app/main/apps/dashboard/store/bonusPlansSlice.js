import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {realDb} from '../../../../../@fake-db/db/firebase'

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')

export const getBonusPlans = createAsyncThunk(
	'dashboardApp/bonusPlans/getBonusPlans', 
	(routeParams) =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`BonusPlanTemplate/${belongTo}/Team Bonus Plan Template/`);
			var bonusPlans = [];		
			starCountRef.on('value', snapshot => { 
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						bonusPlans.push(data[item]);
					});
				}
				
				if(data){
					resolve([data])
				} else {
					resolve([]);
				}				
			});
		})
);

const bonusPlansAdapter = createEntityAdapter({});

export const { selectAll: selectBonusPlans, selectById: selectBonusPlansById } = bonusPlansAdapter.getSelectors(
	state => state.dashboardApp.bonusPlans
);

const bonusPlansSlice = createSlice({
	name: 'dashboardApp/bonusPlans',
	initialState: bonusPlansAdapter.getInitialState({
		searchText: '',
	}),
	reducers: {},
	extraReducers: {
		[getBonusPlans.fulfilled]: bonusPlansAdapter.setAll
	}
});

export const {} = bonusPlansSlice.actions;

export default bonusPlansSlice.reducer;
