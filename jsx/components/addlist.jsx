var $ = require ('jquery');
import React from 'react';
import ReactDom from 'react-dom';


class Addlist extends React.Component{
    constructor(props) {
       super(props);
       this.addList = this.addList.bind(this);
    }

    addList() {
        var postdata = {name: ReactDom.findDOMNode(this.refs.listname).value};

        console.log(name);

        $.ajax({
            type: 'POST',
            url: this.props.url,
            data: postdata,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                this.props.onAdd();
            }.bind(this)
        });


    }

    render() {
      return (<div>
                <input type="text" name="listname" ref="listname" />
                <input type="button" onClick={this.addList} value="add" /></div>);
    }
}

export default Addlist;