import React from 'react';
import './Initialization.css';
import Logo from '../../assets/img/logo.png'

const styles = {
    inkStyle: {
        marginLeft: 100 / 2 + "%",
    }
};

class Initialization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: 'b',
            usernameRegister: '',
            passwordRegister: '',
            usernameLogin: '',
            passwordLogin: '',
        };
    }

    tabsClick = (value) => {
        this.setState({
            tabs: value
        });
    };
    handleChange = (e) => {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };

    handleSubmitRegister = (e) => {
        e.preventDefault();
        if (this.state.usernameRegister === '' || this.state.passwordRegister === ''  ) {
            return alert('Your fields are empty')
        }
        const {history} = this.props;
        let registerDate = {
            username: this.state.usernameRegister,
            pass: this.state.passwordRegister
        };
        fetch('/api/user/register', {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify(registerDate)
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.check) {
                    localStorage.setItem("token", JSON.stringify(res.token));
                    localStorage.setItem("username", JSON.stringify(res.username));
                    this.setState({
                        usernameRegister: '',
                        passwordRegister: '',
                        tabs: 'b',
                    });
                    history.push('/');
                } else {
                    return alert('The secret login is already registered')
                }
            });

    };
    handleSubmitLogin = (e) => {
        e.preventDefault();
        if (this.state.usernameRegister === '' || this.state.passwordRegister === ''  ) {
            return alert('Your fields are empty')
        }
        const {history} = this.props;
        let loginDate = {
            username: this.state.usernameLogin,
            pass: this.state.passwordLogin,
        };
        fetch('api/user/login', {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify(loginDate),
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if (res.check) {
                    this.setState({
                        usernameLogin: '',
                        passwordLogin: '',
                    });
                    localStorage.setItem("token", JSON.stringify(res.token));
                    localStorage.setItem("username", JSON.stringify(res.username));
                    history.push('/');
                } else {
                    alert('username or password is not correct');
                }
            });

    };


    render() {
        const {history} = this.props;
        let tokenKey = JSON.parse(localStorage.getItem("token"));
        if (tokenKey) {
            history.push('/');
        }
        document.getElementsByTagName('title')[0].text = 'Initialization';

        return (
            <div className="initialization-site">
                <div className="initialization-body">
                    <header className="initialization-header">
                        <div className="wrap-logo">
                            <img src={Logo} alt="Merkury"/>
                        </div>
                        <div className="tabs-bar">
                            <ul className="tabs-list">
                                <li onClick={() => this.tabsClick('a')}>Register</li>
                                <li onClick={() => this.tabsClick('b')}>Login</li>
                            </ul>
                            <div className="inkbar">
                                <span style={this.state.tabs === 'b' ? styles.inkStyle : null}> </span>
                            </div>
                        </div>
                    </header>
                    <div className="initialization-main">
                        {this.state.tabs === 'a' ?
                            <div className="initialization-tab-register">
                                <form onSubmit={this.handleSubmitRegister}>
                                    <h2>Register </h2>
                                    <label className="username-ico">
                                        <input name="usernameRegister" value={this.state.usernameRegister}
                                               onChange={this.handleChange} placeholder="Username"/>
                                    </label>
                                    <label className="password-ico">
                                        <input name="passwordRegister" value={this.state.passwordRegister}
                                               onChange={this.handleChange} type="password" placeholder="Password"/>
                                    </label>
                                    <button className="submit-btn" type="submit">Enter</button>
                                </form>
                            </div>
                            :
                            <div className="initialization-tab-login">
                                <form onSubmit={this.handleSubmitLogin}>
                                    <h2>Welcome <span>back!</span></h2>
                                    <label className="username-ico">
                                        <input name="usernameLogin" value={this.state.usernameLogin}
                                               onChange={this.handleChange} placeholder="Username"/>
                                    </label>
                                    <label className="password-ico">
                                        <input name="passwordLogin" value={this.state.passwordLogin}
                                               onChange={this.handleChange} type="password" placeholder="Password"/>
                                    </label>
                                    <button className="submit-btn" type="submit">Enter</button>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Initialization;