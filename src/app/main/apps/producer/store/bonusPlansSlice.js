import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {realDb} from '../../../../../@fake-db/db/firebase'

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')

export const getBonusPlans = createAsyncThunk(
	'producerApp/bonusPlans/getBonusPlans', 
	(routeParams) =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`BonusPlan/${belongTo}/${UID}/`);			
			var bonusPlans = [];		
			starCountRef.on('value', snapshot => { 
				const data = snapshot.val();

				// if (data) {
				// 	Object.keys(data).map(item => {
				// 		bonusPlans.push(data[item]);
				// 	});
				// }
				
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
	state => state.producerApp.bonusPlans
);

const bonusPlansSlice = createSlice({
	name: 'producerApp/bonusPlans',
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
