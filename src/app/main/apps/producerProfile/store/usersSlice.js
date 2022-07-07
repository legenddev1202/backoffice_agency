import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getUsers = createAsyncThunk(
	'producrProfile/users/getUsers',
	() =>
	new Promise((resolve, reject) => {
		var starCountRef = realDb.ref(`users/`);
		var agencyRef = realDb.ref(`agency/`);
		var adminRef = realDb.ref(`admin/`);
		var users = [];
		starCountRef.on('value', snapshot => {
			const data = snapshot.val();

			if (data) {
				Object.keys(data).map(item => {
					users.push(data[item]);
				});
			}

			agencyRef.on('value', snap => {
				const agencyData = snap.val()
				if (agencyData) {
					Object.keys(agencyData).map(item => {
						users.push(agencyData[item]);
					});
				}

				adminRef.on('value', adminSnap => {
					const adminData = adminSnap.val()
					if (adminData) {
						Object.keys(adminData).map(item => {
							users.push(adminData[item]);
						});
					}
					resolve(users);
				})
			})
		});
	})
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors(
	state => state.producrProfile.users
);

const usersSlice = createSlice({
	name: 'producrProfile/users',
	initialState: usersAdapter.getInitialState({
		production: '',
	}),
	reducers: {
		setUser: {
			reducer: (state, action) => {
				state.production = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
	},
	extraReducers: {
		[getUsers.fulfilled]: usersAdapter.setAll
	}
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
