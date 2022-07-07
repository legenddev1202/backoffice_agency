import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from '../components/SelectBox';
import { addUser, openUserDialog, closeUserDialog } from '../store/userSlice';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
	firebaseFuncitonSendEmailEndpoint,
	firebaseFunctionDeleteUserEndpoint,
	deployOfficerEndpoint,
	deployProducerEndpoint
} from 'app/fuse-configs/endpointConfig';

const defaultFormState = {
	id: '',
	// name:'',
	email: '',
	emailValidation: false,
	role: '',
	roleValidation: false,
	belongTo: localStorage.getItem('@BELONGTO')
};

const sourceLists = [{ item: 'Producer', value: 'producer' }];

const sourceAdminLists = [
	{ item: 'Agency', value: 'agency' },
	{ item: 'Producer', value: 'producer' }
];

function AddUserDialog(props) {
	const dispatch = useDispatch();
	const addUserDialog = useSelector(({ users }) => users.users.addUserDialog);
	const role = useSelector(({ auth }) => auth.user.role[0]);
	const [lists, setLists] = useState(sourceAdminLists);

	useEffect(() => {
		if (role === 'agency') {
			setLists(sourceLists);
		}
	}, [role]);
	const { form, handleChange, setForm } = useForm(defaultFormState);

	const handleChangeValue = data => {
		setForm({ ...form, ...data });
	};

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (addUserDialog.type === 'edit' && addUserDialog.data) {
			setForm({ ...addUserDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (addUserDialog.type === 'new') {
			setForm({
				...defaultFormState,
				// ...addUserDialog.data,
				planType: addUserDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [addUserDialog.data, addUserDialog.type, setForm]);

	const [open, setOpen] = React.useState(true);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (addUserDialog.props.open) {
			initDialog();
		}
	}, [addUserDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return addUserDialog.type === 'edit' ? dispatch(closeUserDialog()) : dispatch(closeUserDialog());
	}

	function canBeSubmitted() {
		return form.email.length > 0 && form.role.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (addUserDialog.type === 'new') {
			console.log(form.email)
			
			dispatch(addUser({ ...form })).then(
				dispatch(showMessage({ message: 'Invitation sent to email. Please check the email!' }))
			);
		} else {
			
			dispatch(addUser({ ...form }));

		}
		closeComposeDialog();
	}

	function handleRemove() {
		// dispatch(removeContact(form));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...addUserDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{addUserDialog.type === 'new' ? 'Send Invitation' : 'Edit Plan'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<TextField
							className="mb-24"
							label="Email"
							autoFocus
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<SelectBox
							id="outlined-basic"
							label="Role"
							data={lists}
							variant="outlined"
							value={form.role}
							validation="role"
							handleChangeValue={handleChangeValue}
							willvalidation={false}
							size={100}
						/>
					</div>
				</DialogContent>

				{addUserDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Send Invitation
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
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default AddUserDialog;
