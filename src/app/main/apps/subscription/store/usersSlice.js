import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getUsers = createAsyncThunk(
	'subscription/users/getUsers',
	() =>
		new Promise((resolve, reject) => {
			var uid = localStorage.getItem('@UID')
			var adminRef = realDb.ref(`admin/${uid}/`);
			
			var users = [];

			adminRef.on('value', adminSnap => {
				const adminData = adminSnap.val();
				if (adminData) {
					users.push(adminData)
					
				}
				resolve(users);
				
			});
		})
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors(
	state => state.subscription.users
);

const usersSlice = createSlice({
	name: 'subscription/users',
	initialState: usersAdapter.getInitialState({
		production: ''
	}),
	reducers: {
		setUser: {
			reducer: (state, action) => {
				state.production = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: usersAdapter.setAll
	}
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
