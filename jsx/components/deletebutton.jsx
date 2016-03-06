var $ = require ('jquery');
import React from 'react';


class Deletebutton extends React.Component{
    constructor(props) {
       super(props);
       this.sendDelete = this.sendDelete.bind(this);
    }

    sendDelete() {
        $.ajax({
            type: 'DELETE',
            url: this.props.url,
            success: function() {
                console.log('deleted');
                this.props.onDelete();
            }.bind(this)
        });
    }

    render() {
      return (<div>
                <p onClick={this.sendDelete}>delete</p></div>);
    }
}

export default Deletebutton;