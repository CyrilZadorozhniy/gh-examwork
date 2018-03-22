import React from 'react';
import './Select.css'

export default class Select extends React.Component {
    handleChange = (e) => {
        this.props.onChangeSelect(e.target.value)
    };

    render() {
        return (
            <label className="label">
                <p>Show:</p>
                <select onChange={this.handleChange}>
                    {
                        this.props.data.map((item, index) =>
                        {
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                 </select>
            </label>
        )
    }
}