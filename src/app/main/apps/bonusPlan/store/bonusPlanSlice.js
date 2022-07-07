import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getAutoBonus = createAsyncThunk(
	'bonusPlan/autoBonus/getContacts',

	// const response = await axios.get('/api/bonus-plan/contacts', {
	// 	params: routeParams
	// });
	// const data = await response.data;

	// return { data, routeParams };
	(routeParam, { getState }) =>
		new Promise((resolve, reject) => {
			var belongTo = localStorage.getItem('@BELONGTO');
			var starCountRef = realDb.ref(`BonusPlan/${belongTo}/${routeParam}`);
			var bonusPlans = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						bonusPlans.push(data);
					});
				}
				resolve(bonusPlans);
			});
		})
);

export const addContact = createAsyncThunk(
	'bonusPlan/autoBonus/addContact',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/add-contact', { contact });
		const data = await response.data;

		dispatch(getAutoBonus(contact.routeParam));

		return data;
	}
);

export const updateContact = createAsyncThunk(
	'bonusPlan/autoBonus/updateContact',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/update-contact', { contact });
		const data = await response.data;

		dispatch(getAutoBonus(contact.routeParam));

		return data;
	}
);

export const removeContact = createAsyncThunk(
	'bonusPlan/autoBonus/removeContact',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/remove-contact', { contact });
		const data = await response.data;
		var belongTo = localStorage.getItem('@BELONGTO');
		realDb.ref(`BonusPlan/${belongTo}/${contact.routeParam}/${contact.planType}/${contact.id}`).remove();
		dispatch(getAutoBonus(contact.routeParam));

		return data;
	}
);

export const removeContacts = createAsyncThunk(
	'bonusPlan/autoBonus/removeContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/remove-contacts', { contactIds });
		const data = await response.data;

		dispatch(getAutoBonus());

		return data;
	}
);

export const toggleStarredContact = createAsyncThunk(
	'bonusPlan/autoBonus/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'bonusPlan/autoBonus/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'bonusPlan/autoBonus/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'bonusPlan/autoBonus/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan/set-contacts-unstarred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.bonusPlan.autoBonus
);

const contactsSlice = createSlice({
	name: 'bonusPlan/autoBonus',
	initialState: contactsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		contactDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		targetBonusDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		teamTargetBonusDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		netBonusDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		tempData: {},
		addTempData: {},
		removeTempData: {},
		data: {},
		template: {}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		openNewTargetBonusDialog: (state, action) => {
			state.targetBonusDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		openNewTeamTargetBonusDialog: (state, action) => {
			state.teamTargetBonusDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		openNewNetBonuseDialog: (state, action) => {
			state.netBonusDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeNewTargetBonusDialog: (state, action) => {
			state.targetBonusDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		closeNewNetBonusDialog: (state, action) => {
			state.netBonusDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		closeNewTeamTargetBonusDialog: (state, action) => {
			state.teamTargetBonusDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditTargetBonusDialog: (state, action) => {
			state.targetBonusDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		openEditNetBonusDialog: (state, action) => {
			state.netBonusDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		openEditTeamTargetBonusDialog: (state, action) => {
			state.teamTargetBonusDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		closeEditNetBonusDialog: (state, action) => {
			state.netBonusDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		closeEditTargetBonusDialog: (state, action) => {
			state.targetBonusDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		closeEditTeamTargetBonusDialog: (state, action) => {
			state.teamTargetBonusDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		setTempData: (state, action) => {
			state.tempData = {
				...action.payload
			};
		},
		setAddTempData: (state, action) => {
			state.addTempData = {
				...action.payload
			};
		},
		setRemoveTempData: (state, action) => {
			state.removeTempData = {
				...action.payload
			};
		},
		setData: (state, action) => {
			state.data = {
				...action.payload
			};
		},
		setTemplate: (state, action) => {
			state.template = {
				...action.payload
			};
		}
	},
	extraReducers: {
		[updateContact.fulfilled]: contactsAdapter.upsertOne,
		[addContact.fulfilled]: contactsAdapter.addOne,
		[getAutoBonus.fulfilled]: contactsAdapter.setAll
		// (state, action) => {
		// const { data, routeParams } = action.payload;
		// contactsAdapter.setAll;
		// state.routeParams = routeParams;
		// state.searchText = '';
		// }
	}
});

export const {
	setContactsSearchText,
	openNewContactDialog,
	closeNewContactDialog,
	openEditContactDialog,
	closeEditContactDialog,
	openNewTargetBonusDialog,
	closeNewTargetBonusDialog,
	openEditTargetBonusDialog,
	closeEditTargetBonusDialog,
	openNewTeamTargetBonusDialog,
	closeNewTeamTargetBonusDialog,
	openEditTeamTargetBonusDialog,
	closeEditTeamTargetBonusDialog,
	openNewNetBonuseDialog,
	closeNewNetBonusDialog,
	openEditNetBonusDialog,
	closeEditNetBonusDialog,
	setTempData,
	setAddTempData,
	setRemoveTempData,
	setData,
	setTemplate
} = contactsSlice.actions;

export default contactsSlice.reducer;
