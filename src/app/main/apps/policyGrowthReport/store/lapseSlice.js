import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { realDb } from '../../../../../@fake-db/db/firebase';
import axios from 'axios';

export const getProjects = createAsyncThunk(
	'policyGrowthReport/projects/getProjects',
	async () =>
		new Promise((resolve, reject) => {
			var belongTo = localStorage.getItem('@BELONGTO');
			var uid = localStorage.getItem('@UID');
			var year = new Date().getFullYear();
			var starCountRef = realDb.ref(`PolicyGrowthReport/${year}/${belongTo}/policyCount`);
			var entries = [];
			starCountRef.on('value', snapshot => {
				const data = snapshot.val();

				if (data) {
					Object.keys(data).map(item => {
						entries.push(data);
					});
					resolve(entries);
				} else {
					resolve(entries);
				}
			});
		})
);

export const saveProduct = createAsyncThunk(
	'policyGrowthReport/projects/saveProduct',
	async (product, { dispatch, getState }) => {
		var belongTo = localStorage.getItem('@BELONGTO');
		var uid = localStorage.getItem('@UID');
		var year = new Date().getFullYear();
		console.log(product);
		var { temp, numberRows, percentRows, perHouseHoldRows } = product;
		realDb
			.ref(`PolicyGrowthReport/${year}/${belongTo}/`)
			.set({
				policyCount: temp,
				numberChange: numberRows,
				percentChange: percentRows,
				policiesPerHousehold: perHouseHoldRows
			});
		dispatch(getProjects());
		return product;
	}
);

const projectsAdapter = createEntityAdapter({});

export const {
	selectAll: selectProjects,
	selectEntities: selectProjectsEntities,
	selectById: selectProjectById
} = projectsAdapter.getSelectors(state => state.policyGrowthReport.projects);

const projectsSlice = createSlice({
	name: 'policyGrowthReport/projects',
	initialState: projectsAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getProjects.fulfilled]: projectsAdapter.setAll
	}
});

export default projectsSlice.reducer;
