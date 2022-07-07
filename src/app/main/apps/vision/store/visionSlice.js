import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')
console.log()
export const getVision = createAsyncThunk(
	'visionApp/vision/getVision', 
	(year) =>
		new Promise((resolve, reject) => {		
			var starCountRef = realDb.ref(`Vision/${year}/${belongTo}/`);
			var vision = []; 
			starCountRef.on('value', snapshot => {
				const data = snapshot.val(); 

				// if (data) {
				// 	Object.keys(data).map(item => {
				// 		vision.push(data[item]);
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

export const saveVision = createAsyncThunk('visionApp/vision/saveVision', async (vision, { dispatch, getState }) => {
	const response = await axios.post('/api/vision-app/vision/save', vision); 
	const data = await response.data;

	dispatch(getVision(data.year));
	return data;
});

const visionAdapter = createEntityAdapter({});

export const { selectAll: selectVision, selectById: selectVisionById } = visionAdapter.getSelectors(
	state => state.visionApp.vision
);

const visionSlice = createSlice({
	name: 'visionApp/vision',
	initialState: visionAdapter.getInitialState({ 
		vision: {},	
	}),
	reducers: {		
	},
	extraReducers: {
		[getVision.fulfilled]: visionAdapter.setAll
	}
});

export const {} = visionSlice.actions;

export default visionSlice.reducer;
