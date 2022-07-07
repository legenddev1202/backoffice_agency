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
import { getBonusPlans, selectBonusPlans } from '../store/bonusPlansSlice';
import { getMarketings, selectMarketings } from '../store/marketingsSlice';
import { getEntries, selectEntries } from '../store/entriesSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { getVision, selectVision } from '../store/visionSlice';
import { colors, policies, months, Options as options } from '../../../utils/Globals';
import { dividing, getMain } from '../../../utils/Function';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const belongTo = localStorage.getItem('@BELONGTO');
const UID = localStorage.getItem('@UID');

function StaffSources(props) {
	const dispatch = useDispatch();
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const marketings = useSelector(selectMarketings);
	const entries = useSelector(selectEntries);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [main, setMain] = useState({});
	//const [year, setYear] = useState(moment().format('yyyy'));
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [production, setProduction] = useState("Show Written Production");
	const [user, setUser] = useState(UID);
	const [userList, setUserList] = useState([]);
	const [tabValue, setTabValue] = useState(0);
	const [title, setTitle] = useState('Marketing Source Report');
	const [date, setDate] = useState(moment());

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getMarketings());
		dispatch(getEntries(moment(date).format('yyyy')));	
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch, date]);

	useEffect(() => { 
		var temp = [];
		if (users.length > 0) {
			users.map(user => {
				if(user.belongTo === UID)
					temp.push({ item: user.data.displayName, value: user.id });
			});
			setUserList(temp); 
		}
	}, [users]);
	
	useEffect(() => {		
		if(Object.keys(marketings).length>0 && users.length>0 && entries.length>0) {
			const temp = getMain(entries, [], marketings, users, [], []);										
			setMain(temp);
		}else {setMain({})}	
	}, [entries, marketings, users]);

	useEffect(() => {
		if(!_.isEmpty(widgets) && !_.isEmpty(main)) {
			// Producer_StaffSources_Auto_Table
			if(widgets.Producer_StaffSources_Auto_Table) {
				policies.map(policy => {			
					let tableRows = [{ 
						id: 'total',
						value: 'Total',
						color: '',
						border: 'border-b-4'
					}];
					let tableHeaders = [{
						id: 'producer',
						value: 'Producer',
						color: '',
						border: ''
					}];
					let tableContent = {};
	
					Object.keys(marketings).map((key) => {		
						const item = marketings[key];
						tableHeaders.push({
							id: item.marketingName,
							value: item.marketingName,
							color: '' 
						});
					});	
					tableHeaders.push({
						id: 'total',
						value: 'Total',
						color: '' 
					});
	
					tableContent["Total"] = {};
					users.map((user) => {
						if(user.belongTo === UID) {
							tableRows.push({ 
								id: user.id, 
								value: user.id, 
								type: true, 
								color: '' 
							});
							
							let total = 0;
							tableContent[user.data.displayName] = {};
							Object.keys(marketings).map((key) => {		
								const marketing = marketings[key];
								tableContent[user.data.displayName][marketing.marketingName] = 
									main[production][period][user.id][policy.value][marketing.marketingName];												
								total += tableContent[user.data.displayName][marketing.marketingName];
								if(!tableContent['Total'].hasOwnProperty(marketing.marketingName)) {
									tableContent['Total'][marketing.marketingName] = 0;
								}
								tableContent['Total'][marketing.marketingName] += tableContent[user.data.displayName][marketing.marketingName]
							});
							tableContent[user.data.displayName]['Total'] = total;
	
							if(!tableContent['Total'].hasOwnProperty('Total')) {
								tableContent['Total']['Total'] = 0;
							}
							tableContent['Total']['Total'] += total;
						}				
					});			
	
					widgets = {
						...widgets, [`Producer_StaffSources_${policy.value}_Table`]: {
							...widgets[`Producer_StaffSources_${policy.value}_Table`], title: 
								`${policy.value} Policies`
						}
					}
					widgets = {
						...widgets, [`Producer_StaffSources_${policy.value}_Table`]: {
							...widgets[`Producer_StaffSources_${policy.value}_Table`], table: {
								...widgets[`Producer_StaffSources_${policy.value}_Table`].table, headers: 
									tableHeaders							
							}
						}
					}
					widgets = {
						...widgets, [`Producer_StaffSources_${policy.value}_Table`]: {
							...widgets[`Producer_StaffSources_${policy.value}_Table`], table: {
								...widgets[`Producer_StaffSources_${policy.value}_Table`].table, rows: 
									tableRows							
							}
						}
					}
					widgets = {
						...widgets, [`Producer_StaffSources_${policy.value}_Table`]: {
							...widgets[`Producer_StaffSources_${policy.value}_Table`], table: {
								...widgets[`Producer_StaffSources_${policy.value}_Table`].table, tableContent: 
									tableContent							
							}
						}
					}
				});	

				// Total Table
				let tableContent = {}
				Object.keys(widgets.Producer_StaffSources_Total_Table.table.tableContent).map(row => {
					tableContent[row] = {};
					Object.keys(widgets.Producer_StaffSources_Total_Table.table.tableContent[row]).map(col => {
						tableContent[row][col] = 0;
						policies.slice(0, 5).map(policy => {
							tableContent[row][col] += widgets[`Producer_StaffSources_${policy.value}_Table`].table.tableContent[row][col];
						})
					});
				});
				widgets = {
					...widgets, Producer_StaffSources_Total_Table: {
						...widgets.Producer_StaffSources_Total_Table, table: {
							...widgets.Producer_StaffSources_Total_Table.table, tableContent: 
							tableContent							
						}
					}
				}	
			}								
		
			// Producer_StaffSources_SourcesOfBusiness_Chart
			if(widgets.Producer_StaffSources_SourcesOfBusiness_Chart) {
				let tempDatasets = [];
				Object.keys(widgets.Producer_StaffSources_Total_Table.table.tableContent).map((row, n) => {
					if(row !== 'Total') {
						let tempData = [];
						Object.keys(widgets.Producer_StaffSources_Total_Table.table.tableContent[row]).map(col => {
							if(col !== 'Total') {
								tempData.push(widgets[`Producer_StaffSources_Total_Table`].table.tableContent[row][col]);
							}
						});
						tempDatasets.push({
							type: 'bar',
							barPercentage: 0.5,
							label: row,
							data: [ ...tempData ],
							backgroundColor: colors[n].backgroundColor,
							hoverBackgroundColor: colors[n].hoverBackgroundColor,
							categoryPercentage: 1,
						});
					}
				});			
				widgets = {
					...widgets, Producer_StaffSources_SourcesOfBusiness_Chart: 
						{...widgets.Producer_StaffSources_SourcesOfBusiness_Chart, mainChart: {
							...widgets.Producer_StaffSources_SourcesOfBusiness_Chart.mainChart, TW: {
								...widgets.Producer_StaffSources_SourcesOfBusiness_Chart.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};

				let tempXAxes = [];
				let tempLabels = [];
				let temp = widgets.Producer_StaffSources_SourcesOfBusiness_Chart.mainChart.options.scales.xAxes[0];
				Object.keys(marketings).map((key) => { 
					const marketing = marketings[key];
					tempLabels.push(marketing.marketingName);
				}); 
				temp = { ...temp, labels: tempLabels };
				tempXAxes.push(temp);			

				widgets = {
					...widgets, Producer_StaffSources_SourcesOfBusiness_Chart: {
						...widgets.Producer_StaffSources_SourcesOfBusiness_Chart, mainChart: {
							...widgets.Producer_StaffSources_SourcesOfBusiness_Chart.mainChart, options: {
								...widgets.Producer_StaffSources_SourcesOfBusiness_Chart.mainChart.options, scales: {
									...widgets.Producer_StaffSources_SourcesOfBusiness_Chart.mainChart.options.scales, xAxes: [
										...tempXAxes
									]
								} 
							}	
						}
					}
				};
			}

			// Producer_StaffSources_ViewGrid_Table
			if(widgets.Producer_StaffSources_ViewGrid_Table && user!=='') {
				let tableContent = { 'Total': {} };
				let tableRows = [{
					id: 'total', 
					value: 'Total', 
					type: true,
					color: '', 
					border: 'border-b-4' 
				}];

				tableContent['Total']['Total'] = 0;
				Object.keys(marketings).map((key) => {		
					const marketing = marketings[key];
					tableRows.push({
						id: marketing.marketingName,
						value: marketing.marketingName,
						color: '' 
					});

					tableContent[marketing.marketingName] = {};
					tableContent[marketing.marketingName]['Total'] = 0;
					policies.slice(0, 5).map(policy => {
						tableContent[marketing.marketingName][policy.value] = 0;						
						months.map(month => {					
							tableContent[marketing.marketingName][policy.value] += main[production][month.value][user][policy.value][marketing.marketingName];							
						});
						if(!tableContent['Total'].hasOwnProperty(policy.value)) {
							tableContent['Total'][policy.value] = 0;
						}
						tableContent['Total'][policy.value] += tableContent[marketing.marketingName][policy.value];
						tableContent[marketing.marketingName]['Total'] += tableContent[marketing.marketingName][policy.value];
					});
					tableContent['Total']['Total'] += tableContent[marketing.marketingName]['Total'];
				});	
				
				widgets = {
					...widgets, Producer_StaffSources_ViewGrid_Table: {
						...widgets.Producer_StaffSources_ViewGrid_Table, table: {
							...widgets.Producer_StaffSources_ViewGrid_Table.table, rows:
								tableRows
						}
					}
				};
				widgets = {
					...widgets, Producer_StaffSources_ViewGrid_Table: {
						...widgets.Producer_StaffSources_ViewGrid_Table, table: {
							...widgets.Producer_StaffSources_ViewGrid_Table.table, tableContent:
								tableContent
						}
					}
				};
			}	

			// Producer_StaffSources_ProductSales_PieChart
			if(widgets.Producer_StaffSources_ProductSales_PieChart && user!=='') {		
				let tempDatasets = [];
				let tempLabels = [];
				let tempData = [];
				let tempBackgroundColor = [];
				let tempHoverBackgroundColor = [];
				const tableContent = widgets.Producer_StaffSources_ViewGrid_Table.table.tableContent;

				Object.keys(marketings).map((key, n) => {
					const marketing = marketings[key];	

					const value = dividing(
						tableContent[marketing.marketingName]['Total'] *100, tableContent['Total']['Total']
					);
					if(value > 0) {
						tempLabels.push(marketing.marketingName);
						tempData.push(value);
						tempBackgroundColor.push(colors[n%4].backgroundColor);
						tempHoverBackgroundColor.push(colors[n%4].hoverBackgroundColor);
					}					
					
				});
				tempDatasets.push({
					data: [ ...tempData ],
					backgroundColor: [ ...tempBackgroundColor ],
					hoverBackgroundColor: [ ...tempHoverBackgroundColor ]
				});
				
				widgets = {
					...widgets, Producer_StaffSources_ProductSales_PieChart: 
						{...widgets.Producer_StaffSources_ProductSales_PieChart, mainChart: {
							...widgets.Producer_StaffSources_ProductSales_PieChart.mainChart, labels: [
								...tempLabels
							] 
						}
					}
				};
				widgets = {
					...widgets, Producer_StaffSources_ProductSales_PieChart: 
						{...widgets.Producer_StaffSources_ProductSales_PieChart, mainChart: {
							...widgets.Producer_StaffSources_ProductSales_PieChart.mainChart, datasets: [
								...tempDatasets
							] 
						}
					}
				};
			}
			
			// Producer_StaffSources_Production_PieChart
			if(widgets.Producer_StaffSources_Production_PieChart && user!=='') {		
				let tempDatasets = [];
				let tempLabels = [];
				let tempData = [];
				let tempBackgroundColor = [];
				let tempHoverBackgroundColor = [];
				const tableContent = widgets.Producer_StaffSources_ViewGrid_Table.table.tableContent;

				policies.slice(0, 5).map((policy, n) => {					
					const value = dividing(
						tableContent['Total'][policy.value] *100, tableContent['Total']['Total']
					);
					if(value > 0) {
						tempLabels.push(policy.value);
						tempData.push(value);
						tempBackgroundColor.push(colors[n%4].backgroundColor);
						tempHoverBackgroundColor.push(colors[n%4].hoverBackgroundColor);
					}					
					
				});
				tempDatasets.push({
					data: [ ...tempData ],
					backgroundColor: [ ...tempBackgroundColor ],
					hoverBackgroundColor: [ ...tempHoverBackgroundColor ]
				});
				
				widgets = {
					...widgets, Producer_StaffSources_Production_PieChart: 
						{...widgets.Producer_StaffSources_Production_PieChart, mainChart: {
							...widgets.Producer_StaffSources_Production_PieChart.mainChart, labels: [
								...tempLabels
							] 
						}
					}
				};
				widgets = {
					...widgets, Producer_StaffSources_Production_PieChart: 
						{...widgets.Producer_StaffSources_Production_PieChart, mainChart: {
							...widgets.Producer_StaffSources_Production_PieChart.mainChart, datasets: [
								...tempDatasets
							] 
						}
					}
				};
			} 
		} 	
	
		console.log('---------widgets', widgets);	
		setData({ widgets });
						
	}, [widgets, main, period, production, user]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	function handleChangeYear(date) {
		setDate(date);
	}
	function handleChangePeriod(event) { 
		setPeriod(event.target.value);
	}

	function handleChangeProduction(event) {
		setProduction(event.target.value);
	}

	function handleChangeUser(event) {
		setUser(event.target.value);
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
					{tabValue === 0 &&
						<div className="flex flex-1 items-center justify-center px-12 w-40">
							<FuseAnimate animation="transition.slideUpIn" delay={300}>
								<SelectBox
									value={period}
									onChange={ev => handleChangePeriod(ev)}
									label="Report Period"
									data={options.period.data}
								/>
							</FuseAnimate>
						</div>	
					}	
					{tabValue===1 &&
						<div className="flex flex-1 items-center justify-center px-12 w-40">
							<FuseAnimate animation="transition.slideUpIn" delay={300}>
								<SelectBox
									value={user}
									onChange={ev => handleChangeUser(ev)}
									label="Users"
									data={userList}
								/>
							</FuseAnimate>
						</div>	
					}				
				</Header>
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="VIEW THE CHART" />
					<Tab className="h-64 normal-case" label="VIEW THE GRID" />									
				</Tabs>
			}
			content={
				<div className="w-full p-12">
					{tabValue === 0 &&
						<div>
							<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
								<div className="widget flex w-full p-12">
									<Chart data={data.widgets.Producer_StaffSources_SourcesOfBusiness_Chart} />
								</div>						
							</FuseAnimateGroup>
							<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
								<div className="widget flex w-full p-12">
									<Table data={data.widgets.Producer_StaffSources_Auto_Table} />
								</div>	
								<div className="widget flex w-full p-12">
									<Table data={data.widgets.Producer_StaffSources_Fire_Table} />
								</div>	
								<div className="widget flex w-full p-12">
									<Table data={data.widgets.Producer_StaffSources_Life_Table} />
								</div>
								<div className="widget flex w-full p-12">
									<Table data={data.widgets.Producer_StaffSources_Health_Table} />
								</div>
								<div className="widget flex w-full p-12">
									<Table data={data.widgets.Producer_StaffSources_Bank_Table} />
								</div>
								<div className="widget flex w-full p-12">
									<Table data={data.widgets.Producer_StaffSources_Total_Table} />
								</div>					
							</FuseAnimateGroup>
						</div>
					}	
					{tabValue === 1 &&  
						<div>
							<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
								<div className="widget flex w-2/4 p-12">
									<PieChart data={data.widgets.Producer_StaffSources_ProductSales_PieChart} />
								</div>	
								<div className="widget flex w-2/4 p-12">
									<PieChart data={data.widgets.Producer_StaffSources_Production_PieChart} />
								</div>				
							</FuseAnimateGroup>	
							<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>	
								<div className='widget flex w-full p-12'>
									<Table data={data.widgets.Producer_StaffSources_ViewGrid_Table} />
								</div>	
							</FuseAnimateGroup>	
						</div>
					}				
				</div>
				
			}
			innerScroll
		/>
	);
}

export default withReducer('producerApp', reducer)(StaffSources);
