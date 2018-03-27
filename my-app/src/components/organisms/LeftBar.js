import React from 'react'
import './LeftBar.css'
import { NavLink } from 'react-router-dom';

//Material
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

class LeftBar extends React.Component {
    constructor() {
        super();
        this.state = {
            notification: false
        }
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                notification: true,
            })
        },3000);
    }
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
                                <NavLink to='/projects/all'  exact activeClassName="nav-active">
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
                                    <Badge
                                        style={{padding: 0}}
                                        badgeContent={0}
                                        primary={true}
                                        badgeStyle={this.state.notification ?{color:'#2196f3',backgroundColor:'#2196f3',top: -2, right: -5, border: '2px solid #2f3242',width: 14,height:14}:{display:'none'}}
                                    >
                                        <i className="material-icons">email</i>
                                    </Badge>
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