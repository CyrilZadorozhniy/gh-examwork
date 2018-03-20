import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import './App.css';

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
  render() {
    const  {component: Component, ...rest } = this.props;
    return(
        <Route { ...rest } render={() => {
          return (
              <div className="site-body">
                <HeaderSite/>
                <div className="leftbar-main-wrap">
                  <LeftBar/>
                  <main className="main">
                    <Component/>
                  </main>
                </div>
              </div>
          )
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
