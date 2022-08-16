import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const HeaderDownLoadButton = props => {
	const history = useHistory();

	return (
		<Tooltip title="Time track excel file download" placement="bottom">
			<Button className={clsx('h-40 bg-gray', props.className)}>
				<a href="https://firebasestorage.googleapis.com/v0/b/insurancewebapptest.appspot.com/o/Timesheet%20Template.xlsx?alt=media&token=f734cf0a-759e-417f-893c-e4dfe6b798f9">
					Download Timesheet
				</a>
			</Button>
		</Tooltip>
	);
};

export default HeaderDownLoadButton;
