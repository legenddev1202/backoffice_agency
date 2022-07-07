import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';




function TextInput(props) {
	const { id, label, variant, value, onChange, validation, type, willvalidation, validate, size, rows } = props;
	function handleChange(event) {
		
		if(willvalidation){
			if(event.target.value){
				onChange({[validation]:event.target.value, [`${validation}Validation`]:false});
				
			} else {
				onChange({[validation]:event.target.value, [`${validation}Validation`]:true});
			}
			
		} else {
			onChange({[validation]:event.target.value});
		}
		
	}
	return (
		<TextField
			id={id}
			error={validate?true:false}
			label={label}
			variant={variant}
			rows={rows?rows:1}
			value={value}
            onChange={handleChange}
            type={type==='percent'?"number":'text'}
            size="small"
			multiline={true}
            name={validation}
			InputProps={size?{
				style:{width:size},
				endAdornment: type === 'percent' ? <InputAdornment position="end">%</InputAdornment> : <></>
			}:{
				style:{width:120},
				endAdornment: type === 'percent' ? <InputAdornment position="end">%</InputAdornment> : <></>
			}}
		/>
	);
}

export default TextInput;
