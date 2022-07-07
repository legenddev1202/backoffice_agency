import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import { realDb } from '../../../../../@fake-db/db/firebase';



export const getAutoBonus = createAsyncThunk(
	'lapseRate/autoBonus/getContacts',

	() =>
		new Promise((resolve, reject) => {
			var belongTo = localStorage.getItem('@BELONGTO')
			var starCountRef = realDb.ref(`BonusPlan/${belongTo}/${belongTo}`);
			var bonusRef = realDb.ref(`BonusPlanTemplate/${belongTo}/`);
			bonusRef.on('value', snap=>{
				var snapData = snap.val()
				starCountRef.on('value', snapshot => {
					const data = snapshot.val();	
					
	
					if (snapData) {
						resolve([snapData[data.name]]);
					} else {
						resolve([]);
					}
				});
			})
			
		})
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.lapseRate.autoBonus
);

const contactsSlice = createSlice({
	name: 'lapseRate/autoBonus',
	initialState: contactsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAutoBonus.fulfilled]: contactsAdapter.setAll
	}
});

export default contactsSlice.reducer;
