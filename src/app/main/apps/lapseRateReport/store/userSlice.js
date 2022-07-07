import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';



export const getUsers = createAsyncThunk('lapseRate/users/getProjects', 
// async () => {
// 	const response = await axios.get('/api/lapse-rate/projects');
// 	return response.data;
// }
() =>
		new Promise((resolve, reject) => {
			var belongTo = localStorage.getItem('@BELONGTO')
			var uid = localStorage.getItem('@UID')
			var starCountRef = realDb.ref(`users/`);
			var entries = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						entries.push(data[item]);
					});
					resolve(entries);
				}

				
			});
		})
);



const projectsAdapter = createEntityAdapter({});

export const {
	selectAll: selectUsers,
	selectEntities: selectProjectsEntities,
	selectById: selectProjectById
} = projectsAdapter.getSelectors(state => state.lapseRate.users);

const projectsSlice = createSlice({
	name: 'lapseRate/users',
	initialState: projectsAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getUsers.fulfilled]: projectsAdapter.setAll
	}
});

export default projectsSlice.reducer;
