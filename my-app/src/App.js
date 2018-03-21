import React, { Component } from 'react';
import { Route , Switch, Redirect} from 'react-router-dom';
import './App.css';


import CircularProgress from 'material-ui/CircularProgress';

import HeaderSite from './components/organisms/HeaderSite';
import LeftBar from './components/organisms/LeftBar';
//Pages
import Home from './components/pages/Home'
import Inbox from './components/pages/Inbox'
import Projects from './components/pages/Projects'
import Statistic from './components/pages/Statistic'
import Users from './components/pages/Users'
import Initialization from './components/pages/Initialization'

class PrivateLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        document.getElementsByTagName('title')[0].text = 'React App';
    };
    componentWillMount() {
        let data = {
            token: JSON.parse(localStorage.getItem("token"))
        };
        fetch('/api/user/check',{
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
                setTimeout(()=> {
                    this.setState({
                        loading: false,
                        check: res.check
                    })
                },1000);

            });
    }
  render() {
    const  {component: Component, ...rest } = this.props;
    return(
        <Route { ...rest } render={() => {
            if (this.state.loading) {
                return <div style={{backgroundColor: '#2b2d3c',display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100vh'}}>
                    <CircularProgress color={'#757da4'} size={60} thickness={7} />
                </div>
            }
            if (this.state.check){
                return (
                    <div className="site-body show">
                        <HeaderSite/>
                        <div className="leftbar-main-wrap">
                            <LeftBar/>
                            <main className="main">
                                <Component/>
                            </main>
                        </div>
                    </div>
                )
            } else {
                localStorage.removeItem("token");
                return   <Redirect to="/initialization" />
            }
        }}/>
    )
  }
}
class App extends Component {
  render() {
    return (
          <Switch>

            <Route  exact path='/initialization' component={ Initialization }/>

            <PrivateLayout exact path="/" component={ Home }/>
            <PrivateLayout exact path="/projects" component={ Inbox }/>
            <PrivateLayout exact path="/statistic" component={ Projects }/>
            <PrivateLayout exact path="/inbox" component={ Statistic }/>
            <PrivateLayout exact path="/users" component={ Users }/>
          </Switch>
    );
  }
}

export default App;
