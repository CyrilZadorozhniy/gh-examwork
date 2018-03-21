import React from 'react'
import './HeaderSite.css'
import Logo from '../../assets/img/logo.png';

class HeaderSite extends React.Component {
    render() {
        return (
            <header className="site-header">
                <div className="wrap-logo">
                    <img src={ Logo } alt=""/>
                    <h1>qwe</h1>
                </div>
                <div className="header-right-side">

                </div>
            </header>
        )
    }
}
export default HeaderSite