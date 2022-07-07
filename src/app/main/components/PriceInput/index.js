import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			// margin: theme.spacing(1)
		}
	}
}));



function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						name: props.name,
						value: values.value
					}
				});
			}}
			thousandSeparator
			isNumericString
			prefix="$"
		/>
	);
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default function FormattedInputs(props) {
	const { id, label, variant, value, handleChangeValue, validation, size, willvalidation, validate } = props;
	const classes = useStyles();

	const handleChange = event => {
		if (willvalidation) {
			if (event.target.value) {
				handleChangeValue({ [validation]: event.target.value, [`${validation}Validation`]: false });
			} else {
				handleChangeValue({ [validation]: event.target.value, [`${validation}Validation`]: true });
			}
		} else {
			handleChangeValue({ [validation]: event.target.value });
		}
	};

	return (
		<div className={classes.root}>
			<TextField
				error={validate ? true : false}
				value={value}
				label={label}
				onChange={handleChange}
				name={validation}
				variant="outlined"
				id="formatted-numberformat-input"
				size="small"
				InputProps={size?{
					style:{width:size},
					inputComponent: NumberFormatCustom
				}:{
					style:{width:120},
					inputComponent: NumberFormatCustom
				}}
			
			/>
		</div>
	);
}
