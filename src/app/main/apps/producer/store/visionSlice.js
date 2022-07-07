import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')

export const getVision = createAsyncThunk(
	'producerApp/vision/getVision', 
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

const visionAdapter = createEntityAdapter({});

export const { selectAll: selectVision, selectById: selectVisionById } = visionAdapter.getSelectors(
	state => state.producerApp.vision
);

const visionSlice = createSlice({
	name: 'producerApp/vision',
	initialState: visionAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getVision.fulfilled]: visionAdapter.setAll
	}
});

export const { } = visionSlice.actions;

export default visionSlice.reducer;
