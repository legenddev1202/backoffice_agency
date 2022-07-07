import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {useParams} from 'react-router-dom'
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerWithFirebase } from 'app/auth/store/registerSlice';
import { showMessage } from 'app/store/fuse/messageSlice';


function FirebaseRegisterTab(props) {
	const routeParams = useParams();

	const belongTo = routeParams.belongTo
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
		
		
	}, [register]);

	

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		if(routeParams.belongTo==='admin'&&!props.state){
			dispatch(showMessage({ message: 'Please choose the membership!' }))
			return
		}
		if(routeParams.id.length===32){
			dispatch(registerWithFirebase({...model, role: "admin", belongTo, subscriptionInfo: props.subscriptionInfo}));
		} else if(routeParams.id.length===150) {
			dispatch(registerWithFirebase({...model, role: "agency",belongTo, subscriptionInfo:{}}));
		}		
	}

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
					name="displayName"
					label="Display name"
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
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
					disabled={routeParams.email!=='0'?true:false}
					value={routeParams.email!=='0'?routeParams.email:''}
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
					validations="equalsField:password-confirm"
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
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
					name="password-confirm"
					label="Confirm Password"
					validations="equalsField:password"
					validationErrors={{
						equalsField: 'Passwords do not match'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									vpn_key
								</Icon>
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
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER WITH FIREBASE"
					disabled={!isFormValid}
				>
					Register
				</Button>
			</Formsy>
		</div>
	);
}

export default FirebaseRegisterTab;
