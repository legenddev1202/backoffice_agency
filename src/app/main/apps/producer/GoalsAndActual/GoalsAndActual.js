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
import reducer from '../store';
import Table from '../../../components/widgets/Table';
import Chart from '../../../components/widgets/BarChart';
import PieChart from '../../../components/widgets/PieChart';
import SelectBox from '../../../components/CustomSelectBox';
import Header from '../../../components/widgets/Header';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { getEntries, selectEntries } from '../store/entriesSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { getVision, selectVision } from '../store/visionSlice';
import { policies, Options as options } from '../../../utils/Globals';
import { getMain } from '../../../utils/Function';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const belongTo = localStorage.getItem('@BELONGTO')
const UID = localStorage.getItem('@UID')

function GoalsAndActual(props) {
	const dispatch = useDispatch();
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const entries = useSelector(selectEntries);
	const vision = useSelector(selectVision);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [main, setMain] = useState({});
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [production, setProduction] = useState("Show Written Production");
	const [title, setTitle] = useState('Goals & Production Report');
	const [date, setDate] = useState(moment());
	
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getEntries(moment(date).format('yyyy')));	
		dispatch(getVision(moment(date).format('yyyy')));	
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch, date]);

	useEffect(() => {				
		if(users.length>0 && entries.length>0) {	
			const temp = getMain(entries, [], [], users, vision, []);										
			setMain(temp);
		} else {setMain({})}
	}, [entries, users, vision]);
	
	useEffect(() => {	
		if(!_.isEmpty(widgets) && !_.isEmpty(main)) {
			// Producer_GoalsAndActual_AgencyGoals_Table
			if(widgets.Producer_GoalsAndActual_AgencyGoals_Table) {
				let tableRows = [
					{
						id: 'total', 
						value: 'Total', 
						type: true, 
						color: '', 
						border: 'border-b-4' 
					}
				];
				let tableContent = {};			
				tableContent["Total"] = {
					'Auto@Goals': 0,
					'Auto@Actual': 0,
					'Fire@Goals': 0,
					'Fire@Actual': 0,
					'Life@Goals': 0,
					'Life@Actual': 0,
					'Health@Goals': 0,
					'Health@Actual': 0,
					'Bank@Goals': 0,
					'Bank@Actual': 0,
					'Total@Goals': 0,
					'Total@Actual': 0,
				};
				users.map((user) => { 	
					if(user.belongTo === UID) {
						tableRows.push({ 
							id: user.id, 
							value: user.id, 
							type: true, 
							color: '' 
						});
						
						let totalGoals = 0;
						let totalActual = 0;	

						tableContent[user.data.displayName] = {};
						policies.slice(0, 5).map((policy) => { // except for Total
							tableContent[user.data.displayName][`${policy.value}@Goals`] = main[production][period][user.id][policy.value]["Goals"]
							tableContent[user.data.displayName][`${policy.value}@Actual`] = main[production][period][user.id][policy.value]["Policies"]
							totalGoals += tableContent[user.data.displayName][`${policy.value}@Goals`];
							totalActual += tableContent[user.data.displayName][`${policy.value}@Actual`];	
							if(user.id !== UID) {
								tableContent['Total'][`${policy.value}@Goals`] += tableContent[user.data.displayName][`${policy.value}@Goals`]
								tableContent['Total'][`${policy.value}@Actual`] += tableContent[user.data.displayName][`${policy.value}@Actual`]
							}																		
						});
						tableContent[user.data.displayName]['Total@Goals'] = totalGoals;
						tableContent[user.data.displayName]['Total@Actual'] = totalActual;	
						if(user.id !== UID) {
							tableContent['Total'][`Total@Goals`] += totalGoals;
							tableContent['Total'][`Total@Actual`] += totalActual;
						}																				
					}				
				});
				widgets = {
					...widgets, Producer_GoalsAndActual_AgencyGoals_Table: {
						...widgets.Producer_GoalsAndActual_AgencyGoals_Table, table: {
							...widgets.Producer_GoalsAndActual_AgencyGoals_Table.table, rows:
								tableRows
						}
					}
				};
				widgets = {
					...widgets, Producer_GoalsAndActual_AgencyGoals_Table: {
						...widgets.Producer_GoalsAndActual_AgencyGoals_Table, table: {
							...widgets.Producer_GoalsAndActual_AgencyGoals_Table.table, tableContent:
								tableContent
						}
					}
				};			
			}

			// Producer_GoalsAndActual_SalesGoals_Chart
			if(widgets.Producer_GoalsAndActual_SalesGoals_Chart) {	
				let tempDatasets = [];
				Object.keys(widgets.Producer_GoalsAndActual_SalesGoals_Chart.mainChart.TW.datasets).map((key, n) => {
					let temp = widgets.Producer_GoalsAndActual_SalesGoals_Chart.mainChart.TW.datasets[key];
					let tempData = [];
					const tableContent = widgets.Producer_GoalsAndActual_AgencyGoals_Table.table.tableContent;
					if(n === 0)
						widgets.Producer_GoalsAndActual_SalesGoals_Chart.mainChart.options.scales.xAxes[0].labels.map((policy) => {
							tempData.push(tableContent['Total'][`${policy}@Goals`]);
						})
					else if(n === 1)
						widgets.Producer_GoalsAndActual_SalesGoals_Chart.mainChart.options.scales.xAxes[0].labels.map((policy) => {
							tempData.push(tableContent['Total'][`${policy}@Actual`]);
						})

					temp = {...temp, data: tempData}
					tempDatasets.push(temp);
				}); 
				widgets = {
					...widgets, Producer_GoalsAndActual_SalesGoals_Chart: 
						{...widgets.Producer_GoalsAndActual_SalesGoals_Chart, mainChart: {
							...widgets.Producer_GoalsAndActual_SalesGoals_Chart.mainChart, TW: {
								...widgets.Producer_GoalsAndActual_SalesGoals_Chart.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};
			} 

			// Producer_GoalsAndActual_OtherActivities_Table
			if(widgets.Producer_GoalsAndActual_OtherActivities_Table) {
				let tableRows = [
					{
						id: 'total', 
						value: 'Total', 
						type: true, 
						color: '', 
						border: 'border-b-4' 
					}
				];
				let tableContent = {};			
				tableContent["Total"] = {
					'Multiline Review Appt. Kept@Goals': 0,
					'Multiline Review Appt. Kept@Actual': 0,
					'IFR@Goals': 0,
					'IFR@Actual': 0,
					'IFR Completed@Goals': 0,
					'IFR Completed@Actual': 0,
					'Auto Policies Bought In@Goals': 0,
					'Auto Policies Bought In@Actual': 0,
					'Fire Policies Bought In@Goals': 0,
					'Fire Policies Bought In@Actual': 0,
					'Life Policies Bought In@Goals': 0,
					'Life Policies Bought In@Actual': 0,
					'Health Policies Bought In@Goals': 0,
					'Health Policies Bought In@Actual': 0,
					'Bank Policies Bought In@Goals': 0,
					'Bank Policies Bought In@Actual': 0,
					'Total@Goals': 0,
					'Total@Actual': 0,
				};
				// users.map((user) => {
				// 	if(user.belongTo === UID) {
				// 		tableRows.push({ 
				// 			id: user.id, 
				// 			value: user.id, 
				// 			type: true, 
				// 			color: '' 
				// 		});
						
				// 		let totalGoals = 0;
				// 		let totalActual = 0;					
				// 		tableContent[user.data.displayName] = {};
				// 		policies.slice(0, 5).map((policy) => { // except for Total
				// 			tableContent[user.data.displayName][`${policy.value}@Goals`] = main[production][period][user.id][policy.value]["Goals"]
				// 			tableContent[user.data.displayName][`${policy.value}@Actual`] = main[production][period][user.id][policy.value]["Policies"]
				// 			totalGoals += tableContent[user.data.displayName][`${policy.value}@Goals`];
				// 			totalActual += tableContent[user.data.displayName][`${policy.value}@Actual`];	
				// 			if(user.id !== UID) {
				// 				tableContent['Total'][`${policy.value}@Goals`] += tableContent[user.data.displayName][`${policy.value}@Goals`]
				// 				tableContent['Total'][`${policy.value}@Actual`] += tableContent[user.data.displayName][`${policy.value}@Actual`]
				// 			}																			
				// 		});
				// 		tableContent[user.data.displayName]['Total@Goals'] = totalGoals;
				// 		tableContent[user.data.displayName]['Total@Actual'] = totalActual;	
				// 		if(user.id !== UID) {
				// 			tableContent['Total'][`Total@Goals`] += totalGoals;
				// 			tableContent['Total'][`Total@Actual`] += totalActual;
				// 		}															
				// 	}				
				// });
				widgets = {
					...widgets, Producer_GoalsAndActual_OtherActivities_Table: {
						...widgets.Producer_GoalsAndActual_OtherActivities_Table, table: {
							...widgets.Producer_GoalsAndActual_OtherActivities_Table.table, rows:
								tableRows
						}
					}
				};
				widgets = {
					...widgets, Producer_GoalsAndActual_OtherActivities_Table: {
						...widgets.Producer_GoalsAndActual_OtherActivities_Table, table: {
							...widgets.Producer_GoalsAndActual_OtherActivities_Table.table, tableContent:
								tableContent
						}
					}
				};			
			}

			// Producer_GoalsAndActual_ActivityGoals_Chart
			if(widgets.Producer_GoalsAndActual_ActivityGoals_Chart) {	
				let tempDatasets = [];
				Object.keys(widgets.Producer_GoalsAndActual_ActivityGoals_Chart.mainChart.TW.datasets).map((key, n) => {
					let temp = widgets.Producer_GoalsAndActual_ActivityGoals_Chart.mainChart.TW.datasets[key];
					let tempData = [];
					const tableContent = widgets.Producer_GoalsAndActual_OtherActivities_Table.table.tableContent;
					if(n === 0)
						widgets.Producer_GoalsAndActual_ActivityGoals_Chart.mainChart.options.scales.xAxes[0].labels.map((policy) => {
							tempData.push(tableContent['Total'][`${policy}@Goals`]);
						})
					else if(n === 1)
						widgets.Producer_GoalsAndActual_ActivityGoals_Chart.mainChart.options.scales.xAxes[0].labels.map((policy) => {
							tempData.push(tableContent['Total'][`${policy}@Actual`]);
						})

					temp = {...temp, data: tempData}
					tempDatasets.push(temp);
				}); 
				widgets = {
					...widgets, Producer_GoalsAndActual_ActivityGoals_Chart: 
						{...widgets.Producer_GoalsAndActual_ActivityGoals_Chart, mainChart: {
							...widgets.Producer_GoalsAndActual_ActivityGoals_Chart.mainChart, TW: {
								...widgets.Producer_GoalsAndActual_ActivityGoals_Chart.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};
			} 
		}

	//	console.log('-----widgets', widgets)
		setData({ widgets });
	}, [widgets, main, period, production]);

	function handleChangePeriod(event) {
		setPeriod(event.target.value);
	}
	function handleChangeYear(date) {
		setDate(date);
	}
	function handleChangeProduction(event) {
		setProduction(event.target.value);
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
								value={production}
								onChange={ev => handleChangeProduction(ev)}
								label="Production"
								data={options.production.data}
							/>
						</FuseAnimate>
					</div>
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant="inline"
									format="yyyy"
									margin="normal"
									id="date-picker-inline"
									label="Year"
									value={date}
									onChange={handleChangeYear}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
									views={['year']}
								/>
							</MuiPickersUtilsProvider>
						</FuseAnimate>
					</div>
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<SelectBox
								value={period}
								onChange={ev => handleChangePeriod(ev)}
								label="Report Period"
								data={options.period.data}
							/>
						</FuseAnimate>
					</div>
				</Header>
			}
			content={
				<div className="w-full p-12">
					<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-full p-12">
							<Table data={data.widgets.Producer_GoalsAndActual_AgencyGoals_Table} />
						</div>
						<div className="widget flex w-full p-12">
							<Table data={data.widgets.Producer_GoalsAndActual_OtherActivities_Table} />
						</div>						
					</FuseAnimateGroup>
					<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-1/2 p-12">
							<Chart data={data.widgets.Producer_GoalsAndActual_SalesGoals_Chart} />
						</div>
						<div className="widget flex w-1/2 p-12">
							<Chart data={data.widgets.Producer_GoalsAndActual_ActivityGoals_Chart} />
						</div>						
					</FuseAnimateGroup>
				</div>				
			}
			innerScroll
		/>
	);
}

export default withReducer('producerApp', reducer)(GoalsAndActual);
