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
import { policies, months, Options as options } from '../../../utils/Globals';
import { ceil, dividing, getMain } from '../../../utils/Function';

const belongTo = localStorage.getItem('@BELONGTO');
const UID = localStorage.getItem('@UID');

function Multiline(props) {
	const dispatch = useDispatch();
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const marketings = useSelector(selectMarketings);
	const bonusPlans = useSelector(selectBonusPlans);
	const entries = useSelector(selectEntries);
	const vision = useSelector(selectVision);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({ widgets });
	const [main, setMain] = useState({});
	const [year, setYear] = useState(moment().format('yyyy'));
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [production, setProduction] = useState("Show Written Production");
	const [product, setProduct] = useState("Auto");
	const [tabValue, setTabValue] = useState(0);
	const [title, setTitle] = useState('Penetration Summary');
	
	useEffect(() => {
		dispatch(getUsers());
		dispatch(getBonusPlans());
		dispatch(getMarketings());
		dispatch(getEntries(year));	
		dispatch(getVision(year));	
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {				
		if(users.length>0 && Object.keys(marketings).length>0 && entries.length>0) {	
			const temp = getMain(entries, bonusPlans, marketings, users, vision, []);										
			setMain(temp);
		}
	}, [entries, bonusPlans, marketings, users, vision]);

	useEffect(() => {	
		if(!_.isEmpty(widgets) && !_.isEmpty(main)) {
			if(widgets.Agency_Multiline_AgencyGoalsAndProduction_Table) {	
				let tableContent = { 
					'Total': { 'Sales Goal': 0, 'Actual Sales': 0, 'Total Premium / Dollars': 0, 'Average Premium / Dollars': 0 }, 
				};	
				policies.map(policy => {
					if(policy.value !== 'Total') {
						tableContent[policy.value] = { 'Sales Goal': 0, 'Actual Sales': 0, 'Total Premium / Dollars': 0, 'Average Premium / Dollars': 0 };
						users.map(user => {
							if(user.belongTo === UID) {
								tableContent[policy.value]['Sales Goal'] += main[production][period][user.id][policy.value]['Goals'];	
								tableContent[policy.value]['Actual Sales'] += main[production][period][user.id][policy.value]['Policies'];										
								tableContent[policy.value]['Total Premium / Dollars'] += main[production][period][user.id][policy.value]['Premium'];										
								tableContent[policy.value]['Average Premium / Dollars'] += main[production][period][user.id][policy.value]['Averages'];	
								console.log(period, user.data.displayName, policy.value, main[production][period][user.id][policy.value]['Averages'])
								tableContent['Total']['Sales Goal'] += main[production][period][user.id][policy.value]['Goals'];	
								tableContent['Total']['Actual Sales'] += main[production][period][user.id][policy.value]['Policies'];										
								tableContent['Total']['Total Premium / Dollars'] += main[production][period][user.id][policy.value]['Premium'];										
								tableContent['Total']['Average Premium / Dollars'] += main[production][period][user.id][policy.value]['Averages'];	
							}			
						});
					}
				});																
				widgets = {
					...widgets, Agency_Multiline_AgencyGoalsAndProduction_Table: {
						...widgets.Agency_Multiline_AgencyGoalsAndProduction_Table, table: {
							...widgets.Agency_Multiline_AgencyGoalsAndProduction_Table.table, tableContent: 
								tableContent							
						}
					}
				}
			}

			if(widgets.Agency_Multiline_Chart) {	
				let tempDatasets = [];
				let tempData1 = [];
				let tempData2 = [];
				let temp1 = widgets.Agency_Multiline_Chart.mainChart.TW.datasets[0];	
				let temp2 = widgets.Agency_Multiline_Chart.mainChart.TW.datasets[1];
				const tableContent = widgets.Agency_Multiline_AgencyGoalsAndProduction_Table.table.tableContent;
				const labels = widgets.Agency_Multiline_Chart.mainChart.options.scales.xAxes[0].labels;					
				labels.map(label => {				
					tempData1.push(tableContent[label]['Sales Goal']);
					tempData2.push(tableContent[label]['Actual Sales']);
				});
				temp1 = { ...temp1, data: tempData1 };
				temp2 = { ...temp2, data: tempData2 };
				tempDatasets.push(temp1);				
				tempDatasets.push(temp2);

				widgets = {
					...widgets, Agency_Multiline_Chart: {
						...widgets.Agency_Multiline_Chart, mainChart: {
							...widgets.Agency_Multiline_Chart.mainChart, TW: {
								...widgets.Agency_Multiline_Chart.mainChart.TW, datasets: [
									...tempDatasets
								] 
							}
						}
					}
				};
			}	

			if(widgets.Agency_Multiline_PieChart) {	
				let tempDatasets = [];
				let tempData = [];
				const tableContent = widgets.Agency_Multiline_AgencyGoalsAndProduction_Table.table.tableContent;
				const labels = widgets.Agency_Multiline_PieChart.mainChart.labels;					
				labels.map(label => {				
					tempData.push(tableContent[label]['Total Premium / Dollars']);
				});
				let temp = widgets.Agency_Multiline_PieChart.mainChart.datasets[0];
				temp = { ...temp, data: tempData };
				tempDatasets.push(temp);				

				widgets = {
					...widgets, Agency_Multiline_PieChart: {
						...widgets.Agency_Multiline_PieChart, mainChart: {
							...widgets.Agency_Multiline_PieChart.mainChart, datasets: [
								...tempDatasets
							]
						}
					}
				};
			}
			
			if(widgets.Agency_Multiline_Production_Table) {	
				let tableContent = { 
					'Total': {}
				};
				let tableHeaders = [];	
				Object.keys(marketings).map(key => {					
					const marketing = marketings[key];
					tableContent.Total[marketing.marketingName] = 0;
					tableHeaders.push({
						id: marketing.marketingName,
						value: marketing.marketingName
					});
				})
				policies.map(policy => {
					if(policy.value !== 'Total') {	
						tableContent[policy.value] = {};	
						Object.keys(marketings).map(key => {							
							const marketing = marketings[key];
							tableContent[policy.value][marketing.marketingName] = 0;
							users.map(user => {
								if(user.belongTo === UID) {
									tableContent[policy.value][marketing.marketingName] += main[production][period][user.id][policy.value][marketing.marketingName];										
									tableContent['Total'][marketing.marketingName] += main[production][period][user.id][policy.value][marketing.marketingName];										
								}			
							});
						});						
					}
				});		
				widgets = {
					...widgets, Agency_Multiline_Production_Table: {
						...widgets.Agency_Multiline_Production_Table, table: {
							...widgets.Agency_Multiline_Production_Table.table, headers: 
								tableHeaders							
						}
					}
				};														
				widgets = {
					...widgets, Agency_Multiline_Production_Table: {
						...widgets.Agency_Multiline_Production_Table, table: {
							...widgets.Agency_Multiline_Production_Table.table, tableContent: 
								tableContent							
						}
					}
				}
			}
		} 

		console.log('------------widgets', widgets)
		setData({ widgets });
	}, [widgets, main, production, period]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}
	
	function handleChangePeriod(event) { 
		setPeriod(event.target.value);
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
								value={period}
								onChange={ev => handleChangePeriod(ev)}
								label="Report Period"
								data={options.period.data}
							/>
						</FuseAnimate>
					</div>
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
				</Header>
			}
			// contentToolbar={
			// 	<Tabs
			// 		value={tabValue}
			// 		onChange={handleChangeTab}
			// 		indicatorColor="primary"
			// 		textColor="primary"
			// 		variant="scrollable"
			// 		scrollButtons="auto"
			// 		classes={{ root: 'w-full h-64' }}
			// 	>
			// 		<Tab className="h-64 normal-case" label="View Written Report" />
			// 		<Tab className="h-64 normal-case" label="View Issued Report" />									
			// 	</Tabs>
			// }
			content={
				<div className="w-full p-12">
					<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-1/3 p-12">
							<Table data={data.widgets.Agency_Multiline_AgencyGoalsAndProduction_Table} />
						</div>
						<div className="widget flex w-1/3 p-12">
							<Chart data={data.widgets.Agency_Multiline_Chart} />
						</div>
						<div className="widget flex w-1/3 p-12">
						<PieChart data={data.widgets.Agency_Multiline_PieChart} />
						</div>						
					</FuseAnimateGroup>
					<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex w-full p-12">
							<Table data={data.widgets.Agency_Multiline_Production_Table} />
						</div>					
					</FuseAnimateGroup>						
				</div>
				
			}
			innerScroll
		/>
	);
}

export default withReducer('agencyApp', reducer)(Multiline);
