import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')

export const getAutoBonus = createAsyncThunk(
	'policyGrowthReport/autoBonus/getContacts',

	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`BonusPlan/${belongTo}/all`);
			var autoBonus = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						autoBonus.push(data[item]);
					});
				}

				if (data) {
					resolve([autoBonus]);
				} else {
					resolve([]);
				}
			});
		})
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.policyGrowthReport.autoBonus
);

const contactsSlice = createSlice({
	name: 'policyGrowthReport/autoBonus',
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
