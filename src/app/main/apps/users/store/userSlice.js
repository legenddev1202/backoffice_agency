import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';
import {
	firebaseFuncitonSendEmailEndpoint,
	firebaseFunctionDeleteUserEndpoint,
	deployOfficerEndpoint,
	deployProducerEndpoint
} from 'app/fuse-configs/endpointConfig';
import md5 from 'md5';

export const getUsers = createAsyncThunk(
	'users/users/getUsers',
	() =>
		new Promise((resolve, reject) => {
			var belongTo = localStorage.getItem('@BELONGTO');
			var starCountRef = realDb.ref(`users/`);
			var agencyCountRef = realDb.ref(`agency/`);
			var invitationCountRef = realDb.ref(`Invitation/${belongTo}/`);
			var bonusRef = realDb.ref(`BonusPlan/${belongTo}/`);
			var uid = localStorage.getItem('@UID');
			var adminRef = realDb.ref(`admin/${uid}/`);
			var users = [];
			bonusRef.on('value', snapData => {
				const snapshotData = snapData.val();

				if (snapshotData) {
					starCountRef.on('value', snapshot => {
						const data = snapshot.val();

						if (data) {
							Object.keys(data).map(item => {
								if (belongTo === data[item].belongTo)
									users.push({
										...data[item],
										bonusPlan: snapshotData[item].name,
										teamBonus: snapshotData[item].teamBonus
									});
							});
						}

						agencyCountRef.on('value', snap => {
							const agencyData = snap.val();
							if (agencyData) {
								Object.keys(agencyData).map(item => {
									if (belongTo === agencyData[item].belongTo)
										users.push({
											...agencyData[item],
											bonusPlan: snapshotData[item].name,
											teamBonus: snapshotData[item].teamBonus
										});
								});
							}
							invitationCountRef.on('value', snaps => {
								const invitationData = snaps.val();

								if (invitationData) {
									Object.keys(invitationData).map(item => {
										users.push(invitationData[item]);
									});
								}

								adminRef.on('value', snapAdmin => {
									const adminData = snapAdmin.val();
									if (adminData) {
										users.push(adminData);
									}
									resolve(users);
								});
							});
						});
					});
				} else {
					resolve([]);
				}
			});
		})
);

export const saveUser = createAsyncThunk('users/users/saveUser', async (product, { dispatch, getState }) => {
	// const response = await axios.post('/api/users/save', product);
	// const data = await response.data;

	var belongTo = localStorage.getItem('@BELONGTO');
	console.log(product);
	console.log({
		name: product.template,
		teamBonus: product.teamBonus
	});
	console.log(`BonusPlan/${belongTo}/${product.uid}/`);
	realDb.ref(`BonusPlan/${belongTo}/${product.uid}/`).set({
		name: product.template,
		teamBonus: product.teamBonus
	});
	dispatch(getUsers());
	return product;
});

export const removeProducts = createAsyncThunk('users/users/removeUser', async (productIds, { dispatch, getState }) => {
	const response = await axios.post('/api/users/remove-users', { productIds });
	const data = await response.data;
	const uid = localStorage.getItem('@UID');
	productIds.map(item => {
		var starCountRef = realDb.ref(`Users/`);
		starCountRef.remove();
	});

	dispatch(getUsers());

	return data;
});

export const deleteUser = createAsyncThunk('users/users/deleteUser', async (UID, { dispatch, getState }) => {
	// const res = await axios.post('/api/users/remove-users', { UID });
	// const data = await res.data;
	const uid = localStorage.getItem('@UID');
	const form = { uid: UID };
	const response = await axios.post(firebaseFunctionDeleteUserEndpoint, form);
	var agencyDelRef = realDb.ref(`agency/${UID}`);
	var userDelRef = realDb.ref(`users/${UID}`);
	var invitationRef = realDb.ref(`Invitation/${uid}/${UID}`);

	agencyDelRef.remove();
	userDelRef.remove();
	invitationRef.remove();
	console.log(response, UID);

	dispatch(getUsers());

	return [];
});

export const addUser = createAsyncThunk('users/user/addUser', async (contact, { dispatch, getState }) => {
	// const deployOfficerEndpoint = 'http://localhost:3001';
	// const deployProducerEndpoint = 'http://localhost:3000';
	if (contact.role === 'agency') {
		var form = {
			email: contact.email,
			subject: 'Sent Invitation',
			emailBody:
				'<div><p>Please touch this link to register to Back Office Web App as Agency <p> ' +
				`<a href='` +
				deployOfficerEndpoint +
				'/register/' +
				contact.belongTo +
				`/pdElqKJexpOGk3s31VWMVTbQAgvmBRAyYLtt3KTJhEhRQ8YfMZIa6TU29SURp4NVDvttUuL6t0qjpwMSu2fp4h2LgpTMupdEoP8bGxGeOkMJ3Yg3X51GWHpxvWkdjiMw5PyvWqJQXsaXfeysGSA05l/` +
				contact.email +
				`'>` +
				deployOfficerEndpoint +
				'/register/' +
				contact.belongTo +
				`/pdElqKJexpOGk3s31VWMVTbQAgvmBRAyYLtt3KTJhEhRQ8YfMZIa6TU29SURp4NVDvttUuL6t0qjpwMSu2fp4h2LgpTMupdEoP8bGxGeOkMJ3Yg3X51GWHpxvWkdjiMw5PyvWqJQXsaXfeysGSA05l/` +
				contact.email +
				`</a></div>`
		};
	} else {
		var form = {
			email: contact.email,
			subject: 'Sent Invitation',
			emailBody:
				'<div><p>Please touch this link to register to Back Office Web App as Producer <p> ' +
				`<a href='` +
				deployProducerEndpoint +
				'/register/' +
				contact.belongTo +
				`/` +
				contact.email +
				`'>` +
				deployProducerEndpoint +
				'/register/' +
				contact.belongTo +
				`/` +
				contact.email +
				`</a></div>`
		};
	}

	const response = await axios.post(firebaseFuncitonSendEmailEndpoint, form);
	console.log(
		'<div><p>Please touch this link to register to Back Office Web App as Agency <p> ' +
			`<a href='` +
			deployOfficerEndpoint +
			'/register/' +
			contact.belongTo +
			`/pdElqKJexpOGk3s31VWMVTbQAgvmBRAyYLtt3KTJhEhRQ8YfMZIa6TU29SURp4NVDvttUuL6t0qjpwMSu2fp4h2LgpTMupdEoP8bGxGeOkMJ3Yg3X51GWHpxvWkdjiMw5PyvWqJQXsaXfeysGSA05l'/></div>`
	);
	const data = await response.data;
	const belongTo = localStorage.getItem('@BELONGTO');
	realDb.ref(`Invitation/${belongTo}/${contact.email.replace('.', '').replace('.', '').replace('.', '')}/`).set({
		email: contact.email,
		data: { displayName: '' },
		id: contact.email.replace('.', '').replace('.', '').replace('.', '')
	});

	dispatch(getUsers());

	return data;
});

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } = productsAdapter.getSelectors(
	state => state.users.users
);

const productsSlice = createSlice({
	name: 'users/users',
	initialState: productsAdapter.getInitialState({
		searchText: '',
		addUserDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		userProfileDialog: {
			type: 'edit',
			props: {
				open: false
			},
			data: null
		}
	}),

	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openUserDialog: (state, action) => {
			state.addUserDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeUserDialog: (state, action) => {
			state.addUserDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openUserProfileDialog: (state, action) => {
			state.userProfileDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeUserProfileDialog: (state, action) => {
			state.userProfileDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getUsers.fulfilled]: productsAdapter.setAll
	}
});

export const {
	setProductsSearchText,
	openUserDialog,
	closeUserDialog,
	openUserProfileDialog,
	closeUserProfileDialog
} = productsSlice.actions;

export default productsSlice.reducer;
