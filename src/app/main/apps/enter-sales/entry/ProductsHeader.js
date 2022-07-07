import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setProductsSearchText, cleanEditData } from '../store/entrySlice';
import history from '@history';

function ProductsHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.products.searchText);
	const mainTheme = useSelector(selectMainTheme);
	const addSale = () => {
		history.push('/apps/enter-sales/entry/new');
		dispatch(cleanEditData());
	};

	const addMultiAuto = () => {
		history.push('/apps/enter-sales/multi-auto-polices');
		dispatch(cleanEditData());
	};
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">point_of_sale</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Sales
					</Typography>
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
								onChange={ev => dispatch(setProductsSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>

			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					// component={Link}
					// to="/apps/enter-sales/entry/new"
					className="whitespace-nowrap normal-case mr-32"
					variant="contained"
					color="secondary"
					onClick={addMultiAuto}
				>
					<span className="sm:flex">Add Multi Auto Policies</span>
				</Button>
			</FuseAnimate> */}
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					// component={Link}
					// to="/apps/enter-sales/entry/new"
					className="whitespace-nowrap normal-case"
					variant="contained"
					color="secondary"
					onClick={addSale}
				>
					<span className="sm:flex">Add Sales</span>
					{/* <span className="flex sm:hidden">New</span> */}
				</Button>
			</FuseAnimate>
		</div>
	);
}

export default ProductsHeader;
