import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {realDb} from '../../../../../@fake-db/db/firebase'

var belongTo = localStorage.getItem('@BELONGTO')
// var UID = localStorage.getItem('@UID')

export const getBonusPlans = createAsyncThunk(
	'visionApp/bonusPlans/getBonusPlans', 
	(uid) =>
		new Promise((resolve, reject) => { 
			var starCountRef = realDb.ref(`BonusPlan/${belongTo}/${uid}/`);			
			var bonusPlans = [];		
			starCountRef.on('value', snapshot => { 
				const data = snapshot.val();
				
				if(data) {
					var templateRef = realDb.ref(`BonusPlanTemplate/${belongTo}/${data.name}`);
					templateRef.on('value', snapshot => { 
						const templatePlan = snapshot.val();	
				
						if(templatePlan) {
							resolve([templatePlan])
						} else {
							resolve([]);	
						}						
					});
				} else {
					resolve([]);
				}				
			});
		})
);

const bonusPlansAdapter = createEntityAdapter({});

export const { selectAll: selectBonusPlans, selectById: selectBonusPlansById } = bonusPlansAdapter.getSelectors(
	state => state.visionApp.bonusPlans
);

const bonusPlansSlice = createSlice({
	name: 'visionApp/bonusPlans',
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
