import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLoginWithFireBase } from 'app/auth/store/loginSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../../../@fake-db/db/firebase';
import { showMessage } from 'app/store/fuse/messageSlice';

function FirebaseLoginTab(props) {
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const formRef = useRef(null);

	useEffect(() => {
		if (login.error && (login.error.username || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(submitLoginWithFireBase(model));
	}

	function resetPassword() {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleSent = () => {
		auth.sendPasswordResetEmail(email)
			.then(function (user) {
				dispatch(showMessage({ message: "Please check your email..." }))
				setOpen(false);
			})
			.catch(function (e) {
				dispatch(showMessage({ message: e }))
				console.log(e);
			});
		
	};

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="username"
					label="Email"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto normal-case mt-16"
					aria-label="LOG IN"
					disabled={!isFormValid}
					value="firebase"
				>
					Log in
				</Button>
				<div className="flex flex-col items-center justify-center p-32">
					<div className="font-medium mt-8 text-red-500 cursor-pointer" onClick={resetPassword}>
						Forgot password?
					</div>
				</div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Did you forgot password?'}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
						We will send link to your email
						</DialogContentText>
						<TextField
							id="outlined-basic"
							className="w-full"
							label="Email"
							variant="outlined"
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							No
						</Button>
						<Button onClick={handleSent} color="primary" autoFocus>
							Send
						</Button>
					</DialogActions>
				</Dialog>
			</Formsy>
		</div>
	);
}

export default FirebaseLoginTab;
