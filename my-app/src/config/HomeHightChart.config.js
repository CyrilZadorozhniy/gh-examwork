const HomeHightChart = {
    chart: {
        margin: [-27, -300, 0, -300],
        height: 400,
        backgroundColor: '#2f3242',
        type: 'areaspline'
    },
    title: {
        text: ''
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,

    },
    xAxis: {
        gridLineColor:'rgba(144, 144, 144, 0.11)',
        reversed: false,
        gridLineWidth: 1,
        categories: [
            'Mon',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Fri',
        ],

    },
    yAxis: {
        max: 6,
        gridLineWidth: 0,
        enabled:false
    },

    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        },
        series: {
            liheWidth: 3,
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, 'rgba(33, 150, 243, 0)'],
                    [1, 'rgba(33, 150, 243, 0.3)']
                ]
            },

        }
    },
    series: [{
        color:'#2196f3',
        showInLegend: false,
        name: 'Jane',
        data: [2,1, 3, 4, 3, 3,4],
        marker: {
            enabled: false,
        },
    }]
};
export default HomeHightChart
