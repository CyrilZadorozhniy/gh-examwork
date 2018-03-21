import React from 'react'
import './TextPlusBtn.css'

class TextPlusBtn extends React.Component {
    render() {
        return (
            <button className="text-plus-btn" style={this.props.style}>
                {this.props.title}
            </button>
        )
    }
}
export default TextPlusBtn