import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import reducer from './store';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '../../components/widgets/Table';
import Chart from '../../components/widgets/BarChart';
import PieChart from '../../components/widgets/PieChart';
import SelectBox from '../../components/CustomSelectBox';
import Header from '../../components/widgets/Header';
import { getTracks, selectTracks, saveTrack } from './store/trackSlice';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import { toUntrimed, Options as options } from '../../utils/Globals';
import { swap } from '../../utils/Function';

const tableHeaders = [
    {id: "in", value: 'In', type:false, color:''},
    {id: "out", value: 'Out', type:false, color:''},	
    {id: "lunch", value: 'Lunch', type:false, color:''},
    {id: "totalHrsWorked", value: 'Total Hrs Worked', type:false, color:''},
    // {id: "regHrs", value: 'Reg. Hrs', type:false, color:''},
    // {id: "proj1Hrs", value: 'Proj 1 Hrs', type:false, color:''},
    // {id: "proj2Hrs", value: 'Proj 2 Hrs', type:false, color:''},
    // {id: "proj3Hrs", value: 'Proj 3 Hrs', type:false, color:''},
    {id: "vacation", value: 'Vacation', type:false, color:''},
    {id: "v", value: 'V', type:false, color:''},
    {id: "sick", value: 'Sick', type:false, color:''},
    {id: "s", value: 'S', type:false, color:''},
    {id: "bereavement", value: 'Bereavement', type: false, color: '' },
    {id: "b", value: 'B', type: false, color: '' },
    {id: "holiday", value: 'Holiday', type: false, color: '' },
    {id: "totalHrs", value: 'Total Hrs', type: false, color: '' },
    {id: "notes", value: 'Notes', type: false, color: '' },
];

let tableRows = [];
let tableContent = {};

function TimeTrack(props) {
	const dispatch = useDispatch();
	const tracks = useSelector(selectTracks);
	let widgets = useSelector(selectWidgets);
	const cell = useSelector(({ timeReportApp }) => timeReportApp.tracks.cell);	
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [ot, setOT] = useState("No");
	const [month, setMonth] = useState(moment().format('MMMM'));
	const [main, setMain] = useState({});
	const [title, setTitle] = useState('Time Track');

	function onSave() {	
		const toTrimed = swap(toUntrimed);
		let temp = {}; 
		temp = { ...temp, id: month }
		Object.keys(tableContent).map((row) => {
			Object.keys(tableContent[row]).map((col) => {
				temp = { 
					...temp, [row]: { 
						...temp[row], [toTrimed[col]]: 
							tableContent[row][col] 
					} 
				} 
			});
		});
		dispatch(saveTrack({ tracks: temp, month: month }));
	}

	useEffect(() => {
		dispatch(getTracks(month));
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getTracks(month));		
	}, [month]);

	useEffect(() => { 
		if(widgets.Time_Track_Table && Object.keys(main).length > 0) {						
			widgets = { 
				...widgets, Time_Track_Table: { 
					...widgets.Time_Track_Table, table: {
						...widgets.Time_Track_Table.table, rows: 
							main.tableRows
					}						
				}
			}; 
			widgets = { 
				...widgets, Time_Track_Table: { 
					...widgets.Time_Track_Table, table: {
						...widgets.Time_Track_Table.table, tableContent: 
							main.tableContent
					}						
				}
			};

			console.log('----widgets=', widgets);		
			setData({ widgets });			
		}
		
	}, [widgets, main]);

	useEffect(() => {  
		let startOfMonth = moment().set('month', month).startOf('month');
		let lastOfMonth = moment().set('month', month).endOf('month'); 
		startOfMonth = startOfMonth.startOf('isoWeek');
		lastOfMonth = lastOfMonth.endOf('isoWeek');	
		let date = startOfMonth;
		let numberOfDays = lastOfMonth.diff(startOfMonth, 'days') + 1;

		let tempTableRows = [];
		let tempTableContent = {};
		for(let i = 0; i < numberOfDays; i ++) {
			const day = date.format('YYYY-MM-DD');
			date.add(1, 'days');	

			tempTableRows.push({
				id: day, 
				value: day,
				color: (i+1)%7===0 ? "text-red-500" : "", 
				// border: i%7===0 && i!==0 ? "border-t-4" : "", 
				editable: true
			});
			if((i+1)%7===0) {
				tempTableRows.push({
					id: "Total", 
					value: `Total${(i+1)/7}`,
					color: "", 
					border: "border-t-4 border-b-4",
					editable: false
				});
			}
		} 
	
		if(tracks.length > 0) { 
			const toTrimed = swap(toUntrimed);
			tempTableRows.map((row) => {
				tempTableContent[row.value] = {};
				tableHeaders.map((header) => {									
					tempTableContent[row.value][header.value] = tracks[0][row.value][toTrimed[header.value]];						
				});
			}); 
		} else {
			tempTableRows.map((row) => {
				tempTableContent[row.value] = {};					
				tableHeaders.map((header) => {
					tempTableContent[row.value][header.value] = 0;
				});
			});
		}
		tableRows = [ ...tempTableRows ];
		tableContent = { ...tempTableContent };
	
		console.log('-----track',tempTableRows, tempTableContent);
		setMain({ tableRows, tableContent });			
	}, [tracks]);

	useEffect(() => { 
		const tableName = cell.tableName;
		const rowNum = cell.row;
		const colNum = cell.col;
		const rowKey = cell.rowKey;
		const colKey = cell.colKey;
		const value = parseFloat(cell.value === '' ? 0 : cell.value);
		
		if(tableName === "TRACK") {
			
			tableContent = {				
				...tableContent, [rowKey]: {
					...tableContent[rowKey], [colKey]:
						value
				}
			}

			if(colNum < 3) {
				tableContent = {				
					...tableContent, [rowKey]: {
						...tableContent[rowKey], ['Total Hrs Worked']:
							tableContent[rowKey]['In'] + 
							tableContent[rowKey]['Out'] + 
							tableContent[rowKey]['Lunch']
					}
				}
			}
			if(colNum>3 && colNum<11) {			
				tableContent = {				
					...tableContent, [rowKey]: {
						...tableContent[rowKey], ['Total Hrs']:
							tableContent[rowKey]['Vacation'] +
							tableContent[rowKey]['Sick'] + 
							tableContent[rowKey]['Bereavement'] + 
							tableContent[rowKey]['Holiday']
					}
				}
			}

			const weekNum = (rowNum - rowNum %8 ) / 8;
			let weekTotal = 0;
			let totalHrsWorked = 0;
			let totalHrs = 0;
			for(let i = 0; i < 7; i ++) {
				weekTotal += tableContent[tableRows[weekNum*8+i].value][colKey];
				totalHrsWorked += tableContent[tableRows[weekNum*8+i].value]['Total Hrs Worked'];
				totalHrs += tableContent[tableRows[weekNum*8+i].value]['Total Hrs'];
			}						
			tableContent = {				
				...tableContent, [`Total${weekNum+1}`]: {
					...tableContent[`Total${weekNum+1}`], [colKey]:
					weekTotal
				}
			}
			tableContent = {				
				...tableContent, [`Total${weekNum+1}`]: {
					...tableContent[`Total${weekNum+1}`], ['Total Hrs Worked']:
					totalHrsWorked
				}
			}
			tableContent = {				
				...tableContent, [`Total${weekNum+1}`]: {
					...tableContent[`Total${weekNum+1}`], ['Total Hrs']:
						totalHrsWorked - totalHrs
				}
			}

			
			console.log('-----cell', tableContent)	
			setMain({ tableRows, tableContent });
		}			
	}, [cell]);

	function handleChangeOT(event) { 
		setOT(event.target.value);
	}

	function handleChangeMonth(event) { 
		setMonth(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no data!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<Header title={title}>	
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<SelectBox
								value={ot}
								onChange={ev => handleChangeOT(ev)}
								label="Calculate OT"
								data={options.ot.data}
							/>
						</FuseAnimate>
					</div>				
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<SelectBox
								value={month}
								onChange={ev => handleChangeMonth(ev)}
								label="Month"
								data={options.period.data}
							/>
						</FuseAnimate>
					</div>	
					<FuseAnimate animation="transition.slideRightIn" delay={300}>
						<Button
							component={Link}
							className="whitespace-nowrap normal-case"
							variant="contained"
							color="secondary"
							onClick={onSave}
						>
							<span className="hidden sm:flex">Save</span>
							<span className="flex sm:hidden">New</span>
						</Button>
					</FuseAnimate>
				</Header>
			}
			content={
				<div className="w-full flex flex-col p-12">				
					<div className='p-12'>
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<Table tableName="TRACK" widget={data.widgets.Time_Track_Table} editable />
						</FuseAnimateGroup>
					</div>				
				</div>				
			}
			innerScroll
		/>		
	);
}

export default withReducer('timeReportApp', reducer)(TimeTrack);