import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { useParams , Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';

import { CardElement, useStripe, useElements , Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import { firebaseFunctionGetProductsEndpoint } from 'app/fuse-configs/endpointConfig';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { fade, ThemeProvider, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { registerWithFirebase , registerError } from 'app/auth/store/registerSlice';
import { useDispatch } from 'react-redux';

import history from '@history';
import { auth , realDb } from '../../../@fake-db/db/firebase';

import SubscriptionCard from './components/subscriptionCard';
import JWTRegisterTab from './tabs/JWTRegisterTab';
import FirebaseRegisterTabAgency from './tabs/FirebaseRegisterTabAgency';
import FirebaseRegisterTab from './tabs/FirebaseRegisterTab';
import CardElements from '../components/CardElements';

const publicKeyTest =
	'pk_test_51IFn0pAfN4Ms4oOXNtWGRfBvhbBdJ0zIV4bCiefjGeRgt8eMDfq7Cm4jovgdj5BfdQm2qbV6oL7jzgcQ13jQ70l800ocRcNzky';
const publicKeyProduction =
	'pk_live_51IFn0pAfN4Ms4oOXN3BfEGMoy6hhPMMhQ40T3Cn2gvUCDM8WohYEulmi9fNxjsU5Q428UhiuaVOaK9xI1TGnE9Zw00fx2e7IOG';
const stripePromise = loadStripe(publicKeyTest);
const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Register() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(1);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [state, setState] = useState({
		showPaymentForm: false,
		showSubscriptionForm: true,
		name: '',
		cardNumber: '',
		subscriptionStatus: false,
		token: '',
		subscriptionInfo: {},
		quantity: 0,
		email: '',
		showLoginForm: false,
		seatSubscription: {},
		selectedSubscription: {},
		model: {}
	});
	const [count, setCount] = useState([]);
	const routeParams = useParams(); 
	function handleTabChange(token, item) {
		console.log({ ...state, subscriptionStatus: true, token });
		let tempSeatSubscription = {};
		count.map(item => {
			if (item.nickname === 'seat'&&item.active) {
				tempSeatSubscription = { ...item };
			}
		});
		setState({
			...state,
			showLoginForm: true,
			token,
			showSubscriptionForm: false,
			selectedSubscription: item,
			seatSubscription: tempSeatSubscription
		});
	}

	function setPaymentState(model) {
		console.log(model);
		auth.fetchSignInMethodsForEmail(model.email)
			.then(res => {
				if (res[0] === 'password') {
					dispatch(
						registerError({ email: 'This email is registered already. Please try again with other email.' })
					);
				} else {
					setState({ ...state, showPaymentForm: true, showLoginForm: false, model });
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	useEffect(() => {
		const {belongTo} = routeParams;
		const {email} = routeParams;
		axios.post(`/api/auth/user/invitations`, { belongTo, email }).then(response => {
			console.log('-----response', response.data);
			history.push({ pathname: '/pages/errors/error-500' });
		}).catch(error => {
			console.log('---error', error);
		});
	}, [routeParams]);

	useEffect(() => {
		setMembership();
	}, []);

	async function setMembership() {
		const response = await axios.post(firebaseFunctionGetProductsEndpoint);
		if (response.data) {
			console.log(response.data);
			setCount(response.data.data);
		}
	}

	function setQuantity(value) {
		setState({ ...state, quantity: value });
	}

	function handleSubmit(res) {
		// props.setPaymentState(model)

		if (routeParams.id.length === 32) {
			dispatch(
				registerWithFirebase({
					...state.model,
					role: 'admin',
					belongTo: routeParams.belongTo,
					subscriptionInfo: {...res.data, active: true}
				})
			);
		} else if (routeParams.id.length === 150) {
			dispatch(
				registerWithFirebase({
					...state.model,
					role: 'agency',
					belongTo: routeParams.belongTo,
					subscriptionInfo: {}
				})
			);
		}
	}

	// if (loading) {   
	// 	return <FuseLoading />;
	// }

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					{state.showLoginForm && routeParams.id.length === 32 && (
						<Card
							className={clsx(
								classes.leftSection,
								'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
							)}
							square
						>
							<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
								<FuseAnimate delay={300}>
									<div className="flex items-center justif-center mb-32">
										<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
										<div className="border-l-1 mr-4 w-1 h-40" />
										<div>
											<Typography className="text-24 font-800 logo-text" color="inherit">
												EASY
											</Typography>
											<Typography
												className="text-16 tracking-widest -mt-8 font-700"
												color="textSecondary"
											>
												BONUS SYSTEM
											</Typography>
										</div>
									</div>
								</FuseAnimate>

								{selectedTab === 1 && (
									<FirebaseRegisterTab
										state={state.subscriptionStatus}
										subscriptionInfo={state.subscriptionInfo}
										email={state.email}
										setPaymentState={setPaymentState}
									/>
								)}
							</CardContent>

							<div className="flex flex-col items-center justify-center pb-32">
								<div>
									<span className="font-medium mr-8">Already have an account?</span>
									<Link className="font-medium" to="/login">
										Login
									</Link>
								</div>
								<Link className="font-medium mt-8" to="/">
									Back to Dashboard
								</Link>
							</div>
						</Card>
					)}

					{!state.subscriptionStatus && routeParams.id.length === 150 && (
						<Card
							className={clsx(
								classes.leftSection,
								'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
							)}
							square
						>
							<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
								<FuseAnimate delay={300}>
									<div className="flex items-center justif-center mb-32">
										<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
										<div className="border-l-1 mr-4 w-1 h-40" />
										<div>
											<Typography className="text-24 font-800 logo-text" color="inherit">
												EASY
											</Typography>
											<Typography
												className="text-16 tracking-widest -mt-8 font-700"
												color="textSecondary"
											>
												BONUS SYSTEM
											</Typography>
										</div>
									</div>
								</FuseAnimate>

								{selectedTab === 1 && <FirebaseRegisterTabAgency state />}
							</CardContent>

							<div className="flex flex-col items-center justify-center pb-32">
								<div>
									<span className="font-medium mr-8">Already have an account?</span>
									<Link className="font-medium" to="/login">
										Login
									</Link>
								</div>
								<Link className="font-medium mt-8" to="/">
									Back to Dashboard
								</Link>
							</div>
						</Card>
					)}

					<div
						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-32')}
					>
						<div className="max-w-lg">
							{routeParams.id.length === 32 && state.showSubscriptionForm && (
								<FuseAnimate animation="transition.slideUpIn" delay={400}>
									<div className="flex">
										{count.length > 0 &&
											count.map(item => {
												console.log(item)
												if (!item.nickname&&item.active)
													return (
														<SubscriptionCard
															setBuy={handleTabChange}
															price={item.amount / 100}
															interval={`${item.interval_count  } ${  item.interval}`}
															token={item.id}
															nickname={item.nickname}
															item={item}
														/>
													);
											})}
									</div>
								</FuseAnimate>
							)}
							{routeParams.id.length === 32 && state.showPaymentForm && (
								<FuseAnimate animation="transition.slideUpIn" delay={400}>
									<Elements stripe={stripePromise}>
										<CardElements
											handleSubmit={handleSubmit}
											token={state.token}
											quantity={state.quantity}
											selectedSubscription={state.selectedSubscription}
											seatSubscription={state.seatSubscription}
											email = {state.model.email}
										/>
									</Elements>
								</FuseAnimate>
							)}
							{routeParams.id.length !== 32 && (
								<FuseAnimate animation="transition.slideUpIn" delay={400}>
									<Typography variant="h3" color="inherit" className="font-800 leading-tight">
										Welcome <br />
										to the <br /> Agency Owner Home Page!
									</Typography>
								</FuseAnimate>
							)}
							{state.showLoginForm && routeParams.id.length === 32 && (
								<FuseAnimate delay={500} color="inherit">
									<div>
										<Typography variant="h3" color="inherit" className="font-800 leading-tight">
											Payment
										</Typography>
										<div className="flex justify-between">
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												Set up fee:
											</Typography>
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												$250
											</Typography>
										</div>
										<div className="flex justify-between">
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												{state.selectedSubscription.interval === 'month'
													? 'Monthly Subscription:'
													: 'Annual Subscription:'}
											</Typography>
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												${state.selectedSubscription.amount / 100}
											</Typography>
										</div>
										<div className="flex justify-between">
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												Addition seat: &nbsp;&nbsp;&nbsp;&nbsp;
											</Typography>
											<Paper className="flex items-center justify-center max-w-96">
												<TextField
													className=" max-w-96"
													id="outlined-basic"
													label="Members"
													variant="outlined"
													// type="number"
													value={state.quantity}
													onChange={e => setQuantity(parseInt(e.target.value)>0?e.target.value:'')}
												/>
											</Paper>
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												&nbsp;*&nbsp;$25/month
											</Typography>
										</div>
										<div className="flex justify-between">
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												Total:
											</Typography>
											<Typography variant="subtitle1" color="inherit" className="mt-32">
												$
												{state.selectedSubscription.amount / 100 +
													250 +
													(state.seatSubscription.amount / 100) * state.quantity}
											</Typography>
										</div>
									</div>
								</FuseAnimate>
							)}
						</div>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Register;
