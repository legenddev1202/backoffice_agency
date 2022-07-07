import _ from '@lodash';
import mock from '../mock';
import { db, realDb } from './firebase';

var belongTo = localStorage.getItem('@BELONGTO')
var UID = localStorage.getItem('@UID')

const timeReportAppDB = {
	widgets: [
		{
			id: 'Time_Report_Table',
			title: 'Title',
			table: {
				columns: [],
				rows: [
					{ id: "Time Started", value: "Time Started", color: "", border: '' },
					{ id: "Time Ended", value: "Time Ended", color: "", border: '' },
					{ id: "Lunch", value: "Lunch", color: "", border: '' },
					{ id: "Total Hours Worked", value: "Total Hours Worked", color: "", border: '' },
					{ id: "Vacation", value: "Vacation", color: "", border: '' },
					{ id: "Sick / Bereavement", value: "Sick / Bereavement", color: "", border: '' },
					{ id: "Holiday", value: "Holiday", color: "", border: '' },
				],
				headers: [
					{ value: 'Category', type: false, border: ''},
					{ value: 'Mon', type: false, border: ''},
					{ value: 'Tues', type: false, border: ''},
					{ value: 'Wed', type: false, border: ''},
					{ value: 'Thu', type: false, border: ''},
					{ value: 'Fri', type: false, border: ''},
					{ value: 'Sat', type: false, border: ''},
					{ value: 'Sun', type: false, border: ''},
					{ value: 'Total', type: false, border: ''},					
				],				
				tableContent : {
					"Time Started":{},
					"Time Ended": {},
					"Lunch": {},
					"Total Hours Worked": {},
					"Vacation": {},
					"Sick/Bereavement": {},
					"Holiday": {},
				}
			}
		},	
		{
			id: 'Time_Track_Table',
			title: '',
			table: {
				columns: [],
				headers: [
					{id: "date", value: 'Date', type:false, color:''},
					{id: "in", value: 'In', type:false, color:'', editable: true},
					{id: "out", value: 'Out', type:false, color:'', editable: true},	
					{id: "lunch", value: 'Lunch', type:false, color:'', editable: true},
					{id: "totalHrsWorked", value: 'Total Hrs Worked', type:false, color:'', border: 'border-r-4', editable: false},
					// {id: "regHrs", value: 'Reg. Hrs', type:false, color:''},
					// {id: "proj1Hrs", value: 'Proj 1 Hrs', type:false, color:''},
					// {id: "proj2Hrs", value: 'Proj 2 Hrs', type:false, color:''},
					// {id: "proj3Hrs", value: 'Proj 3 Hrs', type:false, color:''},
					{id: "vacation", value: 'Vacation', type:false, color:'', editable: true},
					{id: "v", value: 'V', type:false, color:'', editable: true},
					{id: "sick", value: 'Sick', type:false, color:'', editable: true},
					{id: "s", value: 'S', type:false, color:'', editable: true},
					{id: "bereavement", value: 'Bereavement', type: false, color: '', editable: true },
					{id: "b", value: 'B', type: false, color: '', editable: true },
					{id: "holiday", value: 'Holiday', type: false, color: '', border: 'border-r-4', editable: true },
					{id: "totalHrs", value: 'Total Hrs', type: false, color: '', border: 'border-r-4', editable: false },
					{id: "notes", value: 'Notes', type: false, color: '', editable: true },
				],
				rows: [],
				tableContent : {}
			}	
		},						
	],
};

mock.onGet('/api/time-report-app/track').reply(() => {
	return [200, timeReportAppDB.tracks];
});

mock.onPost('/api/time-report-app/track/save').reply(request => {
	const data = JSON.parse(request.data); console.log('-----', data)
	let product = data;

	realDb.ref(`TimeReport/${belongTo}/${UID}/${data.month}`).set({
		...data.tracks
	});

	return [200, product];
});

mock.onGet('/api/time-report-app/widgets').reply(config => {
	return [200, timeReportAppDB.widgets];
});
