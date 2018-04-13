import React, { Component } from 'react';
import { Route , Switch, Redirect} from 'react-router-dom';
import './App.css';
import store from './redux/store'

import Swipeable from 'react-swipeable';
import CircularProgress from 'material-ui/CircularProgress';

import HeaderSite from './components/organisms/HeaderSite';
import LeftBar from './components/organisms/LeftBar';
//Pages
import Home from './components/pages/Home';
import Inbox from './components/pages/Inbox';
import Projects from './components/pages/Projects';
import Statistic from './components/pages/Statistic';
import Users from './components/pages/Users';
import Initialization from './components/pages/Initialization';
import Settings from './components/pages/Settings';


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
    constructor() {
        super();
        this.state = {
            responseMobile: false
        }
    }
    updateDimensions = () => {
        if(window.innerWidth <= 700) {
            this.setState({ responseMobile: true });
        } else {
            this.setState({ responseMobile: false });
        }
    };
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    swipingLeft = (e, absX) => {
        if (this.state.responseMobile) {
            store.dispatch({
                type:'LEFTBAR_STATUS',
                payload: false
            })
        }
    };
    swipingRight = (e, absX) => {
        if (this.state.responseMobile) {
            store.dispatch({
                type:'LEFTBAR_STATUS',
                payload: true
            })
        }
    };
  render() {
    return (
        <Swipeable
            delta={200}
            onSwiping={this.swiping}
            onSwipingLeft={this.swipingLeft}
            onSwipingRight={this.swipingRight}
          >
            <Switch>
                <Route  exact path='/initialization' component={ Initialization }/>
                <PrivateLayout exact path="/" component={ Home }/>
                <PrivateLayout path="/projects" component={ Projects }/>
                <PrivateLayout exact path="/statistic" component={ Statistic }/>
                <PrivateLayout exact path="/inbox" component={ Inbox }/>
                <PrivateLayout exact path="/users" component={ Users }/>
                <PrivateLayout exact path="/settings" component={ Settings }/>
            </Switch>
        </Swipeable>
    );
  }
}

export default App;
