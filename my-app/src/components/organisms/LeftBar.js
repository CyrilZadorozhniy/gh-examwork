import React from 'react'
import './LeftBar.css'
import { NavLink } from 'react-router-dom';

//Material
import IconButton from 'material-ui/IconButton';

class LeftBar extends React.Component {
    render() {
        return (
            <div className="leftbar">
                <nav className="site-navigation">
                    <ul className="navigation-list">
                        <li>
                            <IconButton style={{padding:0}}>
                                <NavLink to='/' exact activeClassName="nav-active">
                                    <i className="material-icons">home</i>
                                </NavLink>
                            </IconButton>
                        </li>
                        <li>
                            <IconButton style={{padding:0}}>
                                <NavLink to='/projects'  exact activeClassName="nav-active">
                                    <i className="material-icons">menu</i>
                                </NavLink>
                            </IconButton>
                        </li>
                        <li>
                            <IconButton style={{padding:0}}>
                                <NavLink to='/statistic'  exact activeClassName="nav-active">
                                    <i className="material-icons">trending_up</i>
                                </NavLink>
                            </IconButton>
                        </li>
                        <li>
                            <IconButton style={{padding:0}}>
                                <NavLink to='/inbox'  exact activeClassName="nav-active">
                                    <i className="material-icons">email</i>
                                </NavLink>
                            </IconButton>
                        </li>
                        <li>
                            <IconButton style={{padding:0}}>
                                <NavLink to='/users'  exact activeClassName="nav-active">
                                    <i className="material-icons">supervisor_account</i>
                                </NavLink>
                            </IconButton>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default LeftBar