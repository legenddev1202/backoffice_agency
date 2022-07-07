import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {realDb} from '../../../../../@fake-db/db/firebase'

var belongTo = localStorage.getItem('@BELONGTO')

export const getBonusPlanTemplates = createAsyncThunk(
	'projectionsApp/bonusPlanTemplates/getBonusPlanTemplates', 
	() =>
		new Promise((resolve, reject) => { 
			var starCountRef = realDb.ref(`BonusPlanTemplate/${belongTo}/`);			
			var bonusPlanTemplates = [];		
			starCountRef.on('value', snapshot => { 
				const data = snapshot.val();
			
				if(data) {
					resolve([data]);
				} else {
					resolve([]);
				}				
			});
		})
);

const bonusPlanTemplatesAdapter = createEntityAdapter({});

export const { selectAll: selectBonusPlanTemplates, selectById: selectBonusPlanTemplatesById } = bonusPlanTemplatesAdapter.getSelectors(
	state => state.projectionsApp.bonusPlanTemplates
);

const bonusPlanTemplatesSlice = createSlice({
	name: 'projectionsApp/bonusPlanTemplates',
	initialState: bonusPlanTemplatesAdapter.getInitialState({
		searchText: '',
	}),
	reducers: {},
	extraReducers: {
		[getBonusPlanTemplates.fulfilled]: bonusPlanTemplatesAdapter.setAll
	}
});

export const {} = bonusPlanTemplatesSlice.actions;

export default bonusPlanTemplatesSlice.reducer;
