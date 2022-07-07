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
import Table from '../../components/widgets/Table';
import Chart from '../../components/widgets/BarChart';
import PieChart from '../../components/widgets/PieChart';
import SelectBox from '../../components/CustomSelectBox';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import Header from '../../components/widgets/Header';
import { Options as options } from '../../utils/Globals';

console.log('-----------------------', moment().format('dddd'))
let startOfYear = moment().startOf('year');
let lastOfYear = moment().endOf('year'); 
startOfYear = startOfYear.startOf('isoWeek');
lastOfYear = lastOfYear.endOf('isoWeek');	
let date = startOfYear;
let numberOfDays = lastOfYear.diff(startOfYear, 'days') + 1;

let weekEndingList = {
	id: "Week Ending",
	data: [],
};
let sundays = [];
for(let i = 0; i < numberOfDays; i ++) {
	const day = date.format('YYYY-MM-DD');
	date.add(1, 'days');	
	if((i+1)%14 === 0) {
		sundays.push(day);
		weekEndingList.data.push({ 
			item: day, 
			value: day 
		})
	}

} 

function TimeReport(props) {
	const dispatch = useDispatch();
	let widgets = useSelector(selectWidgets);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	// const [period, setPeriod] = useState(moment().format('MMMM'));
	const [weekEnding, setWeekEnding] = useState("");
	const [title, setTitle] = useState('Time Report');
	
	useEffect(() => {
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {	
		if(widgets.Time_Report_Table) {
			const rows = widgets.Time_Report_Table.table.rows;
			const headers = widgets.Time_Report_Table.table.headers;

			let tableContent = {};
			rows.map((row) => {
				tableContent[row.value] = {};
				headers.map((header, colNum) => {
					if(colNum > 0) {
						tableContent[row.value][header.value] = 0;						
					}
				})
			});
			widgets = {
				...widgets, Time_Report_Table: {
					...widgets.Time_Report_Table, table: {
						...widgets.Time_Report_Table.table, tableContent: 
							tableContent					
					}
				}
			}
		}

		console.log('--------widgets', widgets)
		setData({  widgets });
	}, [ widgets]);

	// function handleChangePeriod(event) { 
	// 	setPeriod(event.target.value);
	// }

	function handleChangeWeekEnding(event) {
		setWeekEnding(event.target.value);
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
								value={weekEnding}
								onChange={ev => handleChangeWeekEnding(ev)}
								label="Week Ending"
								data={weekEndingList.data}
							/>
						</FuseAnimate>
					</div>
					{/* <div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<SelectBox
								value={period}
								onChange={ev => handleChangePeriod(ev)}
								label="Report Period"
								data={options.period.data}
							/>
						</FuseAnimate>
					</div>				 */}
				</Header>
			}
			content={
				<div className="w-full p-12">
					<div className="p-12">
						<Table data={data.widgets.Time_Report_Table} />
					</div>
					<div className="p-12">
						<Table data={data.widgets.Time_Report_Table} />
					</div>
				</div>
				
			}
			innerScroll
		/>
	);
}

export default withReducer('timeReportApp', reducer)(TimeReport);
