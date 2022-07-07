import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setProductsSearchText } from '../store/productTypeSlice';
import SelectBox from '../../../components/SelectBox';
import { getMarketing, setPolicy } from '../store/productTypeSlice';

function ProductsHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ productType }) => productType.productType.searchText);
	const mainTheme = useSelector(selectMainTheme);

	useEffect(() => {
		dispatch(getMarketing('Entries'));
	}, [dispatch]);
	const [state, setState] = useState({
		policies: [
			{ item: 'Auto', value: 'Entries' },
			{ item: 'Fire', value: 'FireEntries' },
			{ item: 'Life', value: 'LifeEntries' },
			{ item: 'Health', value: 'HealthEntries' },
			{ item: 'Bank', value: 'BankEntries' }
		],
		policy:'Entries'
	});

	const handleChangeValue = (data) => {
		setState({...state, policy:data.policy})
		dispatch(setPolicy(data.policy))
	};

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">meeting_room</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Proudct Subtype
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex p-4 items-center w-full max-w-216 h-48 px-8 py-4 rounded-8 shadow">
							{/* <Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(setProductsSearchText(ev))}
							/> */}

							<SelectBox
								id="outlined-basic"
								label="Select Policy"
								data={state.policies}
								variant="outlined"
								value={state.policy}
								validation="policy"
								handleChangeValue={handleChangeValue}
								// willvalidation={false}
								// validate={state.userValidation}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/apps/e-commerce/products/new"
					className="whitespace-nowrap normal-case"
					variant="contained"
					color="secondary"
				>
					<span className="hidden sm:flex">Add New Product</span>
					<span className="flex sm:hidden">New</span>
				</Button>
			</FuseAnimate> */}
		</div>
	);
}

export default ProductsHeader;
