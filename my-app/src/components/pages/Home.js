import React from 'react'
import './Home.css'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

//Hightcharts
import ReactHighcharts from 'react-highcharts';
import HomeHightChart from '../../config/HomeHightChart.config'

class Home extends React.Component {
    render() {
        return (
            <div className="section-home show">
                <div className="high-chatrt">
                    <ReactHighcharts config={ HomeHightChart } />
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
            </div>
        )
    }
}
export default Home