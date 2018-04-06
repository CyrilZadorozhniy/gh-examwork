import React from 'react';
import './HeaderSite.css';
import Logo from '../../assets/img/logo.png';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom'
import TextPlusBtn from '../atoms/btn/TextPlusBtn';
import IconBtn from '../atoms/btn/IconBtn'

import UserAvatar from '../../assets/img/avatar.png'
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
            PopoverInbox: false,
            signOutDialog: false,
            notification: false,
            loadingChats: true,
            searchBth: false,
        };
    }
    componentWillMount() {
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
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                notification: true,
            })
        },3000);
    }
    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            Popover: true,
            anchorEl: event.currentTarget,
        });
    };
    handleClickPopoverInbox = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            PopoverInbox: true,
            anchorEl2: event.currentTarget,
        });
    };
    handleRequestClose = () => {
        this.setState({
            Popover: false,
        });
    };
    handleRequestClosePopoverInbox = () => {
        this.setState({
            PopoverInbox: false,
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
    redirectInbox = () => {
        const { history } = this.props;
        history.push('/inbox');
        this.handleRequestClosePopoverInbox();
    };
    searchBth = () => {
        this.setState({
            searchBth: !this.state.searchBth
        })
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
                    <form style={{display:'flex',alignItems:'center'}}>
                        <div className="search-wrap" style={this.state.searchBth ? {width:'auto'} : {width: 0}}>
                            <input className="search-text-field" style={this.state.searchBth ? {width:'auto'} : {width: 0,border:'none',padding:0}} type="text"/>
                        </div>
                        <IconBtn icon="search" style={{padding:0,color:'#fff',marginRight: 25}} onClick={this.searchBth}/>
                    </form>
                    <Badge
                        badgeContent={1}
                        style={{padding: 0, paddingRight: 20,marginRight:25}}
                        badgeStyle={this.state.notification ? { color:'#2196f3',backgroundColor:'#2196f3',top: 8, right: 29, border: '2px solid #2f3242',width: 14,height:14}: {display:'none'}}
                    >
                        <IconBtn icon="notifications_none" style={{padding:0,color:'#fff'}} onClick={this.handleClickPopoverInbox}/>
                        <Popover
                            open={this.state.PopoverInbox}
                            anchorEl={this.state.anchorEl2}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClosePopoverInbox}
                        >
                            <Menu style={{backgroundColor:'#2f3242'}}>
                                {
                                    !this.state.loadingChats ?
                                        <ul className="chats-list-notification" >
                                            {
                                                this.state.filterChats.map((chat,index) => {
                                                    if (index >= 6) {
                                                        return null
                                                    }
                                                    const worker = this.state.workers.filter(worker => {
                                                        return (chat.contactUser === worker.mail);
                                                    });
                                                    if(chat.delete) {
                                                        return null
                                                    }
                                                    return (
                                                        <li key={chat.id} className="chat-notification" onClick={this.redirectInbox}>
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
                            </Menu>
                        </Popover>
                    </Badge>
                    <div className="avatar-button">
                        <IconButton style={style.iconButton}  onClick={this.handleClick}>
                            <Avatar src={ UserAvatar }  size={50}/>
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