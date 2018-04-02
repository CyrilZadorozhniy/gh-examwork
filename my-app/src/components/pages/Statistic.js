import React from 'react';
import './Statistic.css';
import Select from '../atoms/Select';
import ReactHighcharts from 'react-highcharts';
import HomeHighChart from '../../config/HomeHighChart.config';
import CircularProgressbar from 'react-circular-progressbar';
import StatisticTable from '../organisms/StatisticTable'
//Materials
import CircularProgress from 'material-ui/CircularProgress';

class Statistic extends React.Component {
    constructor() {
        super();
        this.state = {
            loadingCharts: true,
        }
    }
    componentWillMount() {
        let data = {
            token: JSON.parse(localStorage.getItem("token"))
        };
        fetch('/api/user/charts',{
            headers: {
                'Content-type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    charts: res.charts,
                    loadingCharts: false,
                });
                let homeHighChart = this.refs.homeHighChart.getChart();
                homeHighChart.series[0].setData(this.state.charts.salesChart.lastWeek,true);
            });
    }
    filterSalesChart = (e) => {
        let chart = this.refs.homeHighChart.getChart();
        switch(e) {
            case 'Last Year' :
                chart.series[0].setData(this.state.charts.salesChart.lastYear,true);
                chart.xAxis[0].setCategories(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14']);
                break;
            case 'Last Month' :
                chart.series[0].setData(this.state.charts.salesChart.lastMonth,true);
                chart.xAxis[0].setCategories(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']);
                break;
            case 'Last Week' :
                chart.series[0].setData(this.state.charts.salesChart.lastWeek,true);
                chart.xAxis[0].setCategories([
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sut',
                ],);
                break;
        }
    };
    render() {
        if (this.state.loadingCharts) {
            return <div style={{backgroundColor: '#2b2d3c',display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100vh'}}>
                <CircularProgress color={'#757da4'} size={60} thickness={7} />
            </div>
        } else {
            return (
                <div className="section-statistic show">
                    <div className="high-chatrt">
                        <ReactHighcharts config={ HomeHighChart }  ref='homeHighChart' />
                        <ul className="circular-progress-list">
                            <li>
                                <div className="circular-progress-wrap">
                                    <CircularProgressbar percentage={75}/>
                                </div>
                                <div className="text-wrap">
                                    <p>1300</p>
                                    <span>Views</span>
                                </div>
                            </li>
                            <li>
                                <div className="circular-progress-wrap">
                                    <CircularProgressbar percentage={35}/>
                                </div>
                                <div className="text-wrap">
                                    <p>800</p>
                                    <span>VISITORS</span>
                                </div>
                            </li>
                            <li>
                                <div className="circular-progress-wrap">
                                    <CircularProgressbar percentage={62}/>
                                </div>
                                <div className="text-wrap">
                                    <p>3800</p>
                                    <span>IMPRESSIONS</span>
                                </div>
                            </li>
                        </ul>
                        <Select data={['Last Week','Last Month','Last Year']} onChangeSelect={this.filterSalesChart}/>
                    </div>
                    <StatisticTable/>
                </div>
            )
        }
    }
}
export default Statistic