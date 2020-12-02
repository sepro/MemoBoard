import React from 'react';
import ReactDom from 'react-dom';


class CollapseGlyph extends React.Component{
    render() {
        if (this.props.collapsed) {
            return (<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>)
        } else {
            return (<span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>)
        }
    }
}

export default CollapseGlyph;