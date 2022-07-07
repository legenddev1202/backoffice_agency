import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeContact,
	updateContact,
	addContact,
	closeNewNetBonusDialog,
	closeEditNetBonusDialog
} from './store/bonusPlanSlice';

const defaultFormState = {
	id: '',
	name: '',
	dollar: '',
	planType:''
};

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ bonusPlan }) => bonusPlan.autoBonus.netBonusDialog);
	console.log(contactDialog)
	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				// ...contactDialog.data,
				planType:contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit' ? dispatch(closeEditNetBonusDialog()) : dispatch(closeNewNetBonusDialog());
	}

	function canBeSubmitted() {
		return form.name.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(addContact({...form, routeParam: props.routeParam}));
		} else {
			dispatch(updateContact({...form, routeParam: props.routeParam}));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(removeContact(form));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New Individual Target Plan' : 'Edit Individual Target Plan'}
					</Typography>
				</Toolbar>
				{/* <div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} />
					{contactDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div> */}
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						{/* <div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div> */}

						<TextField
							className="mb-24"
							label="Policy Type"
							autoFocus
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

				

					<div className="flex">
						{/* <div className="min-w-48 pt-20">
							<Icon color="action">dollar</Icon>
						</div> */}
						<TextField
							className="mb-24"
							label="$"
							id="dollar"
							name="dollar"
							type='number'
							value={form.dollar}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>					
					
				</DialogContent>

				{contactDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								Save
							</Button>
						</div>
						{/* <IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton> */}
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ContactDialog;
