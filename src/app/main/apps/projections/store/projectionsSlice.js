import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')
console.log()
export const getProjections = createAsyncThunk(
	'projectionsApp/projections/getProjections', 
	(year) =>
		new Promise((resolve, reject) => {		
			var starCountRef = realDb.ref(`Projections/${year}/${belongTo}/`);
			var projections = []; 
			starCountRef.on('value', snapshot => {
				const data = snapshot.val(); 

				// if (data) {
				// 	Object.keys(data).map(item => {
				// 		projections.push(data[item]);
				// 	});
				// } 
				
				if(data) {
					return resolve([data]);
				} else {
					resolve([]);
				}
			});
		})
);

export const saveProjections = createAsyncThunk('projectionsApp/projections/saveProjections', async (projections, { dispatch, getState }) => {
	const response = await axios.post('/api/projections-app/projections/save', projections); 
	const data = await response.data;

	dispatch(getProjections(data.year));
	return data;
});

const projectionsAdapter = createEntityAdapter({});

export const { selectAll: selectProjections, selectById: selectProjectionsById } = projectionsAdapter.getSelectors(
	state => state.projectionsApp.projections
);

const projectionsSlice = createSlice({
	name: 'projectionsApp/projections',
	initialState: projectionsAdapter.getInitialState({ 
		projections: {},	
	}),
	reducers: {		
	},
	extraReducers: {
		[getProjections.fulfilled]: projectionsAdapter.setAll
	}
});

export const {} = projectionsSlice.actions;

export default projectionsSlice.reducer;
