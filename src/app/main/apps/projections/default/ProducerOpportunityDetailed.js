import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import reducer from '../store';
import Table from '../../../components/widgets/Table';
import Header from '../../../components/widgets/Header';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { getBonusPlanTemplates, selectBonusPlanTemplates } from '../store/bonusPlanTemplatesSlice';
import { getProjections, selectProjections } from '../store/projectionsSlice';
import { policies, projectionsRows, toUntrimed } from '../../../utils/Globals';
import { ceil } from '../../../utils/Function';

const UID = localStorage.getItem('@UID');

let avgsTableContent = {};

function Component() {
	const dispatch = useDispatch();
	let widgets = useSelector(selectWidgets);
	const projections = useSelector(selectProjections);
	const bonusPlanTemplates = useSelector(selectBonusPlanTemplates);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [main, setMain] = useState({});
	const [user, setUser] = useState(UID);
	const [year, setYear] = useState(moment().format('yyyy'));
	const [title, setTitle] = useState('Producer Opportunity(Detailed)');
	const [state, setState] = useState({
		teamBonuses: '',
		baseSalary: '',
		bonusPlan: ''
	});

	useEffect(() => {
		dispatch(getBonusPlanTemplates());
		dispatch(getProjections(year));
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (projections.length > 0) {
			projectionsRows.map(row => {
				avgsTableContent[row.value] = {};
				policies.map(policy => {
					avgsTableContent[row.value][policy.value] = 0;
				});
				delete avgsTableContent[row.value]['Total'];
			});
			if (projections.length > 0 && user != '') {
				if (projections[0].hasOwnProperty(user)) {
					const projectionsData = projections[0][user];

					// averages
					Object.keys(projectionsData['Averages']).map(key => {
						if (key !== 'id')
							Object.keys(projectionsData['Averages'][key]).map(valKey => {
								avgsTableContent[toUntrimed[key]][valKey] = parseFloat(
									projectionsData['Averages'][key][valKey]
								);
							});
					});

					setState({
						...state,
						...projectionsData
					});
				}
			}

			setMain({ avgsTableContent: avgsTableContent });
		}
	}, [projections]);

	useEffect(() => {
		widgets = {
			...widgets,
			data: [
				{
					proTable: widgets['Projections_Default_Producer_Opportunity_Detaild_Production_Table'],
					incTable: widgets['Projections_Default_Producer_Opportunity_Summary_Income_Table']
				},
				{
					proTable: widgets['Projections_Default_Producer_Opportunity_Detaild_Production_Table'],
					incTable: widgets['Projections_Default_Producer_Opportunity_Summary_Income_Table']
				},
				{
					proTable: widgets['Projections_Default_Producer_Opportunity_Detaild_Production_Table'],
					incTable: widgets['Projections_Default_Producer_Opportunity_Summary_Income_Table']
				},
				{
					proTable: widgets['Projections_Default_Producer_Opportunity_Detaild_Production_Table'],
					incTable: widgets['Projections_Default_Producer_Opportunity_Summary_Income_Table']
				},
				{
					proTable: widgets['Projections_Default_Producer_Opportunity_Detaild_Production_Table'],
					incTable: widgets['Projections_Default_Producer_Opportunity_Summary_Income_Table']
				}
			]
		};

		if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
			if (widgets.Projections_Table) {
				widgets = {
					...widgets,
					Projections_Table: {
						...widgets.Projections_Table,
						table: {
							...widgets.Projections_Table.table,
							tableContent: main.avgsTableContent
						}
					}
				};
			}
			if (widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table) {
				const bonusPlan = bonusPlanTemplates[0][state.bonusPlan];

				let indAutoBonus = Object.values(bonusPlan['individualAutoTargetBonus']);
				let indFireBonus = Object.values(bonusPlan['individualFireTargetBonus']);
				let indLifeBonus = Object.values(bonusPlan['individualLifeTargetBonus']);
				let indHealthBonus = Object.values(bonusPlan['individualHealthTargetBonus']);
				let indBankBonus = Object.values(bonusPlan['individualBankTargetBonus']);
				indAutoBonus = _.sortBy(indAutoBonus, 'level');
				indFireBonus = _.sortBy(indFireBonus, 'level');
				indLifeBonus = _.sortBy(indLifeBonus, 'level');
				indHealthBonus = _.sortBy(indHealthBonus, 'level');
				indBankBonus = _.sortBy(indBankBonus, 'level');

				let teamAutoBonus = Object.values(bonusPlan['teamAutoTargetBonus']);
				let teamFireBonus = Object.values(bonusPlan['teamFireTargetBonus']);
				let teamLifeBonus = Object.values(bonusPlan['teamLifeTargetBonus']);
				let teamHealthBonus = Object.values(bonusPlan['teamHealthTargetBonus']);
				let teamBankBonus = Object.values(bonusPlan['teamBankTargetBonus']);
				teamAutoBonus = _.sortBy(teamAutoBonus, 'level');
				teamFireBonus = _.sortBy(teamFireBonus, 'level');
				teamLifeBonus = _.sortBy(teamLifeBonus, 'level');
				teamHealthBonus = _.sortBy(teamHealthBonus, 'level');
				teamBankBonus = _.sortBy(teamBankBonus, 'level');

				let lapseAutoBonus = bonusPlan['monthlyAgencyLapseAutoBonus'];
				let lapseFireBonus = bonusPlan['monthlyAgencyLapseFireBonus'];
				lapseAutoBonus = _.sortBy(lapseAutoBonus, 'level');
				lapseFireBonus = _.sortBy(lapseFireBonus, 'level');

				const indBonuses = {
					Auto: indAutoBonus,
					Fire: indFireBonus,
					Life: indLifeBonus,
					Health: indHealthBonus,
					Bank: indBankBonus
				};

				const teamBonuses = {
					Auto: teamAutoBonus,
					Fire: teamFireBonus,
					Life: teamLifeBonus,
					Health: teamHealthBonus,
					Bank: teamBankBonus
				};

				console.log(bonusPlan);
				const avgPremium = 'ANNUAL Premium Average per Policy';
				const avgBonus = 'Average Initial PRODUCER Bonus per Policy';
				let proTableContent = {};
				let incTableContent = {};

				let tableData = [];
				[0, 1, 2, 3, 4].map(number => {
					const level = number;

					proTableContent = {};
					incTableContent = {};

					proTableContent['Per Month'] = { Total: 0 };
					proTableContent['Premium Per Month'] = { Total: 0 };
					proTableContent['Per Year'] = { Total: 0 };
					proTableContent['Premium Per Year'] = { Total: 0 };

					incTableContent['Individual Item Bonuses'] = { Salary: 0, Total: 0 };
					incTableContent['Individual Target Bonuses'] = { Salary: 0, Total: 0 };
					incTableContent['Team Target Bonus Project'] = { Salary: 0, Total: 0 };
					incTableContent['Monthly Totals'] = { Salary: state.baseSalary / 12, Total: state.baseSalary / 12 };
					incTableContent['Annual Totals'] = { Salary: state.baseSalary, Total: 0 };

					policies.map((item, index) => {
						const policy = item.value;

						if (policy !== 'Total') {
							const indBonus = indBonuses[policy][level];
							const teamBonus = teamBonuses[policy][level];

							// production
							proTableContent['Per Month'][policy] = indBonus['policies'];
							proTableContent['Per Year'][policy] = indBonus['policies'] * 12;
							proTableContent['Premium Per Month'][policy] =
								indBonus['policies'] * avgsTableContent[avgPremium][policy];
							proTableContent['Premium Per Year'][policy] =
								indBonus['policies'] * avgsTableContent[avgPremium][policy] * 12;

							// production total
							if (policy !== 'Bank') {
								proTableContent['Per Month']['Total'] += ceil(proTableContent['Per Month'][policy]);
								proTableContent['Per Year']['Total'] += ceil(proTableContent['Per Year'][policy]);
								proTableContent['Premium Per Month']['Total'] += ceil(
									proTableContent['Premium Per Month'][policy]
								);
								proTableContent['Premium Per Year']['Total'] += ceil(
									proTableContent['Premium Per Year'][policy]
								);
							}

							// income
							incTableContent['Individual Item Bonuses'][policy] =
								policy === 'Auto'
									? (proTableContent['Premium Per Month'][policy] *
											avgsTableContent[avgBonus][policy]) /
									  200
									: (proTableContent['Premium Per Month'][policy] *
											avgsTableContent[avgBonus][policy]) /
									  100;
							incTableContent['Individual Target Bonuses'][policy] =
								((indBonuses['Auto'][level]['policies'] * avgsTableContent[avgPremium]['Auto'] * 0.5 +
									indBonuses['Fire'][level]['policies'] * avgsTableContent[avgPremium]['Fire']) *
									indBonus['amount']) /
								100;
							incTableContent['Team Target Bonus Project'][policy] = teamBonus['amount'];
							incTableContent['Monthly Totals'][policy] =
								ceil(incTableContent['Individual Item Bonuses'][policy]) +
								ceil(incTableContent['Individual Target Bonuses'][policy]) +
								ceil(incTableContent['Team Target Bonus Project'][policy]);
							incTableContent['Annual Totals'][policy] = incTableContent['Monthly Totals'][policy] * 12;

							// income total					
							incTableContent['Individual Item Bonuses']['Total'] += ceil(
								incTableContent['Individual Item Bonuses'][policy]
							);
							incTableContent['Individual Target Bonuses']['Total'] += ceil(
								incTableContent['Individual Target Bonuses'][policy]
							);
							incTableContent['Team Target Bonus Project']['Total'] += ceil(
								incTableContent['Team Target Bonus Project'][policy]
							);
							incTableContent['Monthly Totals']['Total'] += ceil(
								incTableContent['Monthly Totals'][policy]
							);
							incTableContent['Annual Totals']['Total'] = ceil(
								incTableContent['Team Target Bonus Project'][policy]
							);
						}
					});

					// income lapse%
					incTableContent['Individual Item Bonuses']['Lapse%'] = 0;
					incTableContent['Individual Target Bonuses']['Lapse%'] = 0;
					incTableContent['Team Target Bonus Project']['Lapse%'] = 0;
					incTableContent['Monthly Totals']['Lapse%'] =
						ceil(lapseAutoBonus[level]['dollar']) + ceil(lapseFireBonus[level]['dollar']);
					incTableContent['Team Target Bonus Project']['Lapse%'] =
						ceil(lapseAutoBonus[level]['dollar']) + ceil(lapseFireBonus[level]['dollar']);
					incTableContent['Annual Totals']['Lapse%'] =
						incTableContent['Team Target Bonus Project']['Lapse%'] * 12;

					// income total
					incTableContent['Individual Item Bonuses']['Total'] += ceil(
						incTableContent['Individual Item Bonuses']['Lapse%']
					);
					incTableContent['Individual Target Bonuses']['Total'] += ceil(
						incTableContent['Individual Target Bonuses']['Lapse%']
					);
					incTableContent['Team Target Bonus Project']['Total'] += ceil(
						incTableContent['Team Target Bonus Project']['Lapse%']
					);
					incTableContent['Monthly Totals']['Total'] += ceil(incTableContent['Monthly Totals']['Lapse%']);
					incTableContent['Annual Totals']['Total'] += ceil(incTableContent['Monthly Totals']['Total'] * 12);

					widgets = {
						...widgets,
						Projections_Default_Producer_Opportunity_Detaild_Production_Table: {
							...widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table,
							table: {
								...widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table.table,
								columns: [
									{
										...widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table
											.table.columns[0],
										title: `Projection ${level + 1}`
									},
									widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table.table
										.columns[1]
								]
							}
						}
					};

					widgets = {
						...widgets,
						Projections_Default_Producer_Opportunity_Detaild_Production_Table: {
							...widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table,
							table: {
								...widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table.table,
								tableContent: proTableContent
							}
						}
					};

					widgets = {
						...widgets,
						Projections_Default_Producer_Opportunity_Detaild_Income_Table: {
							...widgets.Projections_Default_Producer_Opportunity_Detaild_Income_Table,
							table: {
								...widgets.Projections_Default_Producer_Opportunity_Detaild_Income_Table.table,
								tableContent: incTableContent
							}
						}
					};

					tableData.push({
						proTable: widgets.Projections_Default_Producer_Opportunity_Detaild_Production_Table,
						incTable: widgets.Projections_Default_Producer_Opportunity_Detaild_Income_Table
					});
				});

				widgets = { ...widgets, data: tableData };
			}
		}

		console.log('---------widgets', widgets);
		setData({ widgets });
	}, [widgets, main]);

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
			header={<Header title={title}></Header>}
			content={
				<div className="w-full p-12">
					<div className="flex items-center justify-center p-12">
						<FuseAnimateGroup
							className="flex flex-wrap w-1/2"
							enter={{ animation: 'transition.slideUpBigIn' }}
						>
							<Table md tableName="AVERAGES" data={data.widgets.Projections_Table} />
						</FuseAnimateGroup>
					</div>

					{[0, 1, 2, 3, 4].map(level => (
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<div className="flex justify-between items-center w-1/2 p-12">
								{data.widgets['data'] && <Table data={data.widgets['data'][level]['proTable']} />}
							</div>
							<div className="flex justify-between items-center w-1/2 p-12">
								{data.widgets['data'] && <Table data={data.widgets['data'][level]['incTable']} />}
							</div>
						</FuseAnimateGroup>
					))}
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('projectionsApp', reducer)(Component);
