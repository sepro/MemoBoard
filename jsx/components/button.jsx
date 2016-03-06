var $ = require ('jquery');
import React from 'react';


class Button extends React.Component{
    constructor(props) {
       super(props);
    }

    render() {
      return (<div>
                <p onClick={this.props.onClick}>{this.props.text}</p></div>);
    }
}

export default Button;