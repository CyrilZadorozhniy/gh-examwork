const SalesReportHighChart= {
    chart: {
        height: 350 - 81,
        backgroundColor: '#2f3242',
    },
    title: {
        text: ''
    },

    subtitle: {
        text: ''
    },
    yAxis: {
        labels: {
            enabled: false
        },
        gridLineColor:'rgba(144, 144, 144, 0.11)',
        reversed: false,
        gridLineWidth: 1,
    },
    xAxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12]
    },
    plotOptions: {
        series: {
            color: '#505464',
            border: 'none',
            states: {
                hover: {
                    color: '#2196f3'
                }
            }
        }
    },
    series: [{
        type: 'column',
        borderColor: 'none',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        showInLegend: false
    }]
};
export default SalesReportHighChart
