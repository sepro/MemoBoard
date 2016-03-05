var $ = require ('jquery');
import React from 'react';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
       this.addList = this.addList.bind(this);
    }

    addList() {
        var postdata = {name: "new list"};

        console.log(name);

        $.ajax({
            type: 'POST',
            url: this.props.url,
            data: postdata,
            dataType: 'json',
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