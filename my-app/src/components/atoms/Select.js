import React from 'react';
import './Select.css'

export default class Select extends React.Component {
    handleChange = (e) => {
        this.props.onChangeSelect(e.target.value)
    };

    render() {
        return (
            <label className="select-label">
                <p style={this.props.styleTitle}>Show:</p>
                <select style={this.props.style} onChange={this.handleChange}>
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