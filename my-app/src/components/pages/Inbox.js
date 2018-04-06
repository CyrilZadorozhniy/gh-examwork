import React from 'react'
import './Inbox.css';
import Select from '../atoms/Select';
import UserAvatar from '../../assets/img/avatar.png';


import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';

class Inbox extends React.Component {
    constructor() {
        super();
        this.state = {
            loadingChats: true,
            textMassages: '',
            modalWindow: false,
            chatsType: 'incoming',
            chatsSortableStatus: 'all',
        }
    }

    componentWillMount() {
        fetch('/inbox')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    chats: res.chats.slice().sort((a, b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse(),
                    filterChats: res.chats.slice().sort((a, b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse().filter(chat => {
                        return (!chat.delete && !chat.massages[chat.massages.length - 1].my)
                    }),
                    workers: res.workers,
                    loadingChats: false
                })
            })
    }

    chatClick = (chat) => {
        this.setState({
            currentChat: chat,
            currentUser: this.state.workers.filter(worker => {
                return (chat.contactUser === worker.mail)
            })
        });
        this.setState({
            filterChats: this.state.filterChats.map(item => {
                if (item.id === chat.id && !item.massages[item.massages.length - 1].my) {
                    item.massages[item.massages.length - 1].viewed = true;
                    return item
                }
                return item
            })
        })
    };
    handleChange = (el) => {
        let name = el.target.name;
        this.setState({
            [name]: el.target.value
        });
    };
    submitMassage = (ev) => {
        ev.preventDefault();
        if (this.state.textMassages.trim() === '') {
            return null
        }
        const todayTime = () => {
            let today = new Date(),
                day = (today.getDay() + 1),
                month = (today.getMonth() + 1),
                year = today.getFullYear(),
                hours = today.getHours(),
                minutes = today.getMinutes(),
                date;
            const monthFormat = (month) => {
                switch (month) {
                    case(1) :
                        return 'January';
                    case(2) :
                        return 'February';
                    case(3) :
                        return 'March';
                    case(4) :
                        return 'April';
                    case(5) :
                        return 'May';
                    case(6) :
                        return 'June';
                    case(7) :
                        return 'July';
                    case(8) :
                        return 'August';
                    case(9) :
                        return 'September';
                    case(10) :
                        return 'October';
                    case(11) :
                        return 'November';
                    case(12) :
                        return 'December';
                }
            }
            const dayFormat = (d) => {
                if (d < 13) {
                    return 'AM'
                } else {
                    return 'PM'
                }
            };
            date = [day, monthFormat(month), year + ',', [hours, minutes].join(':'), dayFormat(hours)].join(' ');
            return date
        };

        function idNewMassage() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        let newChat = this.state.chats.map(chat => {
            if (chat.id === this.state.currentChat.id) {
                chat.massages.push({
                    id: idNewMassage(),
                    time: todayTime(),
                    my: true,
                    viewed: false,
                    massage: this.state.textMassages
                });
                return chat
            }
            return chat
        });
        this.setState({
            filterChats: newChat,
            textMassages: ''
        });
        this.changeChatsType(this.state.chatsType)
    };
    onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            this.submitMassage(e);
        }
    };
    openModal = () => {
        this.setState({
            modalWindow: true
        })
    };
    closeModal = () => {
        this.setState({
            modalWindow: false
        })
    };
    newConversation = (mail, name) => {
        const check = this.state.chats.filter(chat => {
            return (chat.contactUser === mail)
        });
        if (check.length === 0) {
            const todayTime = () => {
                let today = new Date(),
                    day = (today.getDay() + 1),
                    month = (today.getMonth() + 1),
                    year = today.getFullYear(),
                    hours = today.getHours(),
                    minutes = today.getMinutes(),
                    date;
                const monthFormat = (month) => {
                    switch (month) {
                        case(1) :
                            return 'January';
                        case(2) :
                            return 'February';
                        case(3) :
                            return 'March';
                        case(4) :
                            return 'April';
                        case(5) :
                            return 'May';
                        case(6) :
                            return 'June';
                        case(7) :
                            return 'July';
                        case(8) :
                            return 'August';
                        case(9) :
                            return 'September';
                        case(10) :
                            return 'October';
                        case(11) :
                            return 'November';
                        case(12) :
                            return 'December';
                    }
                }
                const dayFormat = (d) => {
                    if (d < 13) {
                        return 'AM'
                    } else {
                        return 'PM'
                    }
                };
                date = [day, monthFormat(month), year + ',', [hours, minutes].join(':'), dayFormat(hours)].join(' ');
                return date
            };

            function idNewChat() {
                let text = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            }

            let newListChat = this.state.chats;
            newListChat.unshift({
                id: idNewChat(), delete: false, contactUser: mail,
                massages: [{
                    id: idNewChat(),
                    time: todayTime(),
                    my: true,
                    viewed: false,
                    massage: 'new conversation with ' + name
                }]
            });
            this.setState({
                chats: newListChat,
                filterChats: newListChat,
                modalWindow: false
            });
            this.changeChatsType(this.state.chatsType)
        } else {
            alert('You already have a correspondence with this person')
        }
    };
    changeChatsType = (type) => {
        switch (type) {
            case 'incoming':
                this.setState({
                    chatsType: type,
                    filterChats: this.state.chats.slice().sort((a, b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse().filter(chat => {
                        return (!chat.delete && !chat.massages[chat.massages.length - 1].my)
                    })
                });
                break;
            case 'outgoing':
                this.setState({
                    chatsType: type,
                    filterChats: this.state.chats.slice().sort((a, b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse().filter(chat => {
                        return (chat.massages[chat.massages.length - 1].my && !chat.delete)
                    })
                });
                break;
            case 'deleted':
                this.setState({
                    chatsType: type,
                    filterChats: this.state.chats.slice().sort((a, b) => {
                        if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                            return 1;
                        }
                        if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                            return -1;
                        }
                        return 0;
                    }).reverse().filter(chat => {
                        return (chat.delete)
                    })
                });
                break;
        }
        this.chatsSortableStatus()
    };
    countIncomingChats = () => {
        const incomingsChats = this.state.chats.slice().sort((a, b) => {
            if (a.massages[a.massages.length - 1].viewed < b.massages[b.massages.length - 1].viewed) {
                return 1;
            }
            if (a.massages[a.massages.length - 1].viewed > b.massages[b.massages.length - 1].viewed) {
                return -1;
            }
            return 0;
        }).reverse().filter(chat => {
            return (!chat.delete && !chat.massages[chat.massages.length - 1].my)
        });
        const dontViewdChat = incomingsChats.filter(chat => {
            return (!chat.massages[chat.massages.length - 1].viewed)
        });
        return dontViewdChat.length
    };
    chatsSortableStatus = (status) => {
        switch (status) {
            case 'all' :
                this.changeChatsType(this.state.chatsType);
                break;
            case 'date' :
                this.setState({
                    filterChats: this.state.filterChats.slice().sort((a, b) => {
                        a = a.massages[a.massages.length - 1].time;
                        b = b.massages[b.massages.length - 1].time;
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                        return 0;
                    }).reverse(),
                });
                break;
        }
    };

    render() {
        if (this.state.loadingChats) {
            return <div style={{
                backgroundColor: '#2b2d3c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <CircularProgress color={'#757da4'} size={60} thickness={7}/>
            </div>
        } else {
            return (
                <div className="section-inbox show">
                    <header className="section-blue-header">
                        <ul className="section-blue-link-list">
                            <li>
                                <p className={this.state.chatsType === 'incoming' ? 'active' : null}
                                   onClick={() => this.changeChatsType('incoming')}><i
                                    className="material-icons">move_to_inbox</i> Inbox ({this.countIncomingChats()})</p>
                            </li>
                            <li>
                                <p className={this.state.chatsType === 'outgoing' ? 'active' : null}
                                   onClick={() => this.changeChatsType('outgoing')}><i
                                    className="material-icons">send</i> Sent</p>
                            </li>
                            <li>
                                <p className={this.state.chatsType === 'deleted' ? 'active' : null}
                                   onClick={() => this.changeChatsType('deleted')}><i
                                    className="material-icons">delete</i> Trash</p>
                            </li>
                        </ul>
                        <Select
                            title="Filter messages:"
                            styleTitle={{color: '#fff'}}
                                style={{color: '#fff', border: '1px solid #fff', backgroundColor: '#2481ce'}}
                                data={['all', 'date']} onChangeSelect={this.chatsSortableStatus}/>
                    </header>
                    <div className="inbox-body">
                        <div className="chats-list-container">
                            <ul className="chats-list">
                                {
                                    this.state.filterChats.map(chat => {
                                        const worker = this.state.workers.filter(worker => {
                                            return (chat.contactUser === worker.mail)
                                        });
                                        return (
                                            <li key={chat.id}
                                                className={this.state.currentChat ? this.state.currentChat.id === chat.id ? 'chat active' : 'chat' : 'chat'}
                                                onClick={() => {
                                                    this.chatClick(chat)
                                                }}>
                                                <header className="chat-header">
                                                    <Avatar src={worker[0].img} size={42}/>
                                                    <h5>{worker[0].name}</h5>
                                                    <span className="chat-date"
                                                          style={(chat.massages[chat.massages.length - 1].viewed && chat.massages[chat.massages.length - 1].my) ? {color: '#9ca1b2'} : (chat.massages[chat.massages.length - 1].viewed && !chat.massages[chat.massages.length - 1].my) ? {color: '#9ca1b2'} : (!chat.massages[chat.massages.length - 1].viewed && chat.massages[chat.massages.length - 1].my) ? {color: '#9ca1b2'} : {color: '#2196f3'}}>{chat.massages[chat.massages.length - 1].time}</span>
                                                </header>
                                                <p className="last-massage">{chat.massages[chat.massages.length - 1].massage}</p>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                            <button className="btn-new-coversation" onClick={this.openModal}>+ New conversation</button>
                        </div>
                        <div className="chat-correspondence">
                            <div className="chat-body">
                                <ul className="massages-list show">
                                    {
                                        this.state.currentChat ?
                                            this.state.currentChat.massages.map(massage => {
                                                const worker = this.state.workers.filter(worker => {
                                                    return (this.state.currentChat.contactUser === worker.mail)
                                                });
                                                return (
                                                    <li key={massage.id}
                                                        className={massage.my ? 'mst2 show' : 'mst1 show'}>
                                                        <Avatar src={massage.my ? UserAvatar : worker[0].img} size={56}
                                                                style={{alignSelf: 'flex-end', marginBottom: 30}}/>
                                                        <div className="massage-content">
                                                            <p>{massage.massage}</p>
                                                            <span className="massage-date"
                                                                  style={massage.viewed ? {color: '#9ca1b2'} : {color: '#2196f3'}}>{massage.time}</span>
                                                        </div>
                                                    </li>
                                                )
                                            }) : null
                                    }
                                </ul>
                            </div>
                            {
                                this.state.currentUser ?
                                    <form className="new-massage-form show">
                                        <textarea placeholder='Write a message' name="textMassages"
                                                  value={this.state.textMassages} onKeyDown={this.onEnterPress}
                                                  onChange={this.handleChange}> </textarea>
                                        <i className="material-icons">attachment</i>
                                    </form>
                                    : null
                            }
                        </div>
                        {
                            this.state.currentUser ?
                                <div className="interlocutor-info show">
                                    <div className="avatar-wrap">
                                        <Badge
                                            badgeContent={1}
                                            style={{padding: 0,}}
                                            badgeStyle={this.state.currentUser[0].online ?{color:'#4caf50',backgroundColor:'#4caf50',top: 2, right: 10, border: '2px solid #2f3242',width: 25,height:25}:{display:'none'}}
                                        >
                                            <Avatar src={this.state.currentUser[0].img} size={124}/>
                                        </Badge>
                                    </div>
                                    <div className="tex-wrap">
                                        <h4>{this.state.currentUser[0].name}</h4>
                                        <p>{this.state.currentUser[0].position}</p>
                                    </div>
                                    <p className="interlocutor-description">{this.state.currentUser[0].description}</p>
                                    <ul className="info-list">
                                        <li>
                                            <span>Email</span>
                                            <p>{this.state.currentUser[0].mail}</p>
                                        </li>
                                        <li>
                                            <span>Phone</span>
                                            <p>{this.state.currentUser[0].phone}</p>
                                        </li>
                                        <li>
                                            <span>Adress</span>
                                            <p>{this.state.currentUser[0].adress}</p>
                                        </li>
                                        <li>
                                            <span>Organization</span>
                                            <p>{this.state.currentUser[0].company}</p>
                                        </li>
                                    </ul>
                                </div>
                                : null
                        }
                    </div>
                    {
                        this.state.modalWindow ?
                            <div className="modal-window show">
                                <span className="click-close" onClick={this.closeModal}> </span>
                                <div className="modal-window-body">
                                    <ul className="workers-list">
                                        {
                                            this.state.workers.map(worker => {
                                                return (
                                                    <li key={worker.id}
                                                        onClick={() => this.newConversation(worker.mail, worker.name)}>
                                                        <Avatar src={worker.img} size={50}/>
                                                        <div className="content-wrap">
                                                            <p>{worker.name}</p>
                                                            <span>{worker.position}</span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            : null
                    }
                </div>
            )
        }
    }
}

export default Inbox