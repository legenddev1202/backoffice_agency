import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'red'
	},
	margin: {
		margin: theme.spacing(1)
	},
	spin: {
		'& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
			display: 'none'
		}
	}
}));

function TextInput(props) {
	const classes = useStyles();
	const { id, key, type, value, onChange, size, readOnly, startAdornment, endAdornment, inputProps } = props;

  return (
    <TextField
      id={id}
      key={key}
      className={(classes.margin, classes.spin)}
      value={value}
      onChange={onChange}
      type={type}
      size={size}
      readOnly={readOnly}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      inputProps={inputProps}
    />
  );
}

export default TextInput;
