import React from 'react'
import './Inbox.css';
import Select from '../atoms/Select'
import Avatar from 'material-ui/Avatar';


class Inbox extends React.Component {
    render() {
        return (
            <div className="section-inbox show">
                <header className="section-blue-header">
                    <ul className="section-blue-link-list" >
                        <li>
                            <p>Inbox (2)</p>
                        </li>
                        <li>
                            <p>Sent</p>
                        </li>
                        <li>
                            <p>Trash</p>
                        </li>
                    </ul>
                    <Select styleTitle={{color:'#fff'}} style={{color:'#fff',border:'1px solid #fff',backgroundColor:'#2481ce'}} data={['all','Microsoft','Google','Symu.co','JCD.pl','Facebook','Themeforest']} onChangeSelect={this.changeSelect}/>
                </header>
                <div className="inbox-body">
                    <div className="chats-list-container">
                        <ul className="chats-list" >
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michelle Stewart</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                            <li className="chat">
                                <header className="chat-header">
                                    <Avatar  size={42}/>
                                    <h5>Michell</h5>
                                    <span className="chat-date">Today, 5:32 PM</span>
                                </header>
                                <p className="last-massage">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusm.</p>
                            </li>
                        </ul>
                        <button className="btn-new-coversation">+ New coversation</button>
                    </div>
                    <div className="chat-correspondence">
                        <div className="chat-body">
                            <ul className="massages-list">
                                <li className="mst1">
                                    <Avatar  size={42} style={{alignSelf: 'flex-end',marginBottom: 30}}/>
                                    <div className="massage-content">
                                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ulla pariatur. </p>
                                        <span className="massage-date">4 April 2016, 5:32 PM</span>
                                    </div>
                                </li>
                                <li className="mst2">
                                    <Avatar  size={42} style={{alignSelf: 'flex-end',marginBottom: 30}}/>
                                    <div className="massage-content">
                                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ulla pariatur. </p>
                                        <span className="massage-date">4 April 2016, 5:32 PM</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <form className="new-massage-form">
                            <textarea placeholder='Write a message'></textarea>
                            <i className="material-icons">attachment</i>
                        </form>
                    </div>
                    <div className="interlocutor-info">

                    </div>
                </div>
            </div>
        )
    }
}
export default Inbox