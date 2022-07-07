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
import SelectBox from '../components/SelectBox';
import { addUser, openUserProfileDialog, closeUserProfileDialog } from '../store/userSlice';

const defaultFormState = {
	id: '',
	name:'',
	email: '',
	emailValidation: false,
	role: '',
	roleValidation: false
};

const sourceLists = [
	{ item: 'Agency', value: 'agency' },
	{ item: 'Producer', value: 'producer' }
];

function UserProfileDialog(props) { 
	const dispatch = useDispatch();
	const userProfileDialog = useSelector(({ users }) => users.users.userProfileDialog);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const handleChangeValue = data => {
		setForm({ ...form, ...data });
	};

	const initDialog = useCallback(() => { 
		if (userProfileDialog.data) {
			setForm({ ...userProfileDialog.data });
		}
	}, [userProfileDialog.data, userProfileDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (userProfileDialog.props.open) {
			initDialog();
		}
	}, [userProfileDialog.props.open, initDialog]);

	function closeComposeDialog() {
		dispatch(closeUserProfileDialog());
	}

	function handleRemove() {
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...userProfileDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{'User Profile'}
					</Typography>
				</Toolbar>			
			</AppBar>
			<form noValidate className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">					
						<TextField
							className="mb-24"
							label="Name"
							autoFocus
							id="name"
							name="name"
							value={form.displayName}
							// onChange={handleChange}
							variant="outlined"
							required
							fullWidth
							inputProps={{
								readOnly: Boolean(true),
								disabled: Boolean(true),
							}}
						/>
					</div>
					<div className="flex">					
						<TextField
							className="mb-24"
							label="Email"
							autoFocus
							id="email"
							name="email"
							value={form.email}
							// onChange={handleChange}
							variant="outlined"
							required
							fullWidth
							inputProps={{
								readOnly: Boolean(true),
								disabled: Boolean(true),
							}}
					
						/>
					</div>
					{/* <div className="flex">
					
						<SelectBox
							id="outlined-basic"
							label="Role"
							data={sourceLists}
							variant="outlined"
							value={form.role}
							validation="role"
							handleChangeValue={handleChangeValue}
							willvalidation={false}
							size={100}
						/>
					</div> */}
				</DialogContent>				
				<DialogActions className="justify-between p-8">				
					<IconButton onClick={handleRemove}>
						<Icon>delete</Icon>
					</IconButton>
				</DialogActions>
			
			</form>
		</Dialog>
	);
}

export default UserProfileDialog;
