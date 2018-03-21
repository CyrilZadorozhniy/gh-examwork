import React from 'react';
import './HeaderSite.css';
import Logo from '../../assets/img/logo.png';
import { withRouter } from 'react-router';
import TextPlusBtn from '../atoms/btn/TextPlusBtn';
import IconBtn from '../atoms/btn/IconBtn'
//Material
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
    iconButton: {
        padding: 0,
        width: 'auto',
        height: 'auto',
        color:'#fff'
    },
};

class HeaderSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Popover: false,
            signOutDialog: false,
        };
    }
    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            Popover: true,
            anchorEl: event.currentTarget,
        });
    };
    handleRequestClose = () => {
        this.setState({
            Popover: false,
        });
    };
    handleClose = (e) => {
        const { history } = this.props;
        if (e) {
            this.setState({signOutDialog: false});
            localStorage.removeItem("token");
            history.push('/initialization');
        } else {
            this.setState({signOutDialog: false});
        }

    };
    handleSignOut = () =>{
        this.setState({signOutDialog: true, Popover: false});
    };
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Sign out"
                primary={true}
                onClick={() =>this.handleClose(true)}
            />,
        ];
        return (
            <header className="site-header">
                <div className="wrap-logo">
                    <img src={ Logo } alt=""/>
                    <h1>qwe</h1>
                </div>
                <div className="header-right-side">
                <TextPlusBtn title='Add' style={{marginRight: 25}}/>
                <IconBtn icon="search" style={{padding:0,color:'#fff',marginRight: 25}}/>
                    <Badge
                        style={{padding: 0, paddingRight: 20,marginRight:25}}
                        primary={true}
                        badgeStyle={{backgroundColor:'#2196f3',top: 8, right: 29, border: '2px solid #2f3242',width: 14,height:14}}
                    >
                        <IconBtn icon="notifications_none" style={{padding:0,color:'#fff'}}/>
                    </Badge>
                    <div className="avatar-button">
                        <IconButton style={style.iconButton}  onClick={this.handleClick}>
                            <Avatar  size={50}/>
                        </IconButton>
                        <IconButton style={style.iconButton}  onClick={this.handleClick}>
                            <i className="material-icons">keyboard_arrow_down</i>
                        </IconButton>
                        <Popover
                            open={this.state.Popover}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem primaryText="Refresh" />
                                <MenuItem primaryText="Help &amp; feedback" />
                                <MenuItem primaryText="Settings" />
                                <MenuItem primaryText="Sign out" onClick={this.handleSignOut} />
                            </Menu>
                        </Popover>
                    </div>
                </div>
                <Dialog
                    title="Sign out"
                    actions={actions}
                    modal={false}
                    open={this.state.signOutDialog}
                    onRequestClose={this.handleClose}
                >
                    Are you sure you want to sign out of your account?
                </Dialog>
            </header>
        )
    }
}
export default withRouter(HeaderSite)