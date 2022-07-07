import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

function Widget5(props) {
	const [currentRange, setCurrentRange] = useState('TW');
	const theme = useTheme();

	var widget = _.merge({}, props.widget);

	if (props.data) {
		var tempDataset = [...widget.mainChart.TW.datasets];
		tempDataset[0].data[0] = props.data.January.auto.value;
		tempDataset[0].data[1] = props.data.February.auto.value;
		tempDataset[0].data[2] = props.data.March.auto.value;
		tempDataset[0].data[3] = props.data.April.auto.value;
		tempDataset[0].data[4] = props.data.May.auto.value;
		tempDataset[0].data[5] = props.data.June.auto.value;
		tempDataset[0].data[6] = props.data.July.auto.value;
		tempDataset[0].data[7] = props.data.August.auto.value;
		tempDataset[0].data[8] = props.data.September.auto.value;
		tempDataset[0].data[9] = props.data.October.auto.value;
		tempDataset[0].data[10] = props.data.November.auto.value;
		tempDataset[0].data[11] = props.data.December.auto.value;
		tempDataset[1].data[0] = props.data.January.fire.value;
		tempDataset[1].data[1] = props.data.February.fire.value;
		tempDataset[1].data[2] = props.data.March.fire.value;
		tempDataset[1].data[3] = props.data.April.fire.value;
		tempDataset[1].data[4] = props.data.May.fire.value;
		tempDataset[1].data[5] = props.data.June.fire.value;
		tempDataset[1].data[6] = props.data.July.fire.value;
		tempDataset[1].data[7] = props.data.August.fire.value;
		tempDataset[1].data[8] = props.data.September.fire.value;
		tempDataset[1].data[9] = props.data.October.fire.value;
		tempDataset[1].data[10] = props.data.November.fire.value;
		tempDataset[1].data[11] = props.data.December.fire.value;
		tempDataset[2].data[0] = props.data.January.life.value;
		tempDataset[2].data[1] = props.data.February.life.value;
		tempDataset[2].data[2] = props.data.March.life.value;
		tempDataset[2].data[3] = props.data.April.life.value;
		tempDataset[2].data[4] = props.data.May.life.value;
		tempDataset[2].data[5] = props.data.June.life.value;
		tempDataset[2].data[6] = props.data.July.life.value;
		tempDataset[2].data[7] = props.data.August.life.value;
		tempDataset[2].data[8] = props.data.September.life.value;
		tempDataset[2].data[9] = props.data.October.life.value;
		tempDataset[2].data[10] = props.data.November.life.value;
		tempDataset[2].data[11] = props.data.December.life.value;
		tempDataset[3].data[0] = props.data.January.health.value;
		tempDataset[3].data[1] = props.data.February.health.value;
		tempDataset[3].data[2] = props.data.March.health.value;
		tempDataset[3].data[3] = props.data.April.health.value;
		tempDataset[3].data[4] = props.data.May.health.value;
		tempDataset[3].data[5] = props.data.June.health.value;
		tempDataset[3].data[6] = props.data.July.health.value;
		tempDataset[3].data[7] = props.data.August.health.value;
		tempDataset[3].data[8] = props.data.September.health.value;
		tempDataset[3].data[9] = props.data.October.health.value;
		tempDataset[3].data[10] = props.data.November.health.value;
		tempDataset[3].data[11] = props.data.December.health.value;

		widget = {
			...widget,
			mainChart: { ...widget.mainChart, TW: { ...widget.mainChart.TW, datasets: [...tempDataset] } }
		};
	}

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
				<div className="w-full md:w-full p-8 min-h-420 h-420">
					{widget.mainChart && (
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
					)}
				</div>
			</div>
		</Paper>
	);
}

export default React.memo(Widget5);
