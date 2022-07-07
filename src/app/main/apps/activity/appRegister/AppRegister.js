import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import reducer from '../store';
import Table from '../../../components/widgets/Table';
import Chart from '../../../components/widgets/BarChart';
import PieChart from '../../../components/widgets/PieChart';
import SelectBox from '../../../components/CustomSelectBox';
import Header from '../../../components/widgets/Header';
import { getWidgets, selectWidgets } from '../store/widgetsSlice';
import { getUsers, selectUsers } from '../store/usersSlice';
import { getEntries, selectEntries, setSearchText } from '../store/entriesSlice';
import { Options as options, months1 } from '../../../utils/Globals';
import { formattedDate } from '../../../utils/Function';

const UID = localStorage.getItem('@UID');

function AppRegister(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ activityApp }) => activityApp.entries.searchText);
	const mainTheme = useSelector(selectMainTheme);
	let widgets = useSelector(selectWidgets);
	const users = useSelector(selectUsers);
	const entries = useSelector(selectEntries);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [main, setMain] = useState([]);
	const [date, setDate] = useState(moment());
	const [product, setProduct] = useState('Total');
	const [period, setPeriod] = useState(moment().format('MMMM'));
	const [title, setTitle] = useState('Application Register');

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getEntries(moment(date).format('yyyy')));
		dispatch(getWidgets()).then(() => setLoading(false));
	}, [dispatch, date]);

	useEffect(() => {
		// creating temp
		let temp = [];
		if (entries.length > 0 && users.length > 0) {
			const entryNames = {
				Entries: 'Auto',
				FireEntries: 'Fire',
				LifeEntries: 'Life',
				HealthEntries: 'Health',
				BankEntries: 'Bank',
				OtherEntries: 'Other'
			};

			let i = 0;
			Object.keys(entries[0]).map(entryName => {
				users.map(user => {
					if (user.belongTo === UID) {
						if (entries[0][entryName].hasOwnProperty(user.id)) {
							Object.keys(entries[0][entryName][user.id]).map((key, rowNum) => {
								const item = entries[0][entryName][user.id][key];
								const issuedMonth =
									item.datePolicyIsIssued === ''
										? ''
										: new Date(item.datePolicyIsIssued).getMonth() + 1;
								const writtenMonth = new Date(item.datePolicyIsWritten).getMonth() + 1;
								temp[i] = {};
								temp[i]['Client Name'] = item.policyHolderName;
								temp[i]['Policy(Tracking) Number or Description'] = item.policyInformation;
								temp[i]['Date Product Is Written'] = formattedDate(new Date(item.datePolicyIsWritten));
								temp[i]['Date Product Is Issued'] = formattedDate(new Date(item.datePolicyIsIssued));
								temp[i]['Product Line'] = entryNames[entryName];
								temp[i]['Product Type'] = item['typeOfProduct'];
								temp[i]['Marketing Source'] = item['sourceOfBusiness'];
								temp[i]['Product Dollars'] = `$${item['policyPremium']}`;
								temp[i]['Bonus'] = `$${item['dollarBonus']}`;
								temp[i]['Month Written'] = writtenMonth;
								temp[i]['Month Issued'] = issuedMonth;
								i++;
							});
						}
					}
				});
			});
		}
		//console.log('--------------------temp=', temp);
		if (temp.length > 0) {
			if (period === 'Quarter 1 Totals') {
				temp = _.filter(
					temp,
					item => item['Month Written'] === 1 || item['Month Written'] === 2 || item['Month Written'] === 3
				);
			} else if (period === 'Quarter 2 Totals') {
				temp = _.filter(
					temp,
					item => item['Month Written'] === 4 || item['Month Written'] === 5 || item['Month Written'] === 6
				);
			} else if (period === 'Quarter 3 Totals') {
				temp = _.filter(
					temp,
					item => item['Month Written'] === 7 || item['Month Written'] === 8 || item['Month Written'] === 9
				);
			} else if (period === 'Quarter 4 Totals') {
				temp = _.filter(
					temp,
					item => item['Month Written'] === 10 || item['Month Written'] === 11 || item['Month Written'] === 12
				);
			} else if (months1.includes(period)) {
				temp = _.filter(temp, item => item['Month Written'] - 1 === months1.indexOf(period));
			}

			if (product !== 'Total') {
				temp = _.filter(temp, item => item['Product Line'].toLowerCase().includes(product.toLowerCase()));
			}

			if (searchText.length !== 0) {
				setMain(_.filter(temp, item => item['Client Name'].toLowerCase().includes(searchText.toLowerCase())));
			} else {
				setMain(temp);
			}
		}
	}, [entries, users, searchText, period, product]);

	useEffect(() => {
		if (!_.isEmpty(widgets) && !_.isEmpty(main)) {
			if (widgets.Activity_AppRegister_Table) {
				let rows = [];
				main.map((item, n) => {
					rows.push({ id: n + 1, value: n + 1, color: '' });
					Object.keys(item).map(key => {
						widgets = {
							...widgets,
							Activity_AppRegister_Table: {
								...widgets.Activity_AppRegister_Table,
								table: {
									...widgets.Activity_AppRegister_Table.table,
									tableContent: {
										...widgets.Activity_AppRegister_Table.table.tableContent,
										[n + 1]: {
											...widgets.Activity_AppRegister_Table.table.tableContent[n + 1],
											[key]: item[key]
										}
									}
								}
							}
						};
					});
				});
				widgets = {
					...widgets,
					Activity_AppRegister_Table: {
						...widgets.Activity_AppRegister_Table,
						table: {
							...widgets.Activity_AppRegister_Table.table,
							rows: rows
						}
					}
				};
			}
		}

		//console.log('-----Widgets=', widgets);
		setData({ widgets });
	}, [widgets, main]);

	function handleChangePeriod(event) {
		setPeriod(event.target.value);
	}

	function handleChangeProduct(event) {
		setProduct(event.target.value);
	}

	function handleChangeYear(date) {
		setDate(date);
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
								label="Month"
								data={options.period.data}
							/>
						</FuseAnimate>
					</div>
					<div className="flex flex-1 items-center justify-center px-12">
						<FuseAnimate animation="transition.slideUpIn" delay={300}>
							<SelectBox
								value={product}
								onChange={ev => handleChangeProduct(ev)}
								label="Product Line"
								data={options.product.data}
							/>
						</FuseAnimate>
					</div>
					<div className="flex flex-1 items-center justify-center px-12">
						<ThemeProvider theme={mainTheme}>
							<FuseAnimate animation="transition.slideDownIn" delay={300}>
								<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8 shadow">
									<Icon color="action">search</Icon>
									<Input
										placeholder="Search"
										className="flex flex-1 mx-8"
										disableUnderline
										fullWidth
										value={searchText}
										inputProps={{
											'aria-label': 'Search'
										}}
										onChange={ev => dispatch(setSearchText(ev))}
									/>
								</Paper>
							</FuseAnimate>
						</ThemeProvider>
					</div>
				</Header>
			}
			content={
				<div className="w-full p-12">
					<FuseAnimateGroup className="flex flex-wrap" enter={{ animation: 'transition.slideUpBigIn' }}>
						<div className="widget flex p-12">
							<Table data={data.widgets.Activity_AppRegister_Table} sortable />
						</div>
					</FuseAnimateGroup>
				</div>
			}
			innerScroll
		/>
	);
}

export default withReducer('activityApp', reducer)(AppRegister);
