import React from 'react'
import './Home.css'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Calendar from 'react-calendar';
import Select from '../atoms/Select'
//Hightcharts
import ReactHighcharts from 'react-highcharts';
import HomeHighChart from '../../config/HomeHighChart.config';
import SalesReportHighChart from  '../../config/SalesReportHighChart.config'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
        }
    }
    componentDidMount() {
        const month = document.getElementsByClassName('react-calendar__navigation__label')[0].textContent.split(' ');
        document.getElementsByClassName('react-calendar__navigation__label')[0].textContent = month[0]

    };
    changeCalendarTitle = () => {
        const month = document.getElementsByClassName('react-calendar__navigation__label')[0].textContent.split(' ');
        document.getElementsByClassName('react-calendar__navigation__label')[0].textContent = month[0]

    };
    render() {
        return (
            <div className="section-home show">
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
                </div>
                <div className="your-projects-card">
                    <header>
                        <h3>Your projects</h3>
                    </header>
                </div>
                <div className="high-chatrt-reports">
                    <header className="high-chatrt-header">
                        <h3>Sales report</h3>
                        <Select data={['asd','add0','asdf']} onChangeSelect={() => {console.log('asd')}}/>
                    </header>
                    <ReactHighcharts config={ SalesReportHighChart }  ref='salesReportHighChart' />
                </div>
                <div className="your-projects-card">
                    <header>
                        <h3>Your projects</h3>
                    </header>
                </div>
                <div className="calendar-card">

                    <Calendar
                        onActiveDateChange={this.changeCalendarTitle}
                        value={this.state.date}
                        locale="en-US"

                    />

                </div>
            </div>
        )
    }
}
export default Home