import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import './App.css';

import HeaderSite from './components/organisms/HeaderSite';
import LeftBar from './components/organisms/LeftBar';
//Pages
import Home from './components/pages/Home'

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
            <PrivateLayout exact path="/" component={ Home }/>
          </Switch>
    );
  }
}

export default App;
