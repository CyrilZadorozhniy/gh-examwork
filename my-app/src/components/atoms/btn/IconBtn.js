import React from 'react';
import './IconBtn.css'
import IconButton from 'material-ui/IconButton';

class IconBtn extends React.Component {
    render() {
        return (
            <IconButton style={this.props.style}
                        children={this.props.children}
                        disableTouchRipple={this.props.disableTouchRipple}
                        disabled={this.props.disabled}
                        href={this.props.href}
                        iconClassName={this.props.iconClassName}
                        iconStyle={this.props.iconStyle}
                        tooltip={this.props.tooltip}
                        tooltipPosition={this.props.tooltipPosition}
                        tooltipStyles={this.props.tooltipStyles}
                        touch={this.props.touch}
            >
                <i className="material-icons icon-btn">{this.props.icon}</i>
            </IconButton>
        )
    }
}
export default IconBtn