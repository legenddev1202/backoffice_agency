import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

export const getUsers = createAsyncThunk(
	'timeReportApp/users/getUsers', 
	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`users/`);
			var users = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						users.push(data[item]);
					});
				}
				
				resolve(users);
			});
		})
);

// export const getUsers = createAsyncThunk('agencyApp/users/getUsers', async () => {
// 	const response = await axios.get('/api/agency-app/users');
// 	const data = await response.data;

// 	return data;
// });

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors(
	state => state.timeReportApp.users
);

const usersSlice = createSlice({
	name: 'timeReportApp/users',
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
