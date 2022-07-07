import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';


export const getUsers = createAsyncThunk(
	'eCommerceApp/users/getUsers',
	() =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`users/`);
			var belongTo = localStorage.getItem('@BELONGTO')

			var users = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {

						if (data[item].belongTo === belongTo) {
							console.log('----------------')
							users.push(data[item]);
						}

					});
				}


				resolve(users);


			});
		})
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.eCommerceApp.users
);

const productsSlice = createSlice({
	name: 'eCommerceApp/users',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: productsAdapter.setAll
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
