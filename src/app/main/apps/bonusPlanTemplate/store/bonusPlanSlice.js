import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getAutoBonus = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/getContacts',

	// const response = await axios.get('/api/bonus-plan/contacts', {
	// 	params: routeParams
	// });
	// const data = await response.data;

	// return { data, routeParams };
	(routeParam, { getState }) =>
		new Promise((resolve, reject) => {
			var belongTo = localStorage.getItem('@BELONGTO');
			var starCountRef = realDb.ref(`BonusPlanTemplate/${belongTo}/all`);
			var bonusPlans = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						bonusPlans.push(data[item]);
					});
				}

				if (data) {
					resolve([data]);
				} else {
					resolve([]);
				}
			});
		})
);

export const addContact = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/addContact',
	async (contact, { dispatch, getState }) => {
		// console.log(contact, contact.routeParam);
		const response = await axios.post('/api/bonus-plan-template/add-contact', { contact });
		const data = await response.data;

		dispatch(getAutoBonus(contact.routeParam));

		return data;
	}
);

export const updateContact = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/updateContact',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/update-contact', { contact });
		const data = await response.data;

		dispatch(getAutoBonus(contact.routeParam));

		return data;
	}
);

export const removeContact = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/removeContact',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/remove-contact', { contact });
		const data = await response.data;
		var belongTo = localStorage.getItem('@BELONGTO');
		realDb.ref(`BonusPlan/${belongTo}/${contact.routeParam}/${contact.planType}/${contact.id}`).remove();
		dispatch(getAutoBonus(contact.routeParam));

		return data;
	}
);

export const removeContacts = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/removeContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/remove-contacts', { contactIds });
		const data = await response.data;

		dispatch(getAutoBonus());

		return data;
	}
);

export const toggleStarredContact = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'bonusPlanTemplate/autoBonus/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/bonus-plan-template/set-contacts-unstarred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getAutoBonus());

		return data;
	}
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.bonusPlanTemplate.autoBonus
);

const contactsSlice = createSlice({
	name: 'bonusPlanTemplate/autoBonus',
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
		showAutoTargetAmount:false,
		showFireTargetAmount:false,
		showLifeTargetAmount:false,
		showHealthTargetAmount:false,
		showBankTargetAmount:false,
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
			}
		},
		setData: (state, action)=>{
			state.data = {
				...action.payload
			}
		},
		setTemplate: (state, action) => {
			state.template = {
				...action.payload
			};
			
		},
		changeAutoTargetValue:(state, action) => {
			state.showAutoTargetAmount = action.payload
		},
		changeFireTargetValue:(state, action) => {
			state.showFireTargetAmount = action.payload
		},
		changeLifeTargetValue:(state, action) => {
			state.showLifeTargetAmount = action.payload
		},
		changeHealthTargetValue:(state, action) => {
			state.showHealthTargetAmount = action.payload
		},
		changeBankTargetValue:(state, action) => {
			state.showBankTargetAmount = action.payload
		},
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
	setTemplate,
	changeAutoTargetValue,
	changeFireTargetValue,
	changeLifeTargetValue,
	changeHealthTargetValue,
	changeBankTargetValue
} = contactsSlice.actions;

export default contactsSlice.reducer;
