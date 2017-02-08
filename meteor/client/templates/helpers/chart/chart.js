// Global template helper for charts

Template.registerHelper(
	/**
	 * Build a new gauge usign the container id and the given label
	 * @param  {String} id    Id of div container to use for gauge
	 * @param  {String} label Label to use for gauge
	 * @return {void}       
	 */
	'buildGauge', (id, label, yAxisMax) => {
		$('#' + id).highcharts({
			// Options json for gauge chart setup
			chart: {
				type: 'solidgauge'
			},

			title: null,

			pane: {
				center: ['50%', '85%'],
				size: '140%',
				startAngle: -90,
				endAngle: 90,
				background: {
					backgroundColor: '#EEE',
					innerRadius: '60%',
					outerRadius: '100%',
					shape: 'arc'
				}
			},

			tooltip: {
				enabled: false
			},

			yAxis: {
				min: 0,
				max: yAxisMax,
				title: {
					text: label
				},

				stops: [
					[0.1, '#4caf50'],
					[0.5, '#ffc107'],
					[0.9, '#f44336']
				],
				lineWidth: 0,
				minorTickInterval: null,
				tickPositions: [0, yAxisMax],
				tickWidth: 0,
				title: {
					y: -70
				},
				labels: {
					y: 16
				}
			},

			plotOptions: {
				solidgauge: {
					dataLabels: {
						y: 5,
						borderWidth: 0,
						useHTML: true
					}
				}
			},

			credits: {
				enabled: false
			},

			series: [{
				name: label,
				data: [0],
				dataLabels: {
					format: '<div style="text-align:center"><span style="font-size:25px;color:#7e7e7e">{y}</span><br/>' +
						'<span style="font-size:12px;color:silver">' + label + '</span></div>'
				},
				tooltip: {
					valueSuffix: ' ' + label
				}
			}]
		});
	}
);

Template.registerHelper(
	/**
	 * Update the value of a gauge identified by given id
	 * @param  {String} id    Gauge id
	 * @param  {Int} value New value to use for gauge
	 * @return {void}       
	 */
	'updateGaugeValue', (id, value) => {
		// Gets rendered chart object
		var chart = $('#' + id).highcharts();

		if (chart) {
			var point = chart.series[0].points[0];

			point.update(value);
		}
	}
);