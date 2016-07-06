import React from 'react';


class Button extends React.Component{
    render() {
      return (
                <a href="#" onClick={this.props.onClick} className="text-muted"><span className={this.props.glyph}></span></a>);
    }
}

export default Button;