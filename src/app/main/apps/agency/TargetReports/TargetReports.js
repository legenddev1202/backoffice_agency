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
import Table from '../../../components/widgets/SpecialTable';
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
import { dividing, getMain } from '../../../utils/Function';

const belongTo = localStorage.getItem('@BELONGTO');
const UID = localStorage.getItem('@UID');

function TargetReports(props) {
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
	const [user, setUser] = useState(UID);
	const [year, setYear] = useState(moment().format('yyyy'));
	const [production, setProduction] = useState('Show Written Production');
	const [userList, setUserList] = useState([]);
	const [tabValue, setTabValue] = useState(0);
	const [title, setTitle] = useState('Target Bonus');

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getBonusPlans());
		dispatch(getMarketings());
		dispatch(getEntries(year));
		dispatch(getVision(year));
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		var temp = [];
		if (users.length > 0) {
			users.map(user => {
				if (user.belongTo === UID) temp.push({ item: user.data.displayName, value: user.id });
			});
			setUserList(temp);
		}
	}, [users]);

	useEffect(() => {
		if (users.length > 0 && entries.length > 0 && bonusPlans.length > 0) {
			const temp = getMain(entries, bonusPlans, [], users, [], []);
			setMain(temp);
		}
	}, [entries, bonusPlans, users]);

	useEffect(() => {
		if (!_.isEmpty(widgets) && !_.isEmpty(main) && user !== '') {
			if (widgets.Agency_TargetReports_Auto_Table) {
				policies.map(policy => {
					let tempRows = [];
					let policiesCells = [
						{
							id: 'left_title',
							value: 'Policies',
							classes: 'bg-blue text-white',
							icon: ''
						}
					];
					let annualPremiumCells = [
						{
							id: 'left_title',
							value: 'Anual Preminum',
							classes: 'bg-green text-white',
							icon: ''
						}
					];
					let levelReachedCells = [
						{
							id: 'left_title',
							value: 'Level Reached',
							classes: 'bg-red text-white',
							icon: ''
						}
					];
					let flatSAmountCells = [
						{
							id: 'left_title',
							value: 'Flat $ Amount',
							classes: 'bg-pink text-white',
							icon: ''
						}
					];
					let targetBonusEarned = [
						{
							id: 'left_title',
							value: 'Target Bonus Earned',
							classes: 'bg-orange text-white',
							icon: ''
						}
					];
					if (policy.value !== 'Total') {
						months.map(month => {
							policiesCells.push({
								id: month.value,
								value: main[production][month.value][user][policy.value]['Policies'],
								classes: '',
								icon: ''
							});
							annualPremiumCells.push({
								id: month.value,
								value: main[production][month.value][user][policy.value]['Premium'],
								classes: '',
								icon: ''
							});
							levelReachedCells.push({
								id: month.value,
								value: getLevel(
									main[production][month.value][user][policy.value]['Policies'],
									policy.value
								).level,
								classes: '',
								icon: ''
							});
							flatSAmountCells.push({
								id: month.value,
								value: getLevel(
									main[production][month.value][user][policy.value]['Policies'],
									policy.value
								).amount,
								classes: '',
								icon: ''
							});
							targetBonusEarned.push({
								id: month.value,
								value: main[production][month.value][user][policy.value]['Bonuses'],
								classes: '',
								icon: ''
							});
						});

						tempRows.push({
							id: 1,
							cells: policiesCells
						});
						tempRows.push({
							id: 2,
							cells: annualPremiumCells
						});
						tempRows.push({
							id: 3,
							cells: levelReachedCells
						});
						tempRows.push({
							id: 4,
							cells: flatSAmountCells
						});
						tempRows.push({
							id: 5,
							cells: targetBonusEarned
						});

						widgets = {
							...widgets,
							[`Agency_TargetReports_${policy.value}_Table`]: {
								...widgets[`Agency_TargetReports_${policy.value}_Table`],
								title: policy.value.toUpperCase()
							}
						};
						widgets = {
							...widgets,
							[`Agency_TargetReports_${policy.value}_Table`]: {
								...widgets[`Agency_TargetReports_${policy.value}_Table`],
								table: {
									...widgets[`Agency_TargetReports_${policy.value}_Table`].table,
									rows: [...tempRows]
								}
							}
						};
					}
				});
			}
		}

		console.log('---------widgets', widgets);
		setData({ widgets });
	}, [widgets, main, user, production]);

	function getLevel(policyCount, policyName) {
		let dbName = '';
		if (policyName === 'Auto') dbName = 'individualAutoTargetBonus';
		if (policyName === 'Fire') dbName = 'individualFireTargetBonus';
		if (policyName === 'Life') dbName = 'individualLifeTargetBonus';
		if (policyName === 'Health') dbName = 'individualHealthTargetBonus';
		if (policyName === 'Bank') dbName = 'individualBankTargetBonus';
		if (policyName === 'Other') dbName = 'individualOtherTargetBonus';

		let level = {
			level: '',
			policies: 0,
			amount: 0,
			nextLevel: '',
			nextPolicies: 0,
			nextAmount: 0,
			maxLevel: '',
			maxPolicies: 0,
			maxAmount: 0
		};
		let count = 0;
		if (bonusPlans.length > 0 && bonusPlans[0].hasOwnProperty(dbName)) {
			Object.keys(bonusPlans[0][dbName]).map((key, n) => {
				const item = bonusPlans[0][dbName][key];
				if (policyCount > 0) {
					if (n === 0) {
						level.level = 'None Reached';
					}
					if (policyCount >= item.policies) {
						level.level = item.level;
						level.policies = item.policies;
						level.amount = item.amount;
						count++;
					}
					if (n === count) {
						level.nextLevel = item.level;
						level.nextPolicies = item.policies;
						level.nextAmount = item.amount;
					}
					if (n === Object.keys(bonusPlans[0][dbName]).length - 1) {
						level.maxLevel = item.level;
						level.maxPolicies = item.policies;
						level.maxAmount = item.amount;
					}
				}
			});
		}

		return level;
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
				</Header>
			}
			content={
				<div className="w-full p-12">
					<div className="p-12">
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<Table data={data.widgets.Agency_TargetReports_Auto_Table} />
						</FuseAnimateGroup>
					</div>
					<div className="p-12">
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<Table data={data.widgets.Agency_TargetReports_Fire_Table} />
						</FuseAnimateGroup>
					</div>
					<div className="p-12">
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<Table data={data.widgets.Agency_TargetReports_Life_Table} />
						</FuseAnimateGroup>
					</div>
					<div className="p-12">
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<Table data={data.widgets.Agency_TargetReports_Health_Table} />
						</FuseAnimateGroup>
					</div>
					<div className="p-12">
						<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
							<Table data={data.widgets.Agency_TargetReports_Bank_Table} />
						</FuseAnimateGroup>
					</div>
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('agencyApp', reducer)(TargetReports);
