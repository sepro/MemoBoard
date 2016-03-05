var $ = require ('jquery');
import React from 'react';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
       this.addList = this.addList.bind(this);
    }

    addList() {
        name = {name: this.refs.listname.getDOMNode().value.trim()};

        $.ajax({
            type: 'POST',
            url: this.props.url,
            data: name,
            success: function(data) {
                console.log(data);
            }.bind(this)
        });

        this.props.onAdd();
    }

    render() {
      return (<div>Add List:
                <input type="text" name="listname" ref="listname" />
                <input type="button" onClick={this.addList.bind(this)} value="add" /></div>);
    }
}

export default Addlist;