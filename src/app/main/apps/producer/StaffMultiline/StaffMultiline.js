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
import HorizontalBarChart from '../../../components/widgets/HorizontalBarChart';
import PieChart from '../../../components/widgets/PieChart';
import SelectBox from '../../../components/CustomSelectBox';
import Header from '../../../components/widgets/Header';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { getBonusPlans, selectBonusPlans } from '../store/bonusPlansSlice';
import { getMarketings, selectMarketings } from '../store/marketingsSlice';
import { getEntries, selectEntries } from '../store/entriesSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { colors, policies, Options as options } from '../../../utils/Globals';
import { dividing, getMain } from '../../../utils/Function';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const belongTo = localStorage.getItem('@BELONGTO')
const UID = localStorage.getItem('@UID')

function StaffMultiline(props) {
	const dispatch = useDispatch();	
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const marketings = useSelector(selectMarketings);
	const bonusPlans = useSelector(selectBonusPlans);
	const entries = useSelector(selectEntries);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [main, setMain] = useState({});
	//const [year, setYear] = useState(moment().format('yyyy'));
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [production, setProduction] = useState("Show Written Production");
	const [report, setReport] = useState("Policies");
	const [tabValue, setTabValue] = useState(0);
	const [title, setTitle] = useState('Penetration Report');
	const [date, setDate] = useState(moment());

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getBonusPlans());
		dispatch(getMarketings());
		dispatch(getEntries(moment(date).format('yyyy')));		
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch, date]);

	useEffect(() => {		
		if(users.length>0 && Object.keys(marketings).length>0 && entries.length>0) {	
			const temp = getMain(entries, bonusPlans, marketings, users, [], []);										
			setMain(temp);
		}else {setMain({})}
	}, [entries, bonusPlans, marketings, users]);

	useEffect(() => {
		if(!_.isEmpty(widgets) && !_.isEmpty(main)) {
			//	Producer_StaffMultiline_Summary_Table
			if(widgets.Producer_StaffMultiline_Summary_Table) {
				let tableRows = [];
				let tableContent = {};			
				
				users.map((user) => {
					if(user.belongTo === UID) {
						tableRows.push({ 
							id: user.id, 
							value: user.id, 
							type: true, 
							color: '' 
						});
						
						let totalPolicies = 0;
						let totalAnnualPremium = 0;
						let totalAveragePremium = 0;
						let totalAutoBonus = 0;
						tableContent[user.data.displayName] = {};
						policies.map((policy) => {							
							tableContent[user.data.displayName][`${policy.value}@Policies`] = main[production][period][user.id][policy.value]["Policies"];						
							tableContent[user.data.displayName][`${policy.value}@Annual Premium`] = main[production][period][user.id][policy.value]["Premium"];
							tableContent[user.data.displayName][`${policy.value}@Average Premium`] = main[production][period][user.id][policy.value]["Averages"];
							tableContent[user.data.displayName][`${policy.value}@Auto Bonus`] = main[production][period][user.id][policy.value]["Bonuses"];
							if(policy.value==='Auto' || policy.value==='Fire')
								tableContent[user.data.displayName][`${policy.value}@Multiline Percentage`] = dividing(
									main[production][period][user.id][policy.value]["household"] * 100,
									main[production][period][user.id][policy.value]["household"] + main[production][period][user.id][policy.value]["individual"]
								);
							totalPolicies += tableContent[user.data.displayName][`${policy.value}@Policies`];
							totalAnnualPremium += tableContent[user.data.displayName][`${policy.value}@Annual Premium`];
							totalAveragePremium += tableContent[user.data.displayName][`${policy.value}@Average Premium`];
							totalAutoBonus += tableContent[user.data.displayName][`${policy.value}@Auto Bonus`];
						});
						tableContent[user.data.displayName]['Total@Policies'] = totalPolicies;
						tableContent[user.data.displayName]['Total@Annual Premium'] = totalAnnualPremium;
						tableContent[user.data.displayName]['Total@Average Premium'] = totalAveragePremium;
						tableContent[user.data.displayName]['Total@Auto Bonus'] = totalAutoBonus;
						tableContent[user.data.displayName]["Multiline Ratio"] = dividing(
							(
								tableContent[user.data.displayName]['Life@Policies'] +
								tableContent[user.data.displayName]['Health@Policies']
								// tableContent[user.data.displayName]['Bank@Policies']
							) * 100,
							tableContent[user.data.displayName]['Auto@Policies'] +
							tableContent[user.data.displayName]['Fire@Policies']
						);
					}				
				});
				widgets = {
					...widgets, Producer_StaffMultiline_Summary_Table: {
						...widgets.Producer_StaffMultiline_Summary_Table, table: {
							...widgets.Producer_StaffMultiline_Summary_Table.table, rows:
								tableRows
						}
					}
				};
				widgets = {
					...widgets, Producer_StaffMultiline_Summary_Table: {
						...widgets.Producer_StaffMultiline_Summary_Table, table: {
							...widgets.Producer_StaffMultiline_Summary_Table.table, tableContent:
								tableContent
						}
					}
				};			
			}

			// StaffMultiline_Summary_Policies_Chart
			if(widgets.StaffMultiline_Summary_Policies_Chart) {		
				let tempDatasets = [];
				widgets.StaffMultiline_Summary_Policies_Chart.mainChart.TW.datasets.map((dataset) => {
					let tempDataset = dataset;
					let tempData = [];
					users.map((user) => {
						if(user.belongTo === UID) {
							tempData.push(main[production][period][user.id][dataset.label][report]);
						}							
					});

					tempDataset = {...tempDataset, data: tempData}
					tempDatasets.push(tempDataset);
				});
				widgets = {
					...widgets, StaffMultiline_Summary_Policies_Chart: 
						{...widgets.StaffMultiline_Summary_Policies_Chart, mainChart: {
							...widgets.StaffMultiline_Summary_Policies_Chart.mainChart, TW: {
								...widgets.StaffMultiline_Summary_Policies_Chart.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};

				let tempXAxes = [];
				let tempLabels = [];
				let temp = widgets.StaffMultiline_Summary_Policies_Chart.mainChart.options.scales.xAxes[0];
				users.map((user) => {
					if(user.belongTo === UID) 
						tempLabels.push(user.data.displayName);
				}); 
				temp = { ...temp, labels: tempLabels };
				tempXAxes.push(temp);			

				widgets = {
					...widgets, StaffMultiline_Summary_Policies_Chart: {
						...widgets.StaffMultiline_Summary_Policies_Chart, mainChart: {
							...widgets.StaffMultiline_Summary_Policies_Chart.mainChart, options: {
								...widgets.StaffMultiline_Summary_Policies_Chart.mainChart.options, scales: {
									...widgets.StaffMultiline_Summary_Policies_Chart.mainChart.options.scales, xAxes: [
										...tempXAxes
									]
								} 
							}	
						}
					}
				};
			} 	

			// StaffMultiline_Summary_Producer_Chart
			if(widgets.StaffMultiline_Summary_Producer_Chart) {	
				let tempDatasets = [];	
				let sumPolicies = { Auto: 0, Fire: 0, Life: 0, Health: 0, Bank: 0 };
				users.map((user) => {
					if(user.belongTo === UID) {
						widgets.StaffMultiline_Summary_Producer_Chart.mainChart.options.scales.yAxes[0].labels.map((policy) => {						
								sumPolicies[policy] += main[production][period][user.id][policy][report]											
						});					
					}
				});
				users.map((user, n) => {
					if(user.belongTo === UID) {
						let tempData = [];
						widgets.StaffMultiline_Summary_Producer_Chart.mainChart.options.scales.yAxes[0].labels.map((policy) => {						
								tempData.push(main[production][period][user.id][policy][report] * 100 / sumPolicies[policy]);												
						});
						tempDatasets.push({
							barPercentage: 0.5,
							label: user.data.displayName,
							data: [ ...tempData ],
							backgroundColor: colors[n].backgroundColor,
							hoverBackgroundColor: colors[n].hoverBackgroundColor,
							categoryPercentage: 1,
						});
					}
				});
				widgets = {
					...widgets, StaffMultiline_Summary_Producer_Chart: 
						{...widgets.StaffMultiline_Summary_Producer_Chart, mainChart: {
							...widgets.StaffMultiline_Summary_Producer_Chart.mainChart, TW: {
								...widgets.StaffMultiline_Summary_Producer_Chart.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};
			} 		

			// Producer_StaffMultiline_Ratios_Chart_1
			if(widgets.Producer_StaffMultiline_Ratios_Chart_1) {		
				let tempDatasets = [];			
				widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart.TW.datasets.map((dataset) => {
					if(dataset.label==="Life" || dataset.label==="Health" || dataset.label==="Bank") {
						let tempDataset = dataset;
						let tempData = [];
						users.map((user) => {
							if(user.belongTo === UID) {							
								tempData.push(dividing(
										main[production][period][user.id][dataset.label]['Policies'],
										(
											main[production][period][user.id]['Auto']['Policies'] +
											main[production][period][user.id]['Fire']['Policies']
										)
									)
								);
							}						
						});

						tempDataset = {...tempDataset, data: tempData}
						tempDatasets.push(tempDataset);
					}
				});
				widgets = {
					...widgets, Producer_StaffMultiline_Ratios_Chart_1: 
						{...widgets.Producer_StaffMultiline_Ratios_Chart_1, mainChart: {
							...widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart, TW: {
								...widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};

				let tempXAxes = [];
				let tempLabels = [];
				let temp = widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart.options.scales.xAxes[0];
				users.map((user) => {
					if(user.belongTo === UID) 
						tempLabels.push(user.data.displayName);
				}); 
				temp = { ...temp, labels: tempLabels };
				tempXAxes.push(temp);			
				widgets = {
					...widgets, Producer_StaffMultiline_Ratios_Chart_1: {
						...widgets.Producer_StaffMultiline_Ratios_Chart_1, mainChart: {
							...widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart, options: {
								...widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart.options, scales: {
									...widgets.Producer_StaffMultiline_Ratios_Chart_1.mainChart.options.scales, xAxes: [
										...tempXAxes
									]
								} 
							}	
						}
					}
				};
			} 

			// Producer_StaffMultiline_Ratios_Chart_2
			if(widgets.Producer_StaffMultiline_Ratios_Chart_2) {		
				let tempDatasets = [];			
				widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart.TW.datasets.map((dataset) => {
					let tempDataset = dataset;
					let tempData = [];
					users.map((user) => {
						if(user.belongTo === UID) {													
							tempData.push(dividing(
									main[production][period][user.id][dataset.label]['Policies'] * 100,
									(
										main[production][period][user.id]['Auto']['Policies'] +
										main[production][period][user.id]['Fire']['Policies'] +
										main[production][period][user.id]['Life']['Policies'] +
										main[production][period][user.id]['Health']['Policies'] +
										main[production][period][user.id]['Bank']['Policies']
									)
								)
							);
						}							
					});

					tempDataset = {...tempDataset, data: tempData}
					tempDatasets.push(tempDataset);
				});
				widgets = {
					...widgets, Producer_StaffMultiline_Ratios_Chart_2: 
						{...widgets.Producer_StaffMultiline_Ratios_Chart_2, mainChart: {
							...widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart, TW: {
								...widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};

				let tempXAxes = [];
				let tempLabels = [];
				let temp = widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart.options.scales.xAxes[0];
				users.map((user) => {
					if(user.belongTo === UID) 
						tempLabels.push(user.data.displayName);
				}); 
				temp = { ...temp, labels: tempLabels };
				tempXAxes.push(temp);			
				widgets = {
					...widgets, Producer_StaffMultiline_Ratios_Chart_2: {
						...widgets.Producer_StaffMultiline_Ratios_Chart_2, mainChart: {
							...widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart, options: {
								...widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart.options, scales: {
									...widgets.Producer_StaffMultiline_Ratios_Chart_2.mainChart.options.scales, xAxes: [
										...tempXAxes
									]
								} 
							}	
						}
					}
				};
			} 

			//	Producer_StaffMultiline_Ratio_Table
			if(widgets.Producer_StaffMultiline_Ratio_Table) {
				let tableRows = [];
				let tableContent = {};			
				
				users.map((user) => {
					if(user.belongTo === UID) {
						tableRows.push({ 
							id: user.id, 
							value: user.data.displayName, 
							type: true, 
							color: '' 
						});
						
						tableContent[user.data.displayName] = {};
						// by Auto									
						tableContent[user.data.displayName][`Auto@Fire`] = dividing(
							main[production][period][user.id]['Fire']["Policies"],
							main[production][period][user.id]['Auto']["Policies"]
						);	
						tableContent[user.data.displayName][`Auto@Life`] = dividing(
							main[production][period][user.id]['Life']["Policies"],
							main[production][period][user.id]['Auto']["Policies"]
						);	
						tableContent[user.data.displayName][`Auto@Health`] = dividing(
							main[production][period][user.id]['Health']["Policies"],
							main[production][period][user.id]['Auto']["Policies"]
						);	
						tableContent[user.data.displayName][`Auto@Bank`] = dividing(
							main[production][period][user.id]['Bank']["Policies"],
							main[production][period][user.id]['Auto']["Policies"]
						);
						
						// by Fire
						tableContent[user.data.displayName][`Fire@Auto`] = dividing(
							main[production][period][user.id]['Auto']["Policies"],
							main[production][period][user.id]['Fire']["Policies"]
						);	
						tableContent[user.data.displayName][`Fire@Life`] = dividing(
							main[production][period][user.id]['Life']["Policies"],
							main[production][period][user.id]['Fire']["Policies"]
						);	
						tableContent[user.data.displayName][`Fire@Health`] = dividing(
							main[production][period][user.id]['Health']["Policies"],
							main[production][period][user.id]['Fire']["Policies"]
						);	
						tableContent[user.data.displayName][`Fire@Bank`] = dividing(
							main[production][period][user.id]['Bank']["Policies"],
							main[production][period][user.id]['Fire']["Policies"]
						);

						// by Life
						tableContent[user.data.displayName][`Life@Auto`] = dividing(
							main[production][period][user.id]['Auto']["Policies"],
							main[production][period][user.id]['Life']["Policies"]
						);	
						tableContent[user.data.displayName][`Life@Fire`] = dividing(
							main[production][period][user.id]['Fire']["Policies"],
							main[production][period][user.id]['Life']["Policies"]
						);	
						tableContent[user.data.displayName][`Life@Health`] = dividing(
							main[production][period][user.id]['Health']["Policies"],
							main[production][period][user.id]['Life']["Policies"]
						);	
						tableContent[user.data.displayName][`Life@Bank`] = dividing(
							main[production][period][user.id]['Bank']["Policies"],
							main[production][period][user.id]['Life']["Policies"]
						);

						// by Health
						tableContent[user.data.displayName][`Health@Auto`] = dividing(
							main[production][period][user.id]['Auto']["Policies"],
							main[production][period][user.id]['Health']["Policies"]
						);	
						tableContent[user.data.displayName][`Health@Fire`] = dividing(
							main[production][period][user.id]['Fire']["Policies"],
							main[production][period][user.id]['Health']["Policies"]
						);	
						tableContent[user.data.displayName][`Health@Life`] = dividing(
							main[production][period][user.id]['Life']["Policies"],
							main[production][period][user.id]['Health']["Policies"]
						);	
						tableContent[user.data.displayName][`Health@Bank`] = dividing(
							main[production][period][user.id]['Bank']["Policies"],
							main[production][period][user.id]['Health']["Policies"]
						);

						// by Bank
						tableContent[user.data.displayName][`Bank@Auto`] = dividing(
							main[production][period][user.id]['Auto']["Policies"],
							main[production][period][user.id]['Bank']["Policies"]
						);	
						tableContent[user.data.displayName][`Bank@Fire`] = dividing(
							main[production][period][user.id]['Fire']["Policies"],
							main[production][period][user.id]['Bank']["Policies"]
						);	
						tableContent[user.data.displayName][`Bank@Life`] = dividing(
							main[production][period][user.id]['Life']["Policies"],
							main[production][period][user.id]['Bank']["Policies"]
						);	
						tableContent[user.data.displayName][`Bank@Health`] = dividing(
							main[production][period][user.id]['Health']["Policies"],
							main[production][period][user.id]['Bank']["Policies"]
						);

						// by Auto&Fire					
						tableContent[user.data.displayName][`Auto&Fire@Life`] = dividing(
							main[production][period][user.id]['Life']["Policies"],
							(
								main[production][period][user.id]['Auto']["Policies"] +
								main[production][period][user.id]['Fire']["Policies"]
							)
						);	
						tableContent[user.data.displayName][`Auto&Fire@Health`] = dividing(
							main[production][period][user.id]['Health']["Policies"],
							(
								main[production][period][user.id]['Auto']["Policies"] +
								main[production][period][user.id]['Fire']["Policies"]
							)
						);	
						tableContent[user.data.displayName][`Auto&Fire@Bank`] = dividing(
							main[production][period][user.id]['Bank']["Policies"],
							(
								main[production][period][user.id]['Auto']["Policies"] +
								main[production][period][user.id]['Fire']["Policies"]
							)
						);
						tableContent[user.data.displayName][`Total L/H/B`] = 
							main[production][period][user.id]['Life']["Policies"] +						
							main[production][period][user.id]['Health']["Policies"] +
							main[production][period][user.id]['Bank']["Policies"];

							policies.slice(0, 5).map((policy) => {
							tableContent[user.data.displayName][policy.value] = dividing(
								main[production][period][user.id][policy.value]['Policies'] * 100,
								(
									main[production][period][user.id]['Auto']['Policies'] +
									main[production][period][user.id]['Fire']['Policies'] +
									main[production][period][user.id]['Life']['Policies'] +
									main[production][period][user.id]['Health']['Policies'] +
									main[production][period][user.id]['Bank']['Policies']
								)
							)							
						})
						
					}
					
				});
				widgets = {
					...widgets, Producer_StaffMultiline_Ratio_Table: {
						...widgets.Producer_StaffMultiline_Ratio_Table, table: {
							...widgets.Producer_StaffMultiline_Ratio_Table.table, rows:
								tableRows
						}
					}
				};
				widgets = {
					...widgets, Producer_StaffMultiline_Ratio_Table: {
						...widgets.Producer_StaffMultiline_Ratio_Table, table: {
							...widgets.Producer_StaffMultiline_Ratio_Table.table, tableContent:
								tableContent
						}
					}
				};			
			}
		}
		
		console.log('-------------widgets', widgets)
		setData({ widgets });
	}, [widgets, main, period, production, report]);

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

	function handleChangeReport(event) {
		setReport(event.target.value);
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
					{tabValue === 0 &&
						<div className="flex flex-1 items-center justify-center px-12">
							<FuseAnimate animation="transition.slideUpIn" delay={300}>
								<SelectBox
								value={report}
								onChange={ev => handleChangeReport(ev)}
								label="Report"
								data={options.report.data}
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
					<Tab className="h-64 normal-case" label="SUMMARY" />
					<Tab className="h-64 normal-case" label="RATIOS" />									
				</Tabs>
			}
			content={
				<div className="w-full p-12">					
					{tabValue === 0 && 
						<div>
							<div className='p-12'>
								<Table data={data.widgets.Producer_StaffMultiline_Summary_Table} />
							</div>	
							<div className='p-12'>
								<Chart data={data.widgets.StaffMultiline_Summary_Policies_Chart} />
							</div>
							<div className='p-12'>
								<HorizontalBarChart data={data.widgets.StaffMultiline_Summary_Producer_Chart} />								
							</div>							
						</div>
					}				
					{tabValue === 1 &&  
						<div>
							<div className='p-12'>
								<Chart data={data.widgets.Producer_StaffMultiline_Ratios_Chart_1} />
							</div>
							<div className='p-12'>
								<Chart data={data.widgets.Producer_StaffMultiline_Ratios_Chart_2} />
							</div>	
							<div className='p-12'>
								<Table data={data.widgets.Producer_StaffMultiline_Ratio_Table} />
							</div>	
						</div>
					}													
				</div> 
			}
			innerScroll
		/>
	);
}

export default withReducer('producerApp', reducer)(StaffMultiline);
