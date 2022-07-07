import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { realDb } from '../../../../../@fake-db/db/firebase';

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')

export const getTracks = createAsyncThunk(
	'timeReportApp/track/getTracks', 
	(param) =>
		new Promise((resolve, reject) => {
			var starCountRef = realDb.ref(`TimeReport/${belongTo}/${UID}/${param}`);
			var tracks = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						tracks.push(data[item]);
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

export const saveTrack = createAsyncThunk('timeReportApp/track/saveTrack', async (tracks, { dispatch, getState }) => {
	const response = await axios.post('/api/time-report-app/track/save', tracks); 
	const data = await response.data;

	dispatch(getTracks(tracks.month));
	return data;
});

const trackAdapter = createEntityAdapter({});

export const { selectAll: selectTracks, selectById: selectTrackById } = trackAdapter.getSelectors(
	state => state.timeReportApp.tracks
);

const tractSlice = createSlice({
	name: 'timeReportApp/tracks',
	initialState: trackAdapter.getInitialState({ 
		cell: {},
	}),
	reducers: {	
		setCell: {
			reducer: (state, action) => {
				const tableName = action.payload.tableName;
				const row = action.payload.row;
				const col = action.payload.col;
				const rowKey = action.payload.rowKey;
				const colKey = action.payload.colKey;
				const value = action.payload.value;
				state.cell = { tableName: tableName, row: row, col: col, rowKey: rowKey, colKey: colKey, value: value };
			},
			prepare: val => ({ payload: val || '' })
		},	
	},
	extraReducers: {
		[getTracks.fulfilled]: trackAdapter.setAll
	}
});

export const { setCell } = tractSlice.actions;

export default tractSlice.reducer;
