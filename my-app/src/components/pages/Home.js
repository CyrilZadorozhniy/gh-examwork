import React from 'react'
import './Home.css'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Calendar from 'react-calendar';
import Select from '../atoms/Select'
import UserAvatar from '../../assets/img/avatar.png'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
//Hightcharts
import ReactHighcharts from 'react-highcharts';
import HomeHighChart from '../../config/HomeHighChart.config';
import SalesReportHighChart from  '../../config/SalesReportHighChart.config'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
            loadingCharts: true,
            loadingProjects: true,
            loadingChats: true,
        }
    }
    componentWillMount() {
        let data = {
            token: JSON.parse(localStorage.getItem("token"))
        };
        fetch('/inbox')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    chats: res.chats.slice().sort((a,b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse(),
                    filterChats: res.chats.slice().sort((a,b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse(),
                    workers: res.workers,
                    loadingChats: false
                })
            });
        fetch('/projects')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    myProjects: res.projects.filter((project) => {
                        return(project.assignedTo === 'registed@mail.com')
                    }),
                    loadingProjects: false,
                });
            });
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
            });
    }
    componentDidUpdate() {
        if (!this.state.loadingCharts && !this.state.loadingProjects) {
            let salesReportHighChart = this.refs.salesReportHighChart.getChart();
            salesReportHighChart.series[0].setData(this.state.charts.reportsChart.lastYear,true);
            let homeHighChart = this.refs.homeHighChart.getChart();
            homeHighChart.series[0].setData(this.state.charts.salesChart.lastWeek,true);
            const month = document.getElementsByClassName('react-calendar__navigation__label')[0].textContent.split(' ');
            document.getElementsByClassName('react-calendar__navigation__label')[0].textContent = month[0]
        }
    }
    changeCalendarTitle = () => {
        const month = document.getElementsByClassName('react-calendar__navigation__label')[0].textContent.split(' ');
        document.getElementsByClassName('react-calendar__navigation__label')[0].textContent = month[0]

    };
    filterReportsChart = (e) => {
        let chart = this.refs.salesReportHighChart.getChart();
        switch(e) {
            case 'Last Year' :
                chart.series[0].setData(this.state.charts.reportsChart.lastYear,true);
                break;
            case 'Last Month' :
                chart.series[0].setData(this.state.charts.reportsChart.lastMonth,true);
                break;
            case 'Last Week' :
                chart.series[0].setData(this.state.charts.reportsChart.lastWeek,true);
                break;
        }
    };
    countIncomingChats = () => {
        const incomingsChats = this.state.chats.slice().sort((a,b) => {
            if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                return 1;
            }
            if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                return -1;
            }
            return 0;
        }).reverse().filter(chat => {
            return (!chat.delete && !chat.massages[chat.massages.length -1].my)
        });
        const dontViewdChat = incomingsChats.filter(chat => {
            return (!chat.massages[chat.massages.length -1].viewed)
        });
        return dontViewdChat.length
    };
    render() {
        if (this.state.loadingCharts || this.state.loadingProjects) {
            return <div style={{backgroundColor: '#2b2d3c',display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100vh'}}>
                <CircularProgress color={'#757da4'} size={60} thickness={7} />
            </div>
        } else {
            console.log(this.state.myProjects);
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
                        <div className="card-body">
                            <ul className="card-project-list">
                                {
                                    this.state.myProjects.map(project => {
                                        return (
                                            <li key={project.id}>
                                                <Avatar src={ UserAvatar }  size={42}/>
                                                <div className="content-wrap">
                                                    <p>{project.nameProject}</p>
                                                    <span>{project.company}<i> · </i>${project.price}</span>
                                                </div>
                                                <IconMenu
                                                    iconButtonElement={<IconButton ><MoreVertIcon  /></IconButton>}
                                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                    iconStyle={{color:'#9ea3b4'}}
                                                >
                                                    <MenuItem primaryText="Refresh" />
                                                    <MenuItem primaryText="Send feedback" />
                                                    <MenuItem primaryText="Settings" />
                                                    <MenuItem primaryText="Help" />
                                                    <MenuItem primaryText="Sign out" />
                                                </IconMenu>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="high-chatrt-reports">
                        <header className="high-chatrt-header">
                            <h3>Sales report</h3>
                            <Select data={['Last Year','Last Month','Last Week']} onChangeSelect={this.filterReportsChart}/>
                        </header>
                        <ReactHighcharts config={ SalesReportHighChart }  ref='salesReportHighChart' />
                    </div>
                    <div className="your-projects-card">
                        <header>
                            <h3>InBox(<span style={{color:'#2196f3'}}>{!this.state.loadingChats? this.countIncomingChats() : 0}</span>)</h3>
                        </header>
                        <div className="card-body">
                            {
                                !this.state.loadingChats ?
                                    <ul className="chats-list" >
                                        {
                                            this.state.filterChats.map(chat => {
                                                const worker = this.state.workers.filter(worker => {
                                                    return (chat.contactUser === worker.mail)
                                                });
                                                    if(chat.delete) {
                                                        return null
                                                    }
                                                return (
                                                    <li key={chat.id} className="chat">
                                                        <Avatar src={worker[0].img}  size={42} style={{alignSelf: 'center',margin:10,minWidth: 42}}/>
                                                        <div style={{display:'flex',flexDirection:'column',width: '100%'}}>
                                                            <header className="chat-header">
                                                                <h5>{worker[0].name}</h5>
                                                                <span className="chat-date" style={(chat.massages[chat.massages.length - 1].viewed && chat.massages[chat.massages.length - 1].my) ? {color:'#9ca1b2'}: (chat.massages[chat.massages.length - 1].viewed && !chat.massages[chat.massages.length - 1].my)?{color:'#9ca1b2'}:(!chat.massages[chat.massages.length - 1].viewed && chat.massages[chat.massages.length - 1].my)?{color:'#9ca1b2'}:{color:'#2196f3'}}>{chat.massages[chat.massages.length - 1].time}</span>
                                                            </header>
                                                            <p className="last-massage">{chat.massages[chat.massages.length - 1].massage}</p>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>

                                    : null
                            }
                        </div>
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
}
export default Home