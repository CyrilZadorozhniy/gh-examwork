import React from 'react';
import './Settings.css';
import Select from '../atoms/Select';
import store from '../../redux/store';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            changeMyLife: ['No','Yes'],
        }
    }
    changeAvatarSize = (el) => {
        store.dispatch({
            type: 'AVATAR_SIZE',
            payload: el,
        })
    };
    changeMyLife = (el) => {
        switch (el) {
            case 'No' :
                return null;
            case 'Yes' :
                alert('The server does not respond (Sorry)');
                this.setState({
                    changeMyLife: ['No']
                })
        }
    };
    render() {
        return (
           <div className="settings-section show">
               <Select
                    title="Avatar Size"
                    styleTitle={{color:'#fff'}}
                    data={['Large','Middle','Small']}
                    onChangeSelect={this.changeAvatarSize}/>
               <Select
                   title="Change my life"
                   styleTitle={{color:'#fff',marginLeft:10}}
                   data={this.state.changeMyLife}
                   onChangeSelect={this.changeMyLife}/>
           </div>
        )
    }
}
export default Settings