import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React, { useState } from 'react';
import { Bar, Line, HorizontalBar } from 'react-chartjs-2';

function Chart(props) {
	const [currentRange, setCurrentRange] = useState('TW');
	const theme = useTheme();

	const widget = _.merge({}, props.data);

	_.setWith(widget, 'widget.mainChart.options.scales.xAxes[0].ticks.fontColor', theme.palette.text.secondary);
	_.setWith(widget, 'widget.mainChart.options.scales.yAxes[0].ticks.fontColor', theme.palette.text.secondary);

	function handleChangeRange(range) {
		setCurrentRange(range);
	}

	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center justify-between px-16 py-16 border-b-1">
				<Typography className="text-16">{widget.title}</Typography>				
			</div>
			<div className="flex flex-row flex-wrap justify-center h-420">
				<div className="w-full p-8 min-h-420 h-420">
					<Bar
						data={{
							labels: widget.mainChart[currentRange].labels,
							datasets: widget.mainChart[currentRange].datasets.map((obj, index) => {
								const palette = theme.palette[index === 0 ? 'primary' : 'secondary'];
								return {
									...obj,
									borderColor: palette.main,
									backgroundColor: obj.backgroundColor,
									pointBackgroundColor: palette.dark,
									pointHoverBackgroundColor: palette.main,
									pointBorderColor: palette.contrastText,
									pointHoverBorderColor: palette.contrastText
								};
							})
						}}
						options={widget.mainChart.options}
					/>
				</div>
			
			</div>
		</Paper>
	);
}

export default React.memo(Chart);
